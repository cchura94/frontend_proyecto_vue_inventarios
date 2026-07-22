import api from "./api";

export default {

    funListar(){
        return api.get(`/sucursal`);
    },
    funGuardar(datos: any){
        return api.post(`/sucursal`, datos);
    },
    funMostrar(id: number){
        return api.get(`/sucursal/${id}`);
    },
    funModificar(id: number, datos: any){
        return api.put(`/sucursal/${id}`, datos);
    },
    funEliminar(id: number){
        return api.delete(`/sucursal/${id}`);
    },
    
}
