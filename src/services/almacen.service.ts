import api from "./api";

export default {

    funListar(id: number){
        return api.get(`/almacen?sucursal=${id}`);
    },
    funGuardar(datos: any){
        return api.post(`/almacen`, datos);
    },
    funMostrar(id: number){
        return api.get(`/almacen/${id}`);
    },
    funModificar(id: number, datos: any){
        return api.put(`/almacen/${id}`, datos);
    },
    funEliminar(id: number){
        return api.delete(`/almacen/${id}`);
    },
    
}
