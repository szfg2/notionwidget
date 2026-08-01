# Portable launcher for the respiratory tools -- no local copy of the repo needed.
#
# A browser will not let anything outside an origin write that origin's
# localStorage, so keys cannot be pushed into szfg2.github.io from a desktop
# shortcut. Instead this serves the live GitHub Pages content through
# http://127.0.0.1:8765, which puts the seeding script and the tools on one
# origin. Pages are fetched on demand, so they are always the current version.
#
# Driven by RESTools.bat through three environment variables:
#   RESTOOLS_PAGE   page to open, or __wipe to clear keys from this browser
#   RESTOOLS_KEYS   path to the keys file (default %USERPROFILE%\.resblue-keys.json)
#   RESTOOLS_PORT   listen port (default 8765)

$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Base = 'https://szfg2.github.io/notionwidget'
$DefaultPage = 'RES.html'

$Page = $env:RESTOOLS_PAGE
if (-not $Page) { $Page = $DefaultPage }

$KeysFile = $env:RESTOOLS_KEYS
if (-not $KeysFile) { $KeysFile = Join-Path $env:USERPROFILE '.resblue-keys.json' }

$Port = 8765
if ($env:RESTOOLS_PORT) { $Port = [int]$env:RESTOOLS_PORT }

$WipeMode = ($Page -eq '__wipe')

# Only settings worth keeping outside the browser. Anything a page already
# defaults sensibly (file paths, view preferences) is left to the page.
$Template = [ordered]@{
    cdg_provider         = 'anthropic'
    cdg_api_key          = ''
    cdg_deepseek_key     = ''
    dictation_openai_key = ''
    dictation_gh_token   = ''
    dictation_gh_owner   = 'szfg2'
    dictation_gh_repo    = 'patient-data'
    dictation_gh_branch  = 'main'
}
$SecretNames = @('cdg_api_key', 'cdg_deepseek_key', 'dictation_openai_key', 'dictation_gh_token')


function Read-Keys {
    if (-not (Test-Path $KeysFile)) {
        ($Template | ConvertTo-Json) | Set-Content -Path $KeysFile -Encoding utf8
        Write-Host ""
        Write-Host "Created $KeysFile"
        Write-Host "Paste your keys into it, save, then run this again."
        Start-Process notepad.exe $KeysFile
        return $null
    }

    $keys = @{}
    (Get-Content -Raw $KeysFile | ConvertFrom-Json).PSObject.Properties | ForEach-Object {
        if ($_.Value) { $keys[$_.Name] = [string]$_.Value }
    }

    $has = $false
    foreach ($n in $SecretNames) { if ($keys[$n]) { $has = $true } }
    if (-not $has) {
        Write-Host ""
        Write-Host "$KeysFile has no keys in it yet."
        Start-Process notepad.exe $KeysFile
        return $null
    }

    # pft.html predates the shared key and still reads its own copy
    if ($keys['cdg_api_key'] -and -not $keys['anthropic_api_key']) {
        $keys['anthropic_api_key'] = $keys['cdg_api_key']
    }
    return $keys
}


function New-SeedHtml($keys, [string]$page) {
    $sets = ($keys.GetEnumerator() | ForEach-Object {
        '  localStorage.setItem({0}, {1});' -f (ConvertTo-Json $_.Key -Compress), (ConvertTo-Json $_.Value -Compress)
    }) -join "`n"
    return "<!doctype html><meta charset=utf-8><title>Opening...</title>" +
           "<body style='background:#191919;color:#ddd;font:14px system-ui;padding:2rem'>" +
           "Loading keys...<script>`n" + $sets + "`n" +
           "  location.replace(" + (ConvertTo-Json ('/' + $page) -Compress) + ");`n" +
           "</script></body>"
}


function New-WipeHtml {
    return "<!doctype html><meta charset=utf-8><title>Signed out</title>" +
           "<body style='background:#191919;color:#ddd;font:14px system-ui;padding:2rem'>" +
           "<script>try{localStorage.clear();sessionStorage.clear();}catch(e){}</script>" +
           "<p>Keys and cached lists cleared from this browser.</p>" +
           "<p style='color:#8d8a86'>Close this tab. Anything you saved to GitHub is untouched.</p></body>"
}


$Cache = @{}
function Get-Upstream([string]$path) {
    if ($Cache.ContainsKey($path)) { return $Cache[$path] }
    $wc = New-Object System.Net.WebClient
    try {
        $bytes = $wc.DownloadData($Base + $path)
        $type = $wc.ResponseHeaders['Content-Type']
        if (-not $type) { $type = 'application/octet-stream' }
        $item = @{ Bytes = $bytes; Type = $type }
        $Cache[$path] = $item
        return $item
    } catch {
        return $null
    } finally {
        $wc.Dispose()
    }
}


function Send-Http($stream, [string]$status, [string]$type, [byte[]]$body) {
    $head = "HTTP/1.1 $status`r`n" +
            "Content-Type: $type`r`n" +
            "Content-Length: $($body.Length)`r`n" +
            "Cache-Control: no-store`r`n" +
            "Connection: close`r`n`r`n"
    $hb = [Text.Encoding]::ASCII.GetBytes($head)
    $stream.Write($hb, 0, $hb.Length)
    if ($body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
    $stream.Flush()
}


function Test-PortBusy {
    $c = New-Object System.Net.Sockets.TcpClient
    try { $c.Connect('127.0.0.1', $Port); return $true }
    catch { return $false }
    finally { $c.Close() }
}


# ---- fallback -------------------------------------------------------------
# A locked-down machine may block .NET sockets outright. Rather than fail, open
# the real hosted page; the keys then have to be typed into Settings once.
function Open-Hosted([string]$why) {
    Write-Host ""
    Write-Host "Could not start the local helper ($why)."
    Write-Host "Opening the hosted page instead - enter your keys in Settings once,"
    Write-Host "and this browser will remember them."
    $p = $Page
    if ($WipeMode) { $p = $DefaultPage }
    Start-Process ("$Base/$p")
}


# ---- main -----------------------------------------------------------------
if (Test-PortBusy) {
    # An earlier run already seeded this browser's localStorage for this origin.
    Write-Host "Helper already running - opening the page."
    $p = $Page
    if ($WipeMode) { $p = '__wipe' }
    Start-Process ("http://127.0.0.1:$Port/$p")
    return
}

$keys = $null
if (-not $WipeMode) {
    $keys = Read-Keys
    if (-not $keys) { Read-Host "`nPress Enter to close" | Out-Null; return }
}

try {
    $listener = New-Object System.Net.Sockets.TcpListener([Net.IPAddress]::Loopback, $Port)
    $listener.Start()
} catch {
    Open-Hosted $_.Exception.Message
    Read-Host "`nPress Enter to close" | Out-Null
    return
}

# The seed page carries the keys, so it lives behind a random path that is
# served once and then 404s for the rest of the run.
$token = [guid]::NewGuid().ToString('N')
$seedPath = "/__seed/$token"
$seedUsed = $false

if ($WipeMode) {
    $openPath = "/__wipe"
    Write-Host "Clearing saved keys from this browser."
} else {
    $openPath = $seedPath
    Write-Host "Serving $Base through http://127.0.0.1:$Port"
    Write-Host ("Opening $Page with {0} saved settings." -f $keys.Count)
}
Write-Host "Keep this window open while you use the page. Close it to stop."
Start-Process ("http://127.0.0.1:$Port$openPath")

while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
        $client.ReceiveTimeout = 5000
        $client.SendTimeout = 20000
        $stream = $client.GetStream()
        $stream.ReadTimeout = 5000

        $reader = New-Object System.IO.StreamReader($stream, [Text.Encoding]::ASCII)
        $request = $reader.ReadLine()

        if ($request) {
            while ($true) {
                $h = $reader.ReadLine()
                if ($null -eq $h -or $h -eq '') { break }
            }

            $path = ($request -split ' ')[1]
            $q = $path.IndexOf('?')
            if ($q -ge 0) { $path = $path.Substring(0, $q) }
            if ($path -eq '/') { $path = '/' + $DefaultPage }

            if ($path -eq $seedPath -and -not $seedUsed) {
                $seedUsed = $true
                $body = [Text.Encoding]::UTF8.GetBytes((New-SeedHtml $keys $Page))
                Send-Http $stream '200 OK' 'text/html; charset=utf-8' $body
            }
            elseif ($path -eq '/__wipe') {
                $body = [Text.Encoding]::UTF8.GetBytes((New-WipeHtml))
                Send-Http $stream '200 OK' 'text/html; charset=utf-8' $body
            }
            elseif ($path.StartsWith('/__seed/')) {
                Send-Http $stream '404 Not Found' 'text/plain' ([Text.Encoding]::ASCII.GetBytes('gone'))
            }
            else {
                $item = Get-Upstream $path
                if ($item) {
                    Send-Http $stream '200 OK' $item.Type $item.Bytes
                } else {
                    Send-Http $stream '404 Not Found' 'text/plain' ([Text.Encoding]::ASCII.GetBytes('not found'))
                }
            }
        }
    } catch {
        # preconnect with no request, or the browser hung up - just move on
    } finally {
        try { $client.Close() } catch {}
    }
}
