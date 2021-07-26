## Su dung cluster voi PM2
- Config in ecosystem.config.js
- Run : pm2 start ecosystem.config.js
- You can start, restart, reload, stop and delete an app :
    pm2 start app_name
    pm2 restart app_name
    pm2 stop app_name
    pm2 delete app_name

    # Or using an Ecosystem file:
    pm2 [start|restart|reload|stop|delete] ecosystem.config.js

## Cac lenh PM2 hay dung
- `pm2 ls` : list the status apps
- `pm2 logs` : display logs in realtime
- `pm2 monit`: display a realtime dashboard