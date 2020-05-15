const UserModel = require('./UserModel')
let User = new UserModel()

// Mặc định Node.js cho phép 10 listeners trên cùng một sự kiện, Tới công việc thứ 11 Node.js sẽ thông báo lỗi. Nhưng không sao cả, chúng ta có thể sử dụng hàm setMaxListeners để tăng giới hạn đó.
// EventEmitter.setMaxListeners(17); // ví dụ mình nâng lên 17 listeners.
// Vì đã kế thừa events nên class User có thể sử dụng method .on()
User.on('saved', (user) => {
	console.log(`New user saved: ${user.name} - ${user.occupation}`)
})
User.on('saved', (user) => {
	console.log(`New user saved 2: ${user.name} - ${user.occupation}`)
})

// Lưu thêm 2 thằng user mới.
let trungquandev04 = {
	id: 4,
	name: 'Trungquandev04',
	occupation: 'Code xịn (─‿‿─)',
}
let trungquandev05 = {
	id: 5,
	name: 'Trungquandev05',
	occupation: 'Code lởm (-.-)',
}

User.saveUser(trungquandev04) // phat ra su kien 'save'
User.saveUser(trungquandev05)

// Lấy ra toàn bộ users
let allUser = User.allUser()
console.log(allUser)

/** Monitoring Folder */

const ObserveClass = require('./observe')
// Init Observe object
let Observe = new ObserveClass()
// Define folder to watching, in real project, you should put it in file config or env
let targetFolder = './storage/logs.dev'
// Listen event new file has been added
Observe.on('new-file-has-been-added', (logData) => {
	// In this step, you can do anything you want, like to push alert message to chatwork, slack...vv
	// I just print error message to console
	console.log(logData.message)
})
// Start watching folder...
Observe.watchFolder(targetFolder)

/** Monitoring File */
// Define file to watching, in real project, you should put it in file config or env
let targetFile = './storage/logs.dev/laravel.log.txt'
// Listen event file has been updated
Observe.on('file-has-been-updated', (logData) => {
	// In this step, you can do anything you want, like to push alert message to chatwork, slack...vv
	// I just print error message to console
	console.log(logData.message)
})
// Start watching file...
Observe.watchFile(targetFile)
