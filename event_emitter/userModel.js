const EventEmitter = require('events').EventEmitter

// Fake database.
let database = {
	users: [
		{ id: 1, name: 'Trungquandev01', occupation: 'developer' },
		{ id: 2, name: 'Trungquandev02', occupation: 'writer' },
		{ id: 3, name: 'Trungquandev03', occupation: 'designer' },
	],
}

class UserModel extends EventEmitter {
	constructor() {
		super() // Từ khóa super được sử dụng để gọi các hàm trên đối tượng cha, ở đây đối tượng cha là EventEmitter
    }
    
	// Lưu user vào "database fake" ở trên.
	saveUser(user) {
		database.users.push(user)
		this.emit('saved', user) // sử dụng hàm .emit của thằng EventEmitter
    }
    
	// Liệt kê toàn bộ user hiện tại.
	allUser() {
		return database.users
	}
}

module.exports = UserModel
