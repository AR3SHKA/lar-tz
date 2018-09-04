import React, { Component } from 'react';

const Context = React.createContext();

const todos = JSON.parse(localStorage.getItem('todos')) || [];

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      localStorage.setItem(
        'todos',
        JSON.stringify([action.payload, ...state.todos])
      );
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    case 'REMOVE_TODO': {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { ...state, todos: newTodos };
    }
    case 'EDIT_TODO': {
      const newTodos = [...state.todos].map(
        (todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                isDone: action.payload.isDone,
                title: action.payload.title || todo.title,
                deadline: action.payload.deadline || todo.deadline,
              }
            : todo
      );
      localStorage.setItem('todos', JSON.stringify(newTodos));
      return { ...state, todos: newTodos };
    }
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    todos: [],
    editTodo: {
      title: '',
      deadline: '',
    },
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };
  componentDidMount() {
    this.setState({ todos: todos });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
