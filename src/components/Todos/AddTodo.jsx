import React, { Component } from 'react';
import { Consumer } from '../../context';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange, blue } from '@material-ui/core/colors';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  FormHelperText,
  TextField,
  Button,
} from '@material-ui/core';
import uuid from 'uuid/v1';

const theme = createMuiTheme({
  palette: {
    secondary: blue,
    primary: deepOrange,
  },
});

export default class AddTodo extends Component {
  state = {
    title: '',
    deadline: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (dispatch) => {
    const todo = {
      title: this.state.title,
      deadline: this.state.deadline,
      isDone: false,
      id: uuid(),
    };
    dispatch({ type: 'ADD_TODO', payload: todo });
    this.setState({
      title: '',
      deadline: '',
    });
  };

  render() {
    const { title, deadline } = this.state;
    return (
      <Consumer>
        {(value) => {
          return (
            <MuiThemeProvider theme={theme}>
              <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>
                  {this.props.todo ? 'Редактирование задачи' : 'Новая задача'}
                </DialogTitle>
                <DialogContent>
                  <TextField
                    margin="normal"
                    fullWidth
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    label="Наименование задачи"
                  />
                  <TextField
                    margin="normal"
                    name="deadline"
                    value={deadline}
                    type="date"
                    onChange={this.handleChange}
                  />
                  <FormHelperText style={{ marginTop: -6 }}>
                    Дата задачи
                  </FormHelperText>
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={title === '' || deadline === '' ? true : false}
                    variant="text"
                    onClick={() => {
                      this.props.onClose();
                      this.handleSubmit(value.dispatch);
                    }}
                  >
                    Добавить
                  </Button>
                </DialogActions>
              </Dialog>
            </MuiThemeProvider>
          );
        }}
      </Consumer>
    );
  }
}
