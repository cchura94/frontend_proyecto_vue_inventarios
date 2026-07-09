import api from "./api";

export default {

    funListar(){
        return api.get("/usuario");
    },
    funGuardar(datos: any){
        return api.post("/user", datos);
    },
    funMostrar(id: number){
        return api.get("/user/"+id);
    },
    funModificar(id: number, datos: any){
        return api.put("/user/"+id, datos);
    },
    funEliminar(id: number){
        return api.delete("/user/"+id);
    },
    
}
