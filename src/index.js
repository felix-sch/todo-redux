import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';

function Counter({
  value,
  onIncrement,
  onDecrement
}) {
  return (<div>
      <h1>{value}</h1>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
    </div>);
}

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

let store = createStore(counter);

const render = () => {
  ReactDOM.render(<Counter
                    value={store.getState()}
                    onIncrement={() => store.dispatch({type: 'INCREMENT'})}
                    onDecrement={() => store.dispatch({type: 'DECREMENT'})} />,
                  document.getElementById('app'));
};

store.subscribe(render);
render();
