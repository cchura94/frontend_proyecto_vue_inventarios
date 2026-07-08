<template>
    <h1>Mi Perfil</h1>
    {{ perfil }}
</template>

<script setup>
import { ref } from "vue";
import { funPerfil } from "./../../services/perfil.service"

const perfil = ref({});

async function funObtenerPerfil(){
    const data = await funPerfil();
    perfil.value = data;
}

funObtenerPerfil()
</script>