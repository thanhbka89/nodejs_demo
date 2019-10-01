@ECHO OFF
REM Start Nginx
set logfile=D:\Tools\nginx_service.log
tasklist /FI "IMAGENAME eq nginx.exe" 2>NUL | find /I /N "nginx.exe">NUL
IF NOT "%ERRORLEVEL%"=="0" (
   REM Nginx is NOT running, so start it
   echo START %date% %time% >> %logfile%
   d:
   cd \Tools\nginx-1.17.4\
   start nginx.exe
   ECHO Nginx started.
) else (
   ECHO Nginx is already running.
   echo RUN %date% %time% >> %logfile%
)
