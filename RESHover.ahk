; RES Hover - a small round button on the screen edge. Hover it for the RES tools;
; picking a tool jumps to its window if it's already open, otherwise opens it.
; Drag the button to move it (position is remembered); right-click for the menu.
; AutoHotkey v1.1

#NoEnv
#SingleInstance Force
#Persistent
SetBatchLines -1
SetWinDelay -1
SetTitleMatchMode RegEx
CoordMode Mouse, Screen

Base       := "https://szfg2.github.io/notionwidget/"
Browser    := "chrome.exe"   ; tried first; Edge is the fallback
AppWindows := true           ; each tool gets its own window (no tabs), so it can always be found again
Ini        := A_AppData "\RESHover.ini"

; label, page, regex for that page's window title
Tools := [["Document Generator", "index.html",     "^Clinical Document Generator"]
        , ["Dictation",          "dictation.html", "^Dictation . Note"]
        , ["PFT",                "pft.html",       "^PFT Interpreter( - |$)"]
        , ["PFT v2",             "pft2.html",      "^PFT Interpreter v2"]
        , ["PFT Reporter",       "pft3.html",      "^PFT Reporter"]
        , ["Blue Letters",       "RESblue.html",   "^Respiratory Blue Letters"]
        , ["Clinic Notes",       "RESClinic.html", "^Respiratory Clinic Notes"]
        , ["ICU List",           "ICUList.html",   "^ICU Patient List"]
        , ["Ward Round List",    "GWList.html",    "^General Ward Round List"]
        , ["Lung Nodules",       "LUNI.html",      "^LUNI"]
        , ["Drop",               "https://szfg2.github.io/drop/", "^Drop( - |$)"]
        , ["All tools (hub)",    "RES.html",       "^Respiratory Tools"]]
Browsers := "ahk_exe i)\\(msedge|chrome)\.exe$"

cBg := "1F201F", cText := "EEECE8", cMuted := "9A9892", cAccent := "65C1A7"
BtnSize := 34, RowH := 28, PanelW := 210
Shown := false, HotRow := 0, HoverSince := 0, LastIn := 0

; ---- button ----
Gui, Btn:New, +AlwaysOnTop -Caption +ToolWindow +HwndBtnHwnd
Gui, Btn:Margin, 0, 0
Gui, Btn:Color, %cAccent%
Gui, Btn:Font, s12 c191919 Bold, Segoe UI
Gui, Btn:Add, Text, x0 y0 w%BtnSize% h%BtnSize% Center 0x200, R
SysGet, WA, MonitorWorkArea
IniRead, BtnX, %Ini%, Button, x, % WARight - BtnSize - 2
IniRead, BtnY, %Ini%, Button, y, % WATop + (WABottom - WATop) // 2
Gui, Btn:Show, x%BtnX% y%BtnY% w%BtnSize% h%BtnSize% NoActivate
WinSet, Region, 0-0 w%BtnSize% h%BtnSize% E, ahk_id %BtnHwnd%

; ---- panel ----
Gui, Panel:New, +AlwaysOnTop -Caption +ToolWindow +Border +HwndPanelHwnd
Gui, Panel:Margin, 0, 0
Gui, Panel:Color, %cBg%
Gui, Panel:Font, s8 c%cMuted%, Segoe UI
Gui, Panel:Add, Text, x14 y8 w180 h16, RES TOOLS
Gui, Panel:Font, s10 c%cText%
RowOf := {}
NameW := PanelW - 28
for i, t in Tools {
    y := 28 + (i - 1) * RowH
    Gui, Panel:Add, Text, x12 y%y% w14 h%RowH% 0x200 c%cAccent% vDot%i% gPick HwndH1
    Gui, Panel:Add, Text, x28 y%y% w%NameW% h%RowH% 0x200 vName%i% gPick HwndH2, % t[1]
    RowOf[H1 + 0] := i, RowOf[H2 + 0] := i
}
PanelH := 28 + Tools.Length() * RowH + 8

Menu, Tray, NoStandard
Menu, Tray, Add, Reset position, ResetPos
Menu, Tray, Add, Reload, DoReload
Menu, Tray, Add, Exit, DoExit
Menu, Tray, Tip, RES tools

OnMessage(0x201, "WM_LBUTTONDOWN")
OnMessage(0x232, "WM_EXITSIZEMOVE")
SetTimer, Watch, 80
return


Watch:
    MouseGetPos, , , win, ctl, 2
    if (win = BtnHwnd) {
        if (!Shown && !GetKeyState("LButton", "P")) {
            if (!HoverSince)
                HoverSince := A_TickCount
            else if (A_TickCount - HoverSince > 150)
                ShowPanel()
        }
        LastIn := A_TickCount
    } else {
        HoverSince := 0
        if (Shown && win = PanelHwnd) {
            LastIn := A_TickCount
            SetHot(RowOf.HasKey(ctl + 0) ? RowOf[ctl + 0] : 0)
        } else if (Shown && A_TickCount - LastIn > 400)
            HidePanel()
    }
return

Pick:
    OpenTool(RegExReplace(A_GuiControl, "\D"))
return

BtnGuiContextMenu:
    HidePanel()
    Menu, Tray, Show
return

ResetPos:
    IniDelete, %Ini%, Button
    SysGet, WA, MonitorWorkArea
    BtnX := WARight - BtnSize - 2, BtnY := WATop + (WABottom - WATop) // 2
    Gui, Btn:Show, x%BtnX% y%BtnY% NoActivate
return

DoReload:
    Reload
return

DoExit:
    ExitApp
return


ShowPanel() {
    global
    local bx, by, x, y, mon
    WinGetPos, bx, by, , , ahk_id %BtnHwnd%
    mon := MonitorAt(bx + BtnSize // 2, by + BtnSize // 2)
    SysGet, M, MonitorWorkArea, %mon%
    ; open towards the middle of the screen
    if (bx + BtnSize // 2 > (MLeft + MRight) // 2)
        x := bx - PanelW - 6
    else
        x := bx + BtnSize + 6
    y := by + BtnSize // 2 - PanelH // 2
    y := Max(MTop + 4, Min(y, MBottom - PanelH - 4))
    for i, t in Tools
        GuiControl, Panel:, Dot%i%, % WinExist(t[3] " " Browsers) ? Chr(0x25CF) : ""
    Gui, Panel:Show, x%x% y%y% w%PanelW% h%PanelH% NoActivate
    Shown := true
    LastIn := A_TickCount
}

HidePanel() {
    global
    Gui, Panel:Hide
    Shown := false
    SetHot(0)
}

SetHot(i) {
    global
    if (i = HotRow)
        return
    if (HotRow) {
        GuiControl, Panel:+c%cText%, Name%HotRow%
        GuiControl, Panel:MoveDraw, Name%HotRow%
    }
    if (i) {
        GuiControl, Panel:+c%cAccent%, Name%i%
        GuiControl, Panel:MoveDraw, Name%i%
    }
    HotRow := i
}

OpenTool(i) {
    global
    local t, url, hwnd, mm
    HidePanel()
    t := Tools[i]
    if (hwnd := WinExist(t[3] " " Browsers)) {
        WinGet, mm, MinMax, ahk_id %hwnd%
        if (mm = -1)
            WinRestore, ahk_id %hwnd%
        WinActivate, ahk_id %hwnd%
        return
    }
    url := InStr(t[2], "://") ? t[2] : Base t[2]
    if (AppWindows) {
        Run, %Browser% --app="%url%", , UseErrorLevel
        if ErrorLevel
            Run, msedge.exe --app="%url%", , UseErrorLevel
        if ErrorLevel
            Run, %url%
    } else
        Run, %url%
}

MonitorAt(x, y) {
    SysGet, n, MonitorCount
    Loop % n {
        SysGet, m, Monitor, %A_Index%
        if (x >= mLeft && x < mRight && y >= mTop && y < mBottom)
            return A_Index
    }
    return 1
}

; drag the button by holding the left mouse button on it
WM_LBUTTONDOWN(wParam, lParam, msg, hwnd) {
    global BtnHwnd
    if (A_Gui = "Btn") {
        HidePanel()
        PostMessage, 0xA1, 2, , , ahk_id %BtnHwnd%
    }
}

WM_EXITSIZEMOVE(wParam, lParam, msg, hwnd) {
    global BtnHwnd, Ini
    if (hwnd = BtnHwnd) {
        WinGetPos, x, y, , , ahk_id %BtnHwnd%
        IniWrite, %x%, %Ini%, Button, x
        IniWrite, %y%, %Ini%, Button, y
    }
}
