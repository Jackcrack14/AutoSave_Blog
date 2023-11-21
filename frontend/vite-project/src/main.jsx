import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import {store}  from './redux/store';
import App from './App.jsx'


const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);

const Main = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Render the application
reactRoot.render(<Main />);