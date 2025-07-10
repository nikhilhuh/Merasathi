import { Server } from "socket.io";
import http from "http";
import { setUpSocket } from "./socketHandler";

let io: Server;

export function setupSocket(server: http.Server) {
  io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"],
    },
  });

  setUpSocket(io); 

  console.log("Socket.IO setup complete");
}

export { io };
