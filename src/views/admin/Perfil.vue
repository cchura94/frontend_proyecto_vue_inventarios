<template>
    <h1>Mi Perfil</h1>
    <h4>Nombre: {{ perfil.name }}</h4>
    <h4>EMAIL: {{ perfil.email }}</h4>
    <h4>Ecreado en: {{ perfil.created_at }}</h4>
    <button @click="funSalir()">CERRAR SESION</button>
    <h1>Datos </h1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { funPerfil } from "./../../services/perfil.service"
import { logoutConLaravel } from "./../../services/auth.service"

const perfil = ref<any>({});

async function funObtenerPerfil(){
    const data = await funPerfil();
    perfil.value = data;
}

funObtenerPerfil()

async function funSalir(){
    await logoutConLaravel();
    funObtenerPerfil()
}
</script>