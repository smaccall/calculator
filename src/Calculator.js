/* eslint no-eval: 0 */

import React, {Component} from 'react';
import './css/Calculator.css';
import Button from './components/Button';

class Calculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            current: "0",
            previous: "",
            nextIsRest: false
        }
    }

    reset = () => {
        this.setState({current: "0", previous:[], nextIsReset: false});
    }

    addToCurrent = (symbol) => {
        if(["/", "-","+", "*"].indexOf(symbol) > -1){
            let {current, previous} = this.state;
            console.log(previous);
            previous = previous + current + symbol;
            this.setState({previous, nextIsReset: true})
        }else{
            let {current} = this.state;
            if((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset) {
                this.setState({current: symbol, nextIsReset: false});
            } else{
                if(symbol === "."){
                    if(!current.includes(".")){
                        this.setState({current: this.state.current + symbol});
                    }
                }
                else{
                    this.setState({current: this.state.current + symbol});
                }
            }
        }
    }

    calculate = (symbol) =>{
        let {current, previous} = this.state;
        previous= previous + current;
        this.setState({previous});
        
        current=eval(previous);
        this.setState({current, previous: [], nextIsReset: true});
    }

  render(){
    const buttons = [
        {symbol: 'C', cols: 3, action: this.reset},
        {symbol: '/', cols: 1, action: this.addToCurrent},
        {symbol: '7', cols: 1, action: this.addToCurrent},
        {symbol: '8', cols: 1, action: this.addToCurrent},
        {symbol: '9', cols: 1, action: this.addToCurrent},
        {symbol: '*', cols: 1, action: this.addToCurrent},
        {symbol: '4', cols: 1, action: this.addToCurrent},
        {symbol: '5', cols: 1, action: this.addToCurrent},
        {symbol: '6', cols: 1, action: this.addToCurrent},
        {symbol: '-', cols: 1, action: this.addToCurrent},
        {symbol: '1', cols: 1, action: this.addToCurrent},
        {symbol: '2', cols: 1, action: this.addToCurrent},
        {symbol: '3', cols: 1, action: this.addToCurrent},
        {symbol: '+', cols: 1, action: this.addToCurrent},
        {symbol: '0', cols: 2, action: this.addToCurrent},
        {symbol: '.', cols: 1, action: this.addToCurrent},
        {symbol: '=', cols: 1, action: this.calculate}
      ];
    return(
        <div className="calc">
            {this.state.previous.length > 0 ?
                <div className="floaty-last">{this.state.previous}</div>
                : null
            }
            <input readOnly className="result" type="text" value={this.state.current}></input>
            
            {buttons.map((btn, i) => {
                return <Button key={i} symbol={btn.symbol} cols={btn.cols} action={(symbol) => btn.action(symbol)} />
            })}      

        </div>
    );
  }

}

export default Calculator;
