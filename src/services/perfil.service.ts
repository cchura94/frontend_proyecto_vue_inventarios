import api from "./api"

export async function funPerfil(){
    const respuesta = await api.get("/v1/auth/profile");
    return respuesta.data;
}