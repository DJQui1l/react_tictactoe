import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
  console.log(props)
    return(

      <button className = 'square' onClick = {props.onClick}
      style = {props.style}
      >
      {props.value}
      </button>


    );
  }


class Board extends React.Component {

  renderSquare(i){ // this renders the squares with given values.
    return (
      <Square
        value = {this.props.squares[i]} // value is coming from the Game component
        onClick = {() => this.props.onClick(i)} //onClick is coming from the Game component
        style = {this.props.style}/>
    )
  }

  render(){
    return (
      <div>
        <div className = 'board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className = 'board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className = 'board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}


class Game extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext:true,
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length -1];
    const squares = current.squares.slice(); /*creates a copy of current history
     'squares' array*/

    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares:squares,

      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    })

  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber] // gets current history of moves
    const winner = calculateWinner(current.squares) //gets squares array values?




    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' +move :
        'Go to game start';
        return (
          <li key = {move}>
            <button onClick = {() => this.jumpTo(move)}>{desc}</button>
            </li>
        )
    })
    let status
    let winnerColor
    if (winner){
      status = 'winner: ' + winner
      winnerColor = '#f00' // red
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className = 'game'>
        <div className= 'game-board'>
          <Board
            squares = {current.squares}
            onClick = {(i) => this.handleClick(i)}
            style = {{color:`${winnerColor}`}}
          />
        </div>
        <div className = 'game-info'>
          <div>{status}</div>
          <ol> {moves}</ol>
        </div>
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Game/>)


function calculateWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]
  for (let i = 0; i < lines.length; i++){
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {

      return squares[a]
    }
  }
  return null;
}
