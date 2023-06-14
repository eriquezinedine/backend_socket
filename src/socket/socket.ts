import { Socket } from "socket.io";
import io from "../index";
import { CirclePosition, DataItem } from "../interface/model";

type Data = DataItem[];
let cacheData: Data = [];

const nameSocket = io.of("/zine/socket");
nameSocket.on("connection", (client) => {
  console.log("cliente conectado");

  client.on("join-selection", async (data) => {
    console.log("Creando nuevo canal", data);
    // client.join(data)
    // nameSocket.emit("canal", `${data}`);
  });

  client.on("connection_alumn", async (alumno: DataItem) => {
    cacheData.push(alumno);
    nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
  });

  client.on("add_circle", async (data: CirclePosition) => {
    const { idAlumno, offset } = data;

    const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);

    if (dataItemIndex !== -1) {
      cacheData[dataItemIndex].offsets.push(offset);
    }

    nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
  });

  client.on("removeLast", (idAlumno: string) => {
    const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);

    if (dataItemIndex !== -1) {
      const offsets = cacheData[dataItemIndex].offsets;
      if (offsets.length > 0) {
        offsets.pop(); // Elimina el último elemento de la lista offsets
        nameSocket.emit(
          "list_alumn",
          JSON.stringify({ listAlumno: cacheData })
        ); // Emito el mensaje a todos.
      }
    }
  });

  client.on("removeAll", (idAlumno: string) => {
    const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);

    if (dataItemIndex !== -1) {
      cacheData[dataItemIndex].offsets = []; // Elimina todos los elementos de la lista offsets
      nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
    }
  });

  client.on("event_home", async (data) => {
    nameSocket.emit("onEventHome", JSON.stringify(data));
    // nameSocket.to()
  });

  client.on("delete_all", async (_) => {
    cacheData = [];
    nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
  });
  client.on("disconnect", () => {
    console.log("cliente desconectado");
    // Realiza cualquier acción necesaria cuando el cliente se desconecta.
    // ...
  });
});
