import React, { Component } from 'react';
import { Consumer } from '../../context';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import EditTodo from './EditTodo';
import { MdEdit, MdDelete } from 'react-icons/md';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

export default class TodoList extends Component {
  state = {
    toEdit: {
      title: '',
      deadline: '',
      isDone: '',
      id: '',
    },
    isOpen: false,
  };

  isDoneChange = (id, isDone, dispatch) => {
    dispatch({ type: 'EDIT_TODO', payload: { id, isDone } });
  };

  deleteHandle = (id, dispatch) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  closeToggle = () => {
    this.setState({ isOpen: false });
  };

  openToggle = (todo) => {
    this.setState({
      isOpen: !this.state.isOpen,
      toEdit: {
        title: todo.title,
        deadline: todo.deadline,
        id: todo.id,
        isDone: todo.isDone,
      },
    });
  };

  render() {
    const { todos } = this.props;
    return (
      <Consumer>
        {(value) => {
          return (
            <div>
              <EditTodo
                open={this.state.isOpen}
                onClose={this.closeToggle}
                todo={this.state.toEdit}
              />
              <Table className="container">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Дата</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todos.map((todo) => {
                    return (
                      <TableRow
                        style={{
                          backgroundColor: todo.isDone
                            ? '#E6EE9C'
                            : 'transparent',
                        }}
                        key={todo.id}
                      >
                        <TableCell component="th" scope="row">
                          {todo.id}
                        </TableCell>
                        <TableCell>{todo.title}</TableCell>
                        <TableCell>
                          {moment(todo.deadline).format('LL')}
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            value="isDone"
                            checked={todo.isDone}
                            onChange={this.isDoneChange.bind(
                              this,
                              todo.id,
                              !todo.isDone,
                              value.dispatch
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={this.openToggle.bind(this, todo)}
                          >
                            <MdEdit />
                          </IconButton>
                          <IconButton
                            onClick={this.deleteHandle.bind(
                              this,
                              todo.id,
                              value.dispatch
                            )}
                          >
                            <MdDelete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
