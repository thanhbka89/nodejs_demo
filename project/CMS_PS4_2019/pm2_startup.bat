@echo off
set HOMEDRIVE=C:
@REM set HOMEPATH=\Users\%USERNAME%
set PM2_HOME=c:\Users\admin\.pm2

@REM Ensure that pm2 command is part of your PATH variable
@REM  if you're not sure, add  it here, as follow:
set path=C:\Users\admin\AppData\Roaming\npm;%path%

set logfile=D:\Tools\webserver\logs\pm2.log
echo RUN %date% %time% >> %logfile%

@REM Optionally, you can add 'pm2 kill' just before 
@REM  resurrect (adding a sleep between 2 commands):
@REM  	pm2 kill
@REM  	timeout /t 5 /nobreak > NUL
@REM  	pm2 resurrect
@REM otherwise, you can simple call resurrect as follow:
pm2 resurrect
echo "DONE"