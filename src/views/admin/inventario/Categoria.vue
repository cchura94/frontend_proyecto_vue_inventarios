<template>
    <div class="card">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Lista de Categorías</h1>
                <p class="text-sm text-slate-500 mt-1">Gestiona y organiza las categorías de tus productos.</p>
            </div>
            
            <Button 
                @click="visibleDialog=true" 
                icon="pi pi-plus" 
                label="Nueva Categoría" 
                class="shadow-sm hover:shadow transition-all duration-200"
            />
        </div>
        <Dialog v-model:visible="visibleDialog" modal header="Nueva Categoria" :style="{ width: '28rem' }">
            <div class="flex flex-col gap-6">
                {{ categoria }}
                <div class="flex flex-col gap-1">
                    <Label for="name" class="text-sm font-semibold">Nombre</Label>
                    <InputText id="name" v-model="categoria.nombre" autoFocus />
                </div>
                <div class="flex flex-col gap-1">
                    <Label for="desc" class="text-sm font-semibold">Descripción</Label>
                    <InputText id="desc" v-model="categoria.descripcion" />
                </div>
                
                <div class="flex justify-end gap-2">
                    <Button severity="secondary" @click="visibleDialog = false">Cancelar</Button>
                    <Button @click="funGuardarCategoria()">Guardar Cambios</Button>
                </div>
            </div>
        </Dialog>
        <ProgressSpinner
            v-if="cargando"
            strokeWidth="12"
            animationDuration=".5s"
            style="width: 50px; height: 50px"
            :pt="{
                circleTrack: { style: { stroke: 'transparent' } }
            }"
        />
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

interface CategoriaInterface {
    id?: number;
    nombre: string;
    descripcion?: string
}

const categorias = ref([]);
const visibleDialog = ref(false);
const categoria = ref<CategoriaInterface>({nombre: "", descripcion: ""});
const cargando = ref(false);

onMounted(() => {
    funObtenerListaCategorias()
})


async function funObtenerListaCategorias(){
    cargando.value = true;
    const {data} = await categoriaService.funListar();
    categorias.value = data;
    cargando.value = false;
}

async function editCategoria(cat:any){
    const { deleted_at, created_at, updated_at, ...datos} = cat;
    categoria.value = datos;
    visibleDialog.value = true;

}
async function confirmDeleteCategoria(cat:any){
    if(confirm("¿Está seguro de eliminar la categoria?")){
        await categoriaService.funEliminar(cat.id);
        funObtenerListaCategorias();
    }

}

async function funGuardarCategoria(){
    
    try {
         cargando.value = true;
        if(categoria.value.id){
            // editar
            const {data} = await categoriaService.funModificar(categoria.value.id, categoria.value);
            visibleDialog.value = false;
            categoria.value = {nombre: "", descripcion: ""};
            cargando.value = false;
            funObtenerListaCategorias()
        }else{
            // guardar
            const {data} = await categoriaService.funGuardar(categoria.value);
            visibleDialog.value = false;
            categoria.value = {nombre: "", descripcion: ""};
            cargando.value = false;
            funObtenerListaCategorias()
        }
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error al integrar guardar los cambios");
        cargando.value = false;
    }
   
}

</script>