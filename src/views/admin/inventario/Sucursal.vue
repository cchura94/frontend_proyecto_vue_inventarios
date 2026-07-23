<template>
    <div class="card">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold text-slate-800 tracking-tight">Lista de Sucursales</h1>
                <p class="text-sm text-slate-500 mt-1">Gestiona y organiza las sucursales.</p>
            </div>
            
            <Button 
                @click="visibleDialog=true" 
                icon="pi pi-plus" 
                label="Nueva Sucursal" 
                class="shadow-sm hover:shadow transition-all duration-200"
            />
        </div>
        <Dialog v-model:visible="visibleDialog" modal header="Nueva Sucursal" :style="{ width: '28rem' }">
            <div class="flex flex-col gap-6">
                <div class="flex flex-col gap-1">
                    <Label for="name" class="text-sm font-semibold">Nombre</Label>
                    <InputText id="name" v-model="sucursal.nombre" autoFocus />
                </div>
                <div class="flex flex-col gap-1">
                    <Label for="desc" class="text-sm font-semibold">Dirección</Label>
                    <InputText id="desc" v-model="sucursal.direccion" />
                </div>

                <div class="flex flex-col gap-1">
                    <Label for="tel" class="text-sm font-semibold">telefono</Label>
                    <InputText id="tel" v-model="sucursal.telefono" />
                </div>
                <div class="flex flex-col gap-1">
                    <Label for="ciu" class="text-sm font-semibold">ciudad</Label>
                    <InputText id="ciu" v-model="sucursal.ciudad" />
                </div>
                
                <div class="flex justify-end gap-2">
                    <Button severity="secondary" @click="visibleDialog = false">Cancelar</Button>
                    <Button @click="funGuardarSucursal()">Guardar Cambios</Button>
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
        <DataTable :value="sucursales" tableStyle="min-width: 50rem">
            <Column field="id" header="Code"></Column>
            <Column field="nombre" header="NOMBRE"></Column>
            <Column field="direccion" header="DIRECCION"></Column>
            <Column field="telefono" header="TELEFONO"></Column>
            <Column field="ciudad" header="CIUDAD"></Column>

            <Column :exportable="false" style="min-width: 2rem">
               <template #body="slotProps">
                   <Button icon="pi pi-pencil" rounded class="mr-2" @click="editSucursal(slotProps.data)" />
                   <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteSucursal(slotProps.data)" />
               </template>
            </Column>
        </DataTable>
    
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import sucursalService from '../../../services/sucursal.service';

interface SucursalInterface {
    id?: number;
    nombre: string;
    direccion?: string;
    ciudad?: string;
    telefono?: string
}

const sucursales = ref([]);
const visibleDialog = ref(false);
const sucursal = ref<SucursalInterface>({nombre: "", direccion: ""});
const cargando = ref(false);

onMounted(() => {
    funObtenerListaSucursales()
})


async function funObtenerListaSucursales(){
    cargando.value = true;
    const {data} = await sucursalService.funListar();
    sucursales.value = data;
    cargando.value = false;
}

async function editSucursal(cat:any){
    const { deleted_at, created_at, updated_at, ...datos} = cat;
    sucursal.value = datos;
    visibleDialog.value = true;

}
async function confirmDeleteSucursal(cat:any){
    if(confirm("¿Está seguro de eliminar la sucursal?")){
        await sucursalService.funEliminar(cat.id);
        funObtenerListaSucursales();
    }

}

async function funGuardarSucursal(){
    
    try {
         cargando.value = true;
        if(sucursal.value.id){
            // editar
            const {data} = await sucursalService.funModificar(sucursal.value.id, sucursal.value);
            visibleDialog.value = false;
            sucursal.value = {nombre: "", direccion: ""};
            cargando.value = false;
            funObtenerListaSucursales()
        }else{
            // guardar
            const {data} = await sucursalService.funGuardar(sucursal.value);
            visibleDialog.value = false;
            sucursal.value = {nombre: "", direccion: ""};
            cargando.value = false;
            funObtenerListaSucursales()
        }
    } catch (error) {
        console.log(error);
        alert("Ocurrió un error al integrar guardar los cambios");
        cargando.value = false;
    }
   
}

</script>