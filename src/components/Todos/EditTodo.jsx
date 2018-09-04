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

const theme = createMuiTheme({
  palette: {
    secondary: blue,
    primary: deepOrange,
  },
});

export default class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.todo.title,
      deadline: props.todo.deadline,
      id: props.todo.id,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editHandle = (dispatch) => {
    dispatch({
      type: 'EDIT_TODO',
      payload: {
        title: this.state.title,
        deadline: this.state.deadline,
        id: this.state.id,
        isDone: this.state.isDone,
      },
    });
    this.setState({ title: '', deadline: '' });
  };

  componentWillReceiveProps(props) {
    this.setState({
      title: props.todo.title,
      deadline: props.todo.deadline,
      id: props.todo.id,
      isDone: props.todo.isDone,
    });
  }

  render() {
    const { title, deadline } = this.state;
    return (
      <Consumer>
        {(value) => {
          return (
            <MuiThemeProvider theme={theme}>
              <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Редактирование задачи</DialogTitle>
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
                    onClick={() => {
                      this.editHandle(value.dispatch);
                      this.props.onClose();
                    }}
                  >
                    Сохранить
                  </Button>
                  )}
                </DialogActions>
              </Dialog>
            </MuiThemeProvider>
          );
        }}
      </Consumer>
    );
  }
}
