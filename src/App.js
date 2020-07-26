import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { findAllByPlaceholderText } from "@testing-library/react";

const emoji = ["😀", "😁", "🙃", "😋", "😉", "🤠", "😎", "😠", "😌", "😤"];

const createCards = (numberOfPair) => {
  const array = [];
  for (let i = 0; i < numberOfPair; i++) {
    array.push(emoji[i]);
    array.push(emoji[i]);
  }
  return array.sort(() => Math.random() - 0.5);
};

const Card = (props) => {
  return <div onClick={props.onFlip}>{props.isVisible ? props.name : "X"}</div>;
};

class App extends Component {
  state = {
    cards: [],
    goCart: false,
  };

  //definir l etat de visibilité de la carte

  handleClick = (event) => {
    clearTimeout(this.timer);
    this.setState({ cards: createCards(5), goCart: true });
    this.timer = setTimeout(() => {
      this.setState({ goCart: false });
    }, 5000);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    let message = this.state.goCart ? "montrer" : "cacher";

    return (
      <div>
        <div>{message}</div>
        <div className="App">
          {this.state.cards.map((card, i) => (
            <Card
              onFlip={() => {
                console.log(card);
              }}
              key={i}
              name={card}
              isVisible={this.state.goCart}
            />
          ))}
          <button onClick={this.handleClick}>Start</button>
        </div>
      </div>
    );
  }
}

export default App;
