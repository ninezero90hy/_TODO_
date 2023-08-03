import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './styles';
import ModalsProvider from './components/molecules/Modal/providers/ModalsProvider';
import ModalsArea from './components/molecules/Modal/ModalsArea';
import MessagesArea from './components/molecules/Message/MessagesArea';
import MessageProvider from './components/molecules/Message/providers/MessageProvider';

const ROOT_ELEMENT_ID = 'root';

const root = ReactDOM.createRoot(document.getElementById(ROOT_ELEMENT_ID) as HTMLElement);
root.render(
  <React.StrictMode>
    <ModalsProvider>
      <MessageProvider>
        <GlobalStyle />
        <ModalsArea />
        <MessagesArea />
        <App />
      </MessageProvider>
    </ModalsProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
