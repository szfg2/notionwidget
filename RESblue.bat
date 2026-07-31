@echo off
title RESblue
cd /d "%~dp0"
python resblue_server.py
if errorlevel 9009 (
  echo.
  echo Python was not found on PATH.
  pause
)
