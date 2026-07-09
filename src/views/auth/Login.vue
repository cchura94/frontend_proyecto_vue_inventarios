<template>
    <h1>Inicio de Sesion</h1>
    <div>
        <label for="">Ingrese Correo:</label>
        <input type="email" v-model="credenciales.email">
        <br>
        <label for="">Ingrese Password:</label>
        <input type="password" v-model="credenciales.password">
        <br>
        <button @click="funIngresar()">Ingresar</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {loginConLaravel} from "./../../services/auth.service";
import { useRouter } from "vue-router";
    const credenciales = ref({email: "", password: ""});

    const router = useRouter();


    async function funIngresar(){
        try {
            const resp = await loginConLaravel(credenciales.value.email, credenciales.value.password);
            console.log(resp.data);
            localStorage.setItem("access_token", resp.data.access_token)
            router.push("/admin");
        } catch (error) {
            alert("Error al autenticar")
        }
    }


</script>

