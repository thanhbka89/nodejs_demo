B1: Cai dat pm2: 
    npm install pm2@latest -g
- Mot so lenh hay dung:
    + `pm2 show <id|name>` : to get more details about an app
    + `pm2 list` : liệt kê các app đang chạy
    + `pm2 stop/start/delete ungdung` : đọc là hiểu khỏi giải thích
    + `pm2 kill`: Kills all running applications
    + `pm2 restart`: Restarts all running applications
    + `pm2 reload`: Reloads the app configuration (this comes in handy when you modify your application’s environment variables)
    + `pm2 monit` : monitor ứng dụng đang chiếm bao nhiêu RAM, CPU, xem log, nói chung là nhìn tổng thể
    + `pm2 logs ungdung` : xem log của app có tên là ungdung
    + `pm2 flush`: Flushes all log data, freeing up disk space    

B1.1 : cai NGINX làm Reverse Proxy Server (su dung tren window)
- Tải bản Nginx cho Windows (http://nginx.org/en/download.html) và giải nén
- Di chuyển đến thư mục root của Nginx
    `cd /d D:\Tools\webserver\nginx-1.17.1`
- Cac lenh hay dung:
    # Khởi động nginx: `start nginx`
    # Dừng nginx : `nginx -s stop`
    # Thoát nginx, cái này là thoát hết ứng dụng Nginx đang chạy : `nginx -s quit`
    # Load lại nginx khi bạn thay đổi cấu hình của Nginx: `nginx -s reload`
    # Mở file logs : `nginx -s reopen`
- Kiem tra nginx chay chua :
    tasklist /fi "imagename eq nginx.exe"
- Cai Nginx là service tren window (tu chay khi bat window) : http://oss-world.blogspot.com/2015/10/install-nginx-as-windows-service-using.html
    + Download nssm (https://nssm.cc/) and unzip
    + Truy cap thu muc unzip phia tren (vd : \Tools\webserver\nssm-2.24\win64)
        nssm.exe install nginx
    + Chon duong dan den file nginx.exe
    + Click nut Install service
    + Gõ Ctrl+R, gõ `services.msc` và tìm đến nginx rồi Start
    + Kiem tra thành cong : http://localhost/

B1.2 : Cai mysql (mariadb msi) trên window: https://stackjava.com/install/mariadb-la-gi-cai-dat-mariadb-tren-windows-10.html
- passwd cho root : 123456a@

B2: Trong thu muc CMS_PS4_2019, gõ : DONE
    + npm run build
    + pm2 start server.js --name "CMS_PS4"

B2.1 : Cau hinh file hosts tren window, thêm :
    127.0.0.1 baonguyen.com
    127.0.0.1 api.baonguyen.com
- Cau hinh nginx lam reverse proxy cho vuejs, them vào file D:\Tools\webserver\nginx-1.17.1\conf\nginx.conf
    server {
		listen 80;

		server_name baonguyen.com;

		location / {
			proxy_pass http://127.0.0.1:5000;
			proxy_http_version 1.1;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection 'upgrade';
			proxy_set_header Host $host;
			proxy_cache_bypass $http_upgrade;
		}
	}
--> Sau do reload lại nginx, luc nay truy cap cms qua trinh duyet http://baonguyen.com/

B3: Trong thu muc API_PS4
    - npm run clean
    - npm run build

B4 : run PM2 startup on window (https://blog.cloudboost.io/nodejs-pm2-startup-on-windows-db0906328d75)
    - Chay các ung dung cần chạy khi window start : `pm2 start ungdung`
    Cu the:
        + Chay ung dung CMS da build o buoc B2:
        ` pm2 start D:\Source\nodejs_demo\project\CMS_PS4_2019\server.js --name "CMS_PS4" `

        + Chay ung dung API da build o buoc B3:
        ` pm2 start D:\Source\nodejs_demo\project\API_PS4\dist\server.js --name "API_PS4" `

    - Save current process list, gõ : `pm2 save`
    - Tạo service : `nssm.exe install PM2Service`
        Path: `D:\Source\nodejs_demo\project\CMS_PS4_2019\pm2_startup.bat`
        Startup Type: `Automatic delayed`
        Restart: `None`
        (If you want to delete service, run: `nssm.exe remove PM2Service`)
    - Vao services.msc va Start service PM2Service
    - Just after restart window, open command prompt (as Administrator) and run 
    `pm2 status` → our application is running 

B5 (Option) : Danh cho cac lan deploy sau, hoan thien tinh nang
- B5.1: Dung cac app trong pm2 : mở console cmd với quyền administrator
    `pm2 stop all`
- Trong thu muc CMS_PS4_2019 :
    + Sửa file src/config/index.js cho deploy lên PRD : 
        serverURI: 'http://127.0.0.1:8989/api/ps4/v1' 
    + `rm -rf dist\`
    + `npm run build`
- B5.2: Trong thư mục API_PS4:
    + Sửa file .env, comment lại dòng PORT như sau :
        #PORT=9090
    + Sửa file config/config.js, sửa dòng tên db :
        database: 'cms_ps'
    + `npm run clean`
    + `npm run build`
- B5.3: De tiep tuc DEV, thì trong Git chọn 3 file đã sửa phía trên và Discard Changes
- B5.4 : Chay lại các app trong pm2 trên PRD:
    `pm2 restart all`
    hoặc
    `pm2 reload all`

	