import { Server } from "socket.io";
import { env } from "~/env.cjs";
import parser from "~/server/socket/parser";
import type { SocketServer } from "~/server/socket/setup";
import { setupSocket } from "~/server/socket/setup";

void (() => {
  const port = parseInt(process.env.PORT || "3001", 10);

  const io: SocketServer = new Server(port, {
    cors: {
      origin: env.NEXT_PUBLIC_API_URL,
      credentials: true
    },
    parser,
    transports: ["websocket"]
  });

  io.on("connection", (socket) => {
    console.log(`Connection (${io.engine.clientsCount}) with id ${socket.id}`);
    socket.once("disconnect", () => {
      console.log(`Connection (${io.engine.clientsCount})`);
    });
  });

  setupSocket(io);

  console.log(`WebSocket Server listening on ws://localhost:${port}`);

  // On SIGTERM
  process.on("SIGTERM", () => {
    console.log("SIGTERM");

    // Close WebSocket Server
    io.close();
  });
})();
