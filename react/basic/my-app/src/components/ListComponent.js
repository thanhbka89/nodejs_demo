import React from "react";
 
function ListComponent(props) {
  const myList = [
    {
      id : 'p',
      name : 'php'
    },
    {
      id : 'j',
      name : 'javascript'
    },
    {
      id : 'py',
      name : 'python'
    },
    {
      id : 'c',
      name : 'C++'
    },
    {
        id : 'sf',
        name : 'salesforce'
    }
  ]
 
  //Thêm thuộc tính key vào trong thẻ jsx
  const listItems = myList.map((item) =>
    <li key = {item.id}>{item.name}</li>
  );
 
  return (
    <ul>{listItems}</ul>
  );
}
 
export default ListComponent