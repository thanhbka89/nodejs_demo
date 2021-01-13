### Setup
- node : v14.15
- npm : v6.14
- Cai dat react:
    `npx create-react-app my-app`
    `cd my-app`
    `npm start`


### basic
# JSX : Javascript + XML
- syntax: const name = <h1> Pham Hieu </h1>;
- convert html -> JSX : https://magic.reactjs.net/htmltojsx.htm
- attributes với JSX:
    const element = <div tabIndex="0"></div>;
    hoac
    const element = <img src={user.avatarUrl} />;
- note: Trong JSX chúng ta cũng nên lưu ý một số attribute của html sẽ không viết giống html như <div class="App"> </div> , JSX sẽ viết thành <div className="App"> </div>
React DOM sử dụng thuộc tính camelCase cho tên của thuộc tính cho phép chuyển đổi dễ hơn giữa HTML và JSX. Ví dụ trong HTML có thuộc tính `class`, JSX sẽ chuyển thành `className`, `tabindex` -> `tabIndex`.

# Component: thường được viết theo 2 loại chính đó là functional component và class components
- functional components:
    import React from "react";
    const Welcome = (props) => {
        console.log(props) //Giá trị của props
        return (
            <div>
                <h1>Xin chào {props.name} !</h1>
            </div>
        );
    };
    export default Welcome;

- class component:
    import React, { Component } from "react";
    class Welcome extends Component {
    render() {
        return (
        <div>
            <h1>Welcome ! I am a class component </h1>
        </div>
        );
    }
    }
    export default Welcome; 

- Props: nó là 1 đối tượng, nó được sử dụng như là để giữa các component tương tác với nhau. Component con sẽ nhận được các giá trị của thuộc tính truyền vào từ bên ngoài vào(có thể là cha) để thực hiện những thứ bên trong nó mà nó cần.
Prop được truyền theo thứ tự từ component cha xuống component con, và không truyền ngược lại, dữ liệu prop là `bất biến (imutable)`
    const Details = ( { name, language } ) => (
        <div>
            <p>{ name } works with { language }</p>
        </div>
    );

    const Layout = ( { title, ...props } ) => (
        <div>
            <h1>{title}</h1>
            <Details {...props}/>
        </div>
    );

    const App = () => (
        <Layout
            title="I'm here to stay"
            language="Javascript"
            name="Alex"
        />
    );

- State: lưu dữ liệu, nó lưu trong 1 component sinh ra nó và có thể thay đổi bằng this.setState(). Khi nào trong 1 component có dữ liệu thay đổi thì mình nên dùng state. và mỗi khi state thay đổi thì component đó `sẽ tự động re-render`.
State là dự liệu private, được quản lý bởi chính component chứa State đó. và bên ngoài Component không thể truy xuất 

--> Một component có thể tự thay đổi state nhưng không thể thay đổi props chính nó được.

# Handling Events
- Các sự kiện React được đặt tên bằng camelCase, thay vì chữ thường. Ví dụ: onclick -> onClick, onchange -> onChange
- JSX:
    <button onClick={changeName}>
        Change Name
    </button>
- Lưu ý với this trong xử lý Events:
    //Sử dụng arrow function
    <button onClick={() => this.toggleMSG()}>
    
    //Sử dụng bind
    <button onClick={this.toggleMSG.bind(this)}>

# Component API
- setSate()
- forceUpdate() : cần phải re-render mà không cần bất cứ sự thay đổi nào của state
- findDOMNode() : 
- Bind function : giả sử mình muốn khi người dùng click vào nút Change sẽ gọi hàm changeTitle().
-> phải chỉ định biến this cho hàm vừa gọi bằng cách dùng cú pháp bind trong ES6:
    <button onClick={this.changeColor.bind(this)}>Change Color</button>

# Component Life Cycle
- initialization: khởi tạo state và props. Điều này thường được thực hiện bên trong phương thức constructor()
- mounting
- updating
- unmounting

# Lifting State Up: thay đổi dữ liêu của 1 component con thì bạn sẽ gửi dữ liệu cho component cha biết

# Redux: tạo ra local state, giúp việc chia sẻ dữ liệu giữa các component được dễ dàng hơn.

# Refs : tham chiếu đến DOM

# Context: dữ liệu trong các component phải được chia sẻ với nhau, đưa các dữ liệu này lên một nơi có tên là local state. Local state chịu trách nhiệm phân phối dữ liệu tới các component

# Fragments : bọc các element JSX lại, giúp bạn triển khai các element HTML theo mong muốn
- class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        );
    }
    }
- Cu phap ngan gon : <></>

# Render Props

# Higher Order Component (HOC): một function nhận vào một component như một argument và trả về "phiên bản mở rộng" của component đó.
    (InputComponent) => {
        return ExtendedComponent
    }

    // hoặc
    InputComponent => ExtendedComponent


### advanced
# hooks (>= v16.8): sử dụng state và life cycle bên trong một `functional components`
- useState: nhận tham số initial state, sau đó sẽ trả về một mảng 2 phần tử, phần tử đầu tiên là state hiện tại, thứ 2 là hàm để update state
    const [isLoading, setLoading] = useState(false);
    onClick() { setLoading(true) }

- useEffect: tương đương với các hàm componentDidMount, componentDidUpdate và componentWillUnMount trong LifeCycle,
chạy bất tuần tự và đợi sau khi việc component đã xuất hiện trên màn hình (sau khi trình duyệt paint)

Quá trình cụ thế là thế này:
Component gọi đến render -> Màn hình cập nhập lại UI mới -> SAU ĐÓ chạy useEffect

- useLayoutEffect: ngược lại, chạy tuần tự sau khi render nhưng là trước khi UI cập nhập

# React.lazy

# React.Suspense

# React.memo




