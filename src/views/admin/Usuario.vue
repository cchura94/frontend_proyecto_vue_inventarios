<template>
    <h1>Lista de Usuarios</h1>
    {{usuario}}
    <form>
        <label for="">Ingrese Nombre</label>
        <input type="text" v-model="usuario.name">
        <br>
        <label for="">Ingrese Correo</label>
        <input type="email" v-model="usuario.email">
        <br>
        <label for="">Ingrese Contraseña</label>
        <input type="password" v-model="usuario.password">
        <br>
        <button type="button" @click="funGuardarUsuario()">Guardar Cambios</button>
    </form>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>CORREO</th>
                <th>ACCION</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="us in usuarios">
                <td>{{ us.id }}</td>
                <td>{{ us.name }}</td>
                <td>{{ us.email }}</td>
                <td></td>
            </tr>
        </tbody>

    </table>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import usuarioService from '../../services/usuario.service';

    const usuarios = ref<any>([]);
    const usuario = ref<any>({name: "", email: "", password: ""});

    onMounted(() => {
        funListarUsuarios();
    })

    async function funListarUsuarios(){
        const { data } = await usuarioService.funListar()
        usuarios.value = data.data;
    }

    async function funGuardarUsuario(){
        await usuarioService.funGuardar(usuario.value);
        funListarUsuarios();
    }
</script>