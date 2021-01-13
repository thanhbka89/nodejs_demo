import React from "react";

const NumberContext = React.createContext();

export default class ContextComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        number: 0,
      };
    }

    updateNumber = () => {
      this.setState({
        number: Math.random(),
      });
    }

    render() {
      return (
        <NumberContext.Provider
          value={{
            number: this.state.number,
            update: this.updateNumber.bind(this),
          }}
        >
          <NumberContext.Consumer>
              { () =>  (
                <>
                  <ShowNumber />
                  <UpdateNumber />
                </>
              )}
          </NumberContext.Consumer>
        </NumberContext.Provider>
      );
    }
}

class UpdateNumber extends React.Component {
    render() {
      return (
        <button onClick={() => {
          //Gọi hàm update để thực hiện update số.
          console.log(this.context.update())
        }}>Update Number</button>
      );
    }
  }
  UpdateNumber.contextType = NumberContext;
   
  class ShowNumber extends React.Component {
    render() {
      //Hiển thị ra số.
      return (
        <p>{this.context.number}</p>
      );
    }
  }
  ShowNumber.contextType = NumberContext;