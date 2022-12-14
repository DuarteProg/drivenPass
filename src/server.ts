import app from "./app"
import {init} from "./app"

init().then(()=>{
    app.listen(4000, () =>{
        console.log("Servidor está rodando na porta 4000")
        });
})


