export const asyncMiddleware = fn => (req, res, next) => {
    Promise
        .resolve(fn(req, res, next))
        .catch(next)
}


// Usage
/**
Dùng try/catch để bắt error là chuyện như ăn cơm trong giới developers rồi. Nhưng dùng lại một chút, chứ nếu có 100 routes thì thế nào, chẳng nhẽ function nào cũng phải copy cái try/catch vậy à??? Câu hỏi đúng rồi đấy, đọc bài này đúng rồi đấy, cách đơn giản nè: 

Tạo một function thứ 3 đa số nằm trong file Utils á:

Util.js

module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};


Sử dụng nè: Controller.js

const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id); // f.ex. mongoose findById method
}


Routes.js

const asyncMiddleware = require('Util');
router.get("/user/:id", asyncMiddleware(getUser));
 */