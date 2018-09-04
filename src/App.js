import React, { Component } from 'react';
import { Provider } from './context';
import Todos from './components/Todos';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Todos />
        </div>
      </Provider>
    );
  }
}

export default App;
