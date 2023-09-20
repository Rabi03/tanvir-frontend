import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux'
import store from './Store'
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'
import { ChatContextProvider } from './components/context/ChatContext';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <ChatContextProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </ChatContextProvider>
  </Provider>,
  document.getElementById('root')
);
