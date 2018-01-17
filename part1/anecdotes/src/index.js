import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      votes: [],
      top: 0
    };
  }
  random = () => {
    this.setState({
      selected: Math.floor(Math.random() * this.props.anecdotes.length)
    });
  };

  vote = select => () =>
    this.setState({ votes: [...this.state.votes, select] }, this.top);

  top = () => {
    let max = 0;
    let amount = 0;
    let frequency = [];
    let result;
    const range = [...Array(1 + this.props.anecdotes.length).keys()].map(
      v => v
    );
    range.forEach(v => {
      this.state.votes.forEach(number => {
        if (number === v) {
          amount = amount + 1;
        }
      });
      if (amount > max) {
        max = amount;
        result = v;
      }
      amount = 0;
    });
    this.setState({ top: result });
  };
  render() {
    return (
      <div>
        <Label anecdote={this.props.anecdotes[this.state.selected]} />
        <Votes state={this.state} />
        <Button handler={this.random} text="Random anecdote" />
        <Button handler={this.vote(this.state.selected)} text="Vote" />
        <h1>Anecdote with most votes: </h1>
        <Label anecdote={this.props.anecdotes[this.state.top]} />
      </div>
    );
  }
}

const Votes = props => {
  let amount = 0;
  props.state.votes.forEach(number => {
    if (number === props.state.selected) {
      amount = amount + 1;
    }
  });
  return (
    <div>
      <p>has {amount} votes.</p>
    </div>
  );
};
const Label = props => {
  return (
    <div>
      <p>{props.anecdote}</p>
    </div>
  );
};

const Button = ({ handler, text }) => {
  return <button onClick={handler}>{text}</button>;
};
const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
