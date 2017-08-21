import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';

function Counter({value}) {
  return <h1>{value}</h1>;
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
  ReactDOM.render(<Counter value={store.getState()} />, document.getElementById('app'));
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
  store.dispatch({ type: 'INCREMENT' });
});
