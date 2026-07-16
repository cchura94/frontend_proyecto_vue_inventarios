<template>
    <div class="card">
        <Button label="Nuevo Usuario" @click="visibleDialog = true" />

        <Dialog v-model:visible="visibleDialog" modal header="Edit Profile" :style="{ width: '25rem' }">
            <span class="text-surface-500 dark:text-surface-400 block mb-8">Ingrese datos.</span>
            <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-24">Nombre Usuario</label>
                <InputText id="username" class="flex-auto" autocomplete="off" v-model="usuario.name" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="email" class="font-semibold w-24">Correo Electronico</label>
                <InputText id="email" class="flex-auto" autocomplete="off" v-model="usuario.email" />
            </div>
            <div class="flex items-center gap-4 mb-8">
                <label for="pass" class="font-semibold w-24">Contraseña</label>
                <InputText type="password" id="pass" class="flex-auto" autocomplete="off"  v-model="usuario.password" />
            </div>
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="visibleDialog = false"></Button>
                <Button type="button" label="Guardar Usuario" @click="funGuardarUsuario()"></Button>
            </div>
        </Dialog>

         <DataTable :value="usuarios" tableStyle="min-width: 50rem" selectionMode="single">
            <Column field="id" header="ID" />
            <Column field="name" header="NOMBRE" />
            <Column field="email" header="CORREO" />
            <Column field="roles" header="ROLES" />
            
            <Column field="created_at" header="FECHA CREACIÓN" />
            <Column :exportable="false" style="min-width: 2rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" rounded class="mr-2" @click="editUsuario(slotProps.data)" />
                    <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteUsuario(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>
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
    const visibleDialog = ref(false);

    onMounted(() => {
        funListarUsuarios();
    })

    async function funListarUsuarios(){
        const { data } = await usuarioService.funListar()
        usuarios.value = data.data;
    }

    async function funGuardarUsuario(){
        if(usuario.value.id){
            // editar
            await usuarioService.funModificar(usuario.value.id, usuario.value);
        }else{
            await usuarioService.funGuardar(usuario.value);
        }
        funListarUsuarios();
        visibleDialog.value = false;
        usuario.value = {};
    }

    function editUsuario(user: any){
        const {...datos} = user;
        usuario.value = datos;
        visibleDialog.value = true;
    }

    async function confirmDeleteUsuario(user: any){
        if(confirm("Está seguro de eliminar el usuario?")){
            await usuarioService.funEliminar(user.id);
            funListarUsuarios();
        }
    }
</script>