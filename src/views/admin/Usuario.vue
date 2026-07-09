<template>
    <h1>Lista de Usuarios</h1>
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

    onMounted(() => {
        funListarUsuarios();
    })

    async function funListarUsuarios(){
        const { data } = await usuarioService.funListar()
        usuarios.value = data;
    }
</script>