import api from "./api"

export async function funPerfil(){
    const respuesta = await api.get("/v1/auth/profile", {headers: { Authorization: "Bearer 274|xDcSynVgbdf7KEoeC5Du2k9oKBbEGI2dDPsLexQyfd000250"}});
    return respuesta.data;
}