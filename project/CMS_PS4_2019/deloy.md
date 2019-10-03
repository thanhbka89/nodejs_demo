B0: Moi truong:
- Version:
    window: 10
    git: 2.21
    node : v10.16.0
    npm: 6.9.0
    vuejs: 2.2.2
    vue-cli: 3.8.4
- Show package installed : `npm list --depth=0`
- Su dung npm:
    + Cai package global : `npm install -g gulp`
    + Go bo package global : `npm uninstall -g jshint`

    + Cai dat trong local project, muc devDependencies : `npm i lodash --save-dev`
    + Cài đặt một package và lưu nó vào dependencies: `npm i –S express`
    + Remove local package và gỡ ra khỏi package.json:
        `npm uninstall --save lodash` // go bo trong "dependencies"
        `npm uninstall --save-dev lodash`  // go bo trong "devDependency"

B1: Cai dat pm2:
    `npm install pm2@latest -g`
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
- Di chuyển đến thư mục root của Nginx, mo CMD go :
    `cd /d D:\Tools\webserver\nginx-1.17.1`
- Cac lenh hay dung:
    # Khởi động nginx: `start nginx`
    # Dừng nginx : `nginx -s stop`
    # Thoát nginx, cái này là thoát hết ứng dụng Nginx đang chạy : `nginx -s quit`
    # Load lại nginx khi bạn thay đổi cấu hình của Nginx: `nginx -s reload`
    # Mở file logs : `nginx -s reopen`
- Kiem tra nginx chay chua :
    tasklist /fi "imagename eq nginx.exe"

- Cai Nginx là service tren window (tu chay khi bat window):

# Cach1: http://oss-world.blogspot.com/2015/10/install-nginx-as-windows-service-using.html
    + Download nssm (https://nssm.cc/) and unzip
    + Truy cap thu muc unzip phia tren (vd : \Tools\webserver\nssm-2.24\win64)
        nssm.exe install nginx
    + Chon duong dan den file nginx.exe
    + Click nut Install service
    + Gõ Ctrl+R, gõ `services.msc` và tìm đến nginx rồi Start
    + Kiem tra thành cong : http://localhost/

# Cach 2: Windows Task Scheduler
    + Mo `Task Scheduler` -> click `Create Basic Task` -> dat ten Task -> tai man hinh Trigger, chon `When the computer starts` -> tai man hinh Action, chon `Start a program` roi chon den file batch, ex: D:\SourceCode\Project\nodejs_demo\project\CMS_PS4_2019\start_nginx.bat

    + Sau khi tao xong, double click vao task, tai man hinh General:
        * Chon `Change User or Group` -> chon user `System` de du quyen chay
        * Tick vao `Run with Highest privilege` -> chon OK

# Cach 3: Windows Startup shortcut - chi chay tren user nay, phu hop cho Dev
    + Go `Window + R` de mo cua so Run, go : `shell:startup`
    + Trong thu muc Startup, click chuot phai de tao new Shortcut, roi chon den duong dan cai nginx. ex : D:\Tools\nginx-1.17.4\nginx.exe
    --> nginx tu dong chay khi ban login vao he thong

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
    * Cach 1:
      - Tạo service : `nssm.exe install PM2Service`
          Path: `D:\Source\nodejs_demo\project\CMS_PS4_2019\pm2_startup.bat`
          Startup Type: `Automatic delayed`
          Restart: `None`
          (If you want to delete service, run: `nssm.exe remove PM2Service`)
      - Vao services.msc va Start service PM2Service
      - Just after restart window, open command prompt (as Administrator) and run
      `pm2 status` → our application is running
    * Cach 2: Dung Task Scheduler
      + Chinh sua noi dung file `pm2_startup.bat` theo user dang cai dat cho phu hop
      + Mo `Task Scheduler` -> click `Create Basic Task` -> dat ten Task -> tai man hinh Trigger, chon `When the computer starts` -> tai man hinh Action, chon `Start a program` roi chon den file batch, ex: D:\SourceCode\Project\nodejs_demo\project\CMS_PS4_2019\pm2_startup.bat

      + Sau khi tao xong, double click vao task, tai man hinh General:
        * Chon `Change User or Group` -> chon user `System` de du quyen chay
        * Tick vao `Run with Highest privilege` -> chon OK

B5 (Option) : Danh cho cac lan deploy sau, hoan thien tinh nang
- B5.1: Dung cac app trong pm2 : mở console cmd với quyền administrator
    `pm2 stop all`
- B5.2: Trong thu muc CMS_PS4_2019 :
    + Sửa file src/config/index.js cho deploy lên PRD :
        serverURI: 'http://127.0.0.1:8989/api/ps4/v1'
    + `rm -rf dist\`
    + `npm run build`
- B5.3: Trong thư mục API_PS4:
    + Sửa file .env, comment lại dòng PORT như sau :
        #PORT=9090
    + Sửa file config/config.js, sửa dòng tên db :
        database: 'cms_ps'
    + `npm run clean`
    + `npm run build`
- B5.4: De tiep tuc DEV, thì trong Git chọn 3 file đã sửa phía trên và Discard Changes
- B5.5 : Chay lại các app trong pm2 trên PRD:
    + Note: dùng phan mem cports với quyền admin để kill port 5000 và 8989 trước khi chạy lệnh dưới
    + `pm2 restart all`
        hoặc
        `pm2 reload all`

B6: Backup MySQL
B6.1 : Moi truong Linux, su dung file : `project\CMS_PS4_2019\mysql-backup.sh`
- Testing backup:
    + Chay lenh : `/usr/local/bin/mysql-backups.sh`
    + Kiem tra: `ls -l /data/db-backups`

- Tu dong chay script:
    + Chay voi user root: `chmod 744 /usr/local/bin/mysql-backup.sh`
    + Go lenh : `crontab -e` và thêm vào dòng sau
    `30 22 * * * /usr/local/bin/mysql-backups.sh > /dev/null 2>&1`
    --> Basically this will enable the script to run at 10:30pm every day. It will also hide any output from the program as the program logs to disk.
- Khoi phuc file backup:
    `cd /data/db-backups`
    `gunzip db-mybigdatabase-20140305-152229.sql.gz`
    `mysql -u [username] -p [DB name] < db-mybigdatabase-20140305-152229.sql`

B6.2: Moi truong Window, su dung file : `project\CMS_PS4_2019\mysql_backup.bat`
chinh sua thong so phu hop
- Lap lich tu dong su dung Task Schedule:
    + Mở Task Scheduler -> click tab Action -> Chọn Create Basic Task : để tạo mới 1 tác vụ
    + Đặt tên trong mục Name : MySQLBackupDaily
    và nhập DEscription
    + Phần TRigger: thời gian mà thực hiện tác vụ
    + Phần Action chọn Start a program và trỏ đường dẫn tới file .bat
    `C:\working\code\nodejs_demo\project\CMS_PS4_2019\mysql_backup.bat`

B7 (Option) : Deploy CMS (vuejs) lên Internet
B7.1 : Deploy CMS (vuejs) lên Heroku
- Login vào https://dashboard.heroku.com tạo app mới hoặc dùng app đã tạo trước đó.
- Copy thu muc cms ra cho khac, ex: D:\Deploy\CMS_PS4_2019
- Truy cap thu muc tren, :  D:\Deploy\CMS_PS4_2019
  + Sua file .gitigore : remove thu muc `dist/`
  + Chuot phai chon Terminal, go :
    `npm run build`
    `heroku login`
    `git init`
    `heroku git:remote -a psbaonguyen`
    `git add .` \\thuc hien lenh nay moi khi co thay doi code
    `git commit -am "init"` \\thuc hien lenh nay moi khi co thay doi code
    `git push heroku master` \\thuc hien lenh nay moi khi co thay doi code
  --> Sau do truy cap de test : https://psbaonguyen.herokuapp.com/

B8 (Option) : MySQL command in Linux
- SSH : 149.28.231.149 với root/R4m(zmba)j$rXSRH
    MySQL: root/nguyenmaithanh89

- Check server mysql running : `mysqladmin -u root -p ping`
- Checl mysql version: `mysqladmin -u root -p version`
- Show status mysql server: `mysqladmin -u root -ptmppassword status`
- Check status of all MySQL Server Variable’s and value’s:
    `mysqladmin -u root -p extended-status`
- Check all the running Process of MySQL server: `mysqladmin -u root -p processlist`
- Create a Database: `mysqladmin -u root -p create databasename`
- Drop a db : `mysqladmin -u root -p drop databasename`
- Export db : `mysqldump -u user_name -p database_name > demo.sql`
- Export (backup) db : `mysqldump -uroot -p123456a@ database_name > database_name-$(date +%Y%m%d).sql`
- Reload/refresh MySQL Privileges:
    # mysqladmin -u root -p reload;
    # mysqladmin -u root -p refresh
- Shutdown MySQL server Safely: `mysqladmin -u root -p shutdown`

### Thao tác cơ bản cho import lai db:
- Truy cập mysql shell: `mysql -u root -p`
- Xem các DBs: `SHOW DATABASES;`
- Drop db old: `DROP DATABASE cms_ps_dev;`
- Tao moi lai db: `CREATE DATABASE cms_ps_dev;`
- Chọn DB cần làm việc: `USE dbName;`
- Xem các tables trong DB : `SHOW TABLES;`
- Ket thuc session : `quit;`
- Import lai db : `mysql –u root –p cms_ps_dev < ps4.sql`


