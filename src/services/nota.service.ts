import api from "./api";

export default {
    listar(page=1, limit = 10, buscar=""){
        return api.get(`/nota?page=${page}&limit=${limit}&search=${buscar}`)
    },
    guardar(data: any){
        return api.post("/nota", data);
    }
}