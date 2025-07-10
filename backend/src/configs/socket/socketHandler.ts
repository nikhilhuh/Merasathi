import { Server, Socket } from "socket.io";

function setUpSocket(io: Server): void {
  io.on("connection", (socket: Socket) => {
    const userId = socket.handshake.query.userId as string | undefined;
    // console.log(`🔌 User Connected: ${userId} (${socket.id})`);

    socket.on("disconnect", () => {
      // console.log(`❌ User Disconnected: ${userId} (${socket.id})`);
    });
  });
}

export { setUpSocket };
