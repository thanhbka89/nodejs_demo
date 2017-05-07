var name = "Tuan LM";

var getName = function(){
  return name
}

var x = {
   name : "x",
   tellName : function(){
          console.log("my name is " + this.name)
        }
};


module.exports.name = name;        // add thêm vào object module.exports biến name
module.exports.getName = getName;
module.exports.obj = x;
