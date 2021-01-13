import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import ListCmp from './components/ListComponent';
import Caculator from './components/Caculator';
import RefCmp from './components/RefComponent';
import ContextComponent from './components/ContextComponent';
import ShowGirlFriends from './components/ShowGirlFriends';
import UseStateCmp from './components/UseStateCmp';
import UserCmp from './components/UserCmp';


const name = () => {
  return "I'm thanhbka"
} //ở đây mình viết tượng trưng cho một function có thể được nhúng vào bên trong JSX 

const hello = <h1> Hello {name()} </h1>;

function App() {
  const myGirlFriends = [
    {
      id: 1,
      name: "Khanh Huyen",
      email: "khanhhuyen123@freetuts.net",
    },
    {
      id: 2,
      name: "Nguyen Hang",
      email: "nguyenhang3dzas@freetuts.net",
    },
    {
      id: 3,
      name: "Pham Uyen",
      email: "phamuyenz@freetuts.net",
    },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          {hello}
        </p>        
      </header>
      <Hello message="war" />
      <ListCmp />
      <Caculator value="123" /> 
      <RefCmp />
      <ContextComponent />
      <ShowGirlFriends listGirlFriends={myGirlFriends}>
        {(data) => {
          //Nhận data từ component ShowGirlFriends khi nó trả về 
          //bằng đoạn props.children(person)
          console.log(data);
        }}
      </ShowGirlFriends>

      <UseStateCmp />
      <UserCmp />
    </div>
  );
}

export default App;
