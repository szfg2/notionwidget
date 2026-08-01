@echo off
title Respiratory Tools
cd /d "%~dp0"

rem Keys live outside this folder so they are never copied around with it.
rem Point RESTOOLS_KEYS somewhere else (a USB stick, OneDrive) to keep them
rem off a shared machine's hard disk:
rem   set "RESTOOLS_KEYS=E:\resblue-keys.json"
if not defined RESTOOLS_KEYS set "RESTOOLS_KEYS=%USERPROFILE%\.resblue-keys.json"

:menu
cls
echo.
echo   ===========================================
echo    RESPIRATORY TOOLS
echo   ===========================================
echo.
echo    1   Document Generator
echo    2   Dictation
echo    3   PFT
echo    4   Blue Letters
echo    5   Clinic Notes
echo    6   ICU List
echo    7   Ward Round List
echo.
echo    8   Hub  (all tools, click through)
echo.
echo    K   Edit saved keys
echo    W   Sign out  (wipe keys from this browser)
echo    Q   Quit
echo.

choice /c 12345678KWQ /n /m "   Pick a tool: "
set "PICK=%errorlevel%"

if "%PICK%"=="1"  set "PAGE=index.html"
if "%PICK%"=="2"  set "PAGE=dictation.html"
if "%PICK%"=="3"  set "PAGE=pft.html"
if "%PICK%"=="4"  set "PAGE=RESblue.html"
if "%PICK%"=="5"  set "PAGE=RESClinic.html"
if "%PICK%"=="6"  set "PAGE=ICUList.html"
if "%PICK%"=="7"  set "PAGE=GWList.html"
if "%PICK%"=="8"  set "PAGE=RES.html"
if "%PICK%"=="9"  goto keys
if "%PICK%"=="10" set "PAGE=__wipe"
if "%PICK%"=="11" goto :eof

echo.

if not exist "%~dp0restools.ps1" (
  echo    restools.ps1 is missing from this folder:
  echo      %~dp0
  echo.
  echo    Both files have to sit side by side. If you saved it with Notepad
  echo    it may have become restools.ps1.txt - turn on View ^> Show ^> File
  echo    name extensions in Explorer to check, then rename it.
  echo.
  pause
  goto menu
)

set "RESTOOLS_PAGE=%PAGE%"

rem Passed as -Command rather than -File on purpose: execution policy governs
rem script files, so a managed machine that blocks .ps1 still runs this.
powershell -NoProfile -ExecutionPolicy Bypass -Command "Invoke-Expression ((Get-Content -Raw '%~dp0restools.ps1'))"

rem Without this the window would close over the top of any error message.
if errorlevel 1 (
  echo.
  echo    The helper stopped with an error - see the message above.
  pause
)
goto :eof

:keys
if not exist "%RESTOOLS_KEYS%" powershell -NoProfile -Command "@{cdg_provider='anthropic';cdg_api_key='';cdg_deepseek_key='';dictation_openai_key='';dictation_gh_token='';dictation_gh_owner='szfg2';dictation_gh_repo='patient-data';dictation_gh_branch='main'} | ConvertTo-Json | Set-Content -Path '%RESTOOLS_KEYS%' -Encoding utf8"
start "" notepad.exe "%RESTOOLS_KEYS%"
goto menu
