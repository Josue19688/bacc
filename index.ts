import ServerSocket from "./server/server";
import { router } from "./routes/router";
import bodyparser from "body-parser";
import cors from "cors";


const server = ServerSocket.instance;


server.app.use(bodyparser.urlencoded({ extended: false }));
server.app.use(bodyparser.json())

server.app.use(cors());


server.app.use('/',router);






server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
})