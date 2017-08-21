import React from 'react';
import ReactDOM from 'react-dom';
import {createStore } from 'redux';

const Todos = ({ items }) => {
  let listItems = items.map((item, index) => {
    if (item.completed) {
      return <li key={index}>#{item.id}: <strike>{item.text}</strike></li>;
    } else {
      return <li key={index}>#{item.id}: {item.text}</li>;
    }
  });
  return <ul>{listItems}</ul>;
};

const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: action.completed
      };
    case "TOGGLE_TODO":
      if (state.id === action.id) {
        return {
          ...state,
          completed: !todo.completed
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        todo(undefined, action)
      ];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, todo));
    default:
      return state;
  }
};

const filter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

const todoApp = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    filter: filter(state.filter, action)
  };
};

let store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <Todos items={store.getState().todos} filter={store.getState().filter} />,
    document.getElementById("app")
  );
};

store.subscribe(render);
render();

store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Clean room",
  completed: true
});
store.dispatch({ type: "ADD_TODO", id: 1, text: "Do dishes", completed: true });
store.dispatch({ type: "TOGGLE_TODO", id: 0 });
store.dispatch({ type: "SET_FILTER", filter: 'SHOW_COMPLETED'});
