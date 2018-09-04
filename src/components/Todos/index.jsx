import React, { Component } from 'react';
import { Checkbox, FormControlLabel, Button } from '@material-ui/core';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { Consumer } from '../../context';

export default class Todos extends Component {
  state = {
    filter: false,
    addFormIsOpen: false,
  };

  onFilterChange = (filter) => {
    this.setState({ filter: !filter });
  };

  addFormToggle = () => {
    this.setState({ addFormIsOpen: !this.state.addFormIsOpen });
  };

  render() {
    return (
      <Consumer>
        {(value) => {
          const { filter, addFormIsOpen } = this.state;
          const todos = value.todos.filter((todo) => {
            return filter ? (todo.isDone ? false : true) : true;
          });
          return (
            <div>
              <AddTodo open={addFormIsOpen} onClose={this.addFormToggle} />
              <div className="container">
                <div>
                  <h4>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          disableRipple
                          value="filter"
                          checked={filter}
                          onChange={this.onFilterChange.bind(
                            this,
                            filter,
                            value.dispatch
                          )}
                        />
                      }
                      label="Скрыть выполненные"
                    />
                  </h4>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto',
                  }}
                >
                  <Button
                    variant="raised"
                    size="small"
                    onClick={this.addFormToggle}
                  >
                    Добавить
                  </Button>
                </div>
              </div>
              {todos.length > 0 ? (
                <TodoList todos={todos} />
              ) : (
                <h3 className="container">Нет активных задач</h3>
              )}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
