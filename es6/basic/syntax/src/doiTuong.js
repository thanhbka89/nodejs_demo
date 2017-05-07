Account = function(amount, lowest)
{
   this.balance = amount;
   this.minimum = lowest;
};

Account.prototype.deposit = function(amount)
{
  this.balance += amount;
};

Account.prototype.widthdraw = function(amount)
{
  this.balance -= amount;
};

console.log('doituong');
//Khởi tạo 1 đối tượng
account = new Account(500, 200);
//Gọi phương thức withdraw của đối tượng đó
account.withdraw(100);
//truy cập đến thuộc tính
console.log(account.balance);
//Gán lại giá trị cho thuộc tính
Account.balance = 1;
