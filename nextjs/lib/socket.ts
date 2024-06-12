// Singleton WebSocket connection to 'localhost:3001'

const serverSocket = new WebSocket("ws://localhost:3001?type=system");

// Send message function
export default function sendMessage(message: string) {
  serverSocket.send(message);
}
