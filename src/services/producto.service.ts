import api from "./api";

export default {

    funListar(page: number = 1, limit: number = 10, buscar: string="", select_almacen: number ){
        if(buscar){
            return api.get(`/producto?page=${page}&limit=${limit}&search=${buscar}&almacen=${select_almacen}`);
        }
        if(select_almacen>0){
            return api.get(`/producto?page=${page}&limit=${limit}&almacen=${select_almacen}`);
        }else{
            return api.get(`/producto?page=${page}&limit=${limit}`);
        }
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
