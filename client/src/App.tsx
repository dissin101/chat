import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { getCurrentDateTime } from './utils/time.ts';
const apiPort: string = import.meta.env.VITE_SERVER_PORT;

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');
  const socket = io(`http://localhost:${apiPort}`);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat message', `${input} - ${getCurrentDateTime()}`);
      setInput('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 2 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <p>Чат:</p>
      {messages?.map((message, index) => <p key={index}>{message}</p>)}
    </div>
  );
};

export default App;
