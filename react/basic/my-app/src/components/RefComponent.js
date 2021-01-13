import React from "react";
 
 
export default class RefComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleClick = () => {
    this.myRef.current.focus();
  }

  render() {
    return (
      <div>
        <code>freetuts.net</code>
        <input
            name="email"
            onChange={this.onChange}
            ref={this.myRef}
            type="text"
        />
        <button onClick={this.handleClick}>
            Focus Input
        </button>
      </div>
    );
  }
}