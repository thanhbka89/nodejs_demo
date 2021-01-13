import { Component } from 'react';
import PropTypes from "prop-types";

class Hello extends Component {

    constructor() {  
        super();  
        console.log('init component');
        this.state = {  
            message: "my friend (from state)!"  
        };
        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage() {  
        this.setState({  
            message: "my friend (from changed state)!"  
        });  
    }


    render() { 
        console.log(this.props) //Giá trị của props

        return (
        <div>
            <h1>Chào các bạn độc giả {this.props.message} - {this.state.message}!</h1>
            <button onClick={this.updateMessage}>Click me!</button> 
        </div>
        );  
    }  
}

// validate props
Hello.propTypes = {
    message: PropTypes.number
  }

export default Hello