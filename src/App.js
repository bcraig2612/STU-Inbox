import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Pusher from 'pusher-js';

import Layout from "./components/Layout";
import postData from "./utils/postData";
import formatDate from "./utils/formatDate";

const userID = Math.random();

function sendMessageToSoTellUs(text) {
  postData('http://localhost:9000/api/pusher.php', { body: text, userID: userID, author: 'cody' })
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
}

function App() {
  const [messages, setMessages] = useState([]);

  // connect to pusher
  useEffect(() => {
    Pusher.logToConsole = true;
    const pusher = new Pusher('66e7f1b4416d81db9385', {
      cluster: 'us3'
    });
    let channel = pusher.subscribe('demo_channel');

    channel.bind('new-message', function(data) {
      if (data.userID === userID) {
        return false;
      }
      setMessages(messages => [...messages, {id: Math.random(), userID: data.userID, author: data.author, body: data.body, sent: formatDate(Date(data.sent).toString())}]);
    });

  }, []);

  function handleNewMessage(message) {
    if (message.length) {
      setMessages([...messages, {me: true, author: "Me", body: message, sent: formatDate(Date().toString())}]);
      sendMessageToSoTellUs(message);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Layout
        messages={messages}
        handleNewMessage={handleNewMessage}
      />
    </React.Fragment>
  );
}

export default App;
