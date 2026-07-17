import api from "./api";

export default {

    funListar(page: number = 1, limit: number = 10){
        return api.get(`/producto?page=${page}&limit=${limit}`);
    },
    funGuardar(datos: any){
        return api.post(`/producto`, datos);
    },
    funMostrar(id: number){
        return api.get(`/producto/${id}`);
    },
    funModificar(id: number, datos: any){
        return api.put(`/producto/${id}`, datos);
    },
    funEliminar(id: number){
        return api.delete(`/producto/${id}`);
    },
    
}
