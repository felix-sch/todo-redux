import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';

const Todos = ({items}) => {
  let listItems = items.map((item, index) => {
    if (item.completed) {
      return <li key={index}>#{item.id}: <strike>{item.text}</strike></li>;
    } else {
      return <li key={index}>#{item.id}: {item.text}</li>;
    }
  });
  return <ul>{listItems}</ul>;
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: action.completed
        }
      ];
    case 'TOGGLE_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        } else {
          return todo;
        }
      })
    default:
      return state;
  }
};

let store = createStore(todos);

const render = () => {
  ReactDOM.render(<Todos items={store.getState()} />,
                  document.getElementById('app'));
};

store.subscribe(render);
render();

console.log('------- state --------');
console.log(store.getState());
console.log('------> dispatch: ADD_TODO');
store.dispatch({type: 'ADD_TODO', id: 0, text: 'Clean room', completed: true});
console.log('------- state --------');
console.log(store.getState());
console.log('------> dispatch: ADD_TODO');
store.dispatch({type: 'ADD_TODO', id: 1, text: 'Do dishes', completed: true});
console.log('------- state --------');
console.log(store.getState());
console.log('------> dispatch: TOGGLE_TODO');
store.dispatch({type: 'TOGGLE_TODO', id: 0});
console.log('------- state --------');
console.log(store.getState());
