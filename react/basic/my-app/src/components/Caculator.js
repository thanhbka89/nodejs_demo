import { Component } from 'react';
import USDtoVND from './USD2VND';
import VNDtoUSD from './VND2USD';

export default class Caculator extends Component {
    constructor(props) {
      super(props);
      this.state = {
        usd: 0,
        vnd: 0,
      };
    }

    handleChange = (data) => {
      this.setState(data);
    }
   
    render() {
      return (
        <div style={{margin: "3%"}}>
          <USDtoVND onHandleChange={this.handleChange} value={this.state.usd} />
          <VNDtoUSD onHandleChange={this.handleChange} value={this.state.vnd} />
          <hr />
          <code>freetuts.net</code>
        </div>  
      );
    }
  }