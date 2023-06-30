import ServerExpress from "./app";
import { createServer } from "http";
import { Server } from "socket.io";

const serverExpress = new ServerExpress();

const app = serverExpress.listen;

const httpServer = createServer(app);
const PORT = 6969;

httpServer.listen(PORT, () => {
  console.log(`Servidor Sockets run en el puerto http://192.168.0.7:${PORT}`);
});

const io = new Server(httpServer);

export default io;
require("./socket/socket");
