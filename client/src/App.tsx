import { io } from 'socket.io-client';
import { useEffect } from 'react';
const apiPort: string = import.meta.env.VITE_SERVER_PORT;

const App = () => {
  const socket = io(`http://localhost:${apiPort}`);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected');

      socket.timeout(5000).emit('chat message', 'test');
    });
  }, []);

  return <>Client app</>;
};

export default App;
