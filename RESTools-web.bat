@echo off
rem Plain menu of hosted links - no PowerShell, no local server, no keys file.
rem
rem Nothing outside an origin can write that origin's localStorage, so this
rem cannot pre-fill your API keys. Enter them once in each tool's Settings and
rem the browser remembers them for next time.
rem
rem Use this when RESTools.bat is blocked by machine policy.

title Respiratory Tools
set "BASE=https://szfg2.github.io/notionwidget"

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
echo    Q   Quit
echo.

choice /c 12345678Q /n /m "   Pick a tool: "
set "PICK=%errorlevel%"

if "%PICK%"=="1" set "PAGE=index.html"
if "%PICK%"=="2" set "PAGE=dictation.html"
if "%PICK%"=="3" set "PAGE=pft.html"
if "%PICK%"=="4" set "PAGE=RESblue.html"
if "%PICK%"=="5" set "PAGE=RESClinic.html"
if "%PICK%"=="6" set "PAGE=ICUList.html"
if "%PICK%"=="7" set "PAGE=GWList.html"
if "%PICK%"=="8" set "PAGE=RES.html"
if "%PICK%"=="9" goto :eof

start "" "%BASE%/%PAGE%"
goto :eof
