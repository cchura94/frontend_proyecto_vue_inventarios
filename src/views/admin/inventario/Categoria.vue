<template>
    <div class="card">
        <h1>Lista de Categorias</h1>
    
        <DataTable :value="categorias" tableStyle="min-width: 50rem">
            <Column field="id" header="Code"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="descripcion" header="DESCRIPCIÓN"></Column>
            <Column :exportable="false" style="min-width: 2rem">
               <template #body="slotProps">
                   <Button icon="pi pi-pencil" rounded class="mr-2" @click="editCategoria(slotProps.data)" />
                   <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteCategoria(slotProps.data)" />
               </template>
            </Column>
        </DataTable>
    
        <pre>{{ categorias }}</pre>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import categoriaService from '../../../services/categoria.service';

const categorias = ref([]);

onMounted(() => {
    funObtenerListaCategorias()
})


async function funObtenerListaCategorias(){
    const {data} = await categoriaService.funListar();
    categorias.value = data;
}

async function editCategoria(cat:any){

}
async function confirmDeleteCategoria(cat:any){

}

</script>