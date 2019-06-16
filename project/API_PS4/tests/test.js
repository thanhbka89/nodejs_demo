const HashService = require('../api/services/hashService');

let data = {};
data.password = '123456a@';
let hashed = HashService.saltHashPassword(data.password);

console.log(hashed);
