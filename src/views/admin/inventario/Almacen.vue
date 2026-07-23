<template>
    <div class="card">

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
                <h1 class="text-2xl font-bold">Lista de Almacenes</h1>
                <p class="text-sm text-slate-500">
                    Gestiona los almacenes por sucursal.
                </p>
            </div>

            <Button
                icon="pi pi-plus"
                label="Nuevo Almacén"
                @click="nuevoAlmacen"
            />
        </div>

        <!-- FILTRO -->
        <div class="mb-5">
            <label class="block mb-2 font-semibold">
                Sucursal
            </label>

            <Select
                v-model="sucursalSeleccionada"
                :options="sucursales"
                optionLabel="nombre"
                optionValue="id"
                placeholder="Seleccione una sucursal"
                class="w-80"
                @change="funObtenerListaAlmacenes"
            />
        </div>

        <!-- DIALOG -->
        <Dialog
            v-model:visible="visibleDialog"
            modal
            header="Almacén"
            :style="{ width: '30rem' }"
        >

            <div class="flex flex-col gap-5">

                <div>
                    <Label>Nombre</Label>
                    <InputText
                        class="w-full"
                        v-model="almacen.nombre"
                    />
                </div>

                <div>
                    <Label>Descripción</Label>
                    <InputText
                        class="w-full"
                        v-model="almacen.descripcion"
                    />
                </div>
                <div>
                    <Label>Codigo ALM</Label>
                    <InputText
                        class="w-full"
                        v-model="almacen.codigo"
                    />
                </div>

                <div>
                    <Label>Sucursal</Label>

                    <Select
                        class="w-full"
                        v-model="almacen.sucursal_id"
                        :options="sucursales"
                        optionLabel="nombre"
                        optionValue="id"
                    />
                </div>

                <div class="flex justify-end gap-2">
                    <Button
                        severity="secondary"
                        @click="visibleDialog=false"
                    >
                        Cancelar
                    </Button>

                    <Button @click="funGuardarAlmacen">
                        Guardar
                    </Button>
                </div>

            </div>

        </Dialog>

        <ProgressSpinner
            v-if="cargando"
            style="width:50px;height:50px"
        />

        <DataTable
            :value="almacenes"
            tableStyle="min-width:50rem"
        >

            <Column field="id" header="ID"/>

            <Column field="nombre" header="NOMBRE"/>

            <Column field="descripcion" header="DESCRIPCIÓN"/>

            <Column
                :exportable="false"
                style="width:130px"
            >
                <template #body="slotProps">

                    <Button
                        icon="pi pi-pencil"
                        rounded
                        class="mr-2"
                        @click="editAlmacen(slotProps.data)"
                    />

                    <Button
                        icon="pi pi-trash"
                        rounded
                        severity="danger"
                        outlined
                        @click="eliminarAlmacen(slotProps.data)"
                    />

                </template>
            </Column>

        </DataTable>

    </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";

import almacenService from "./../../../services/almacen.service";
import sucursalService from "./../../../services/sucursal.service";

interface Almacen{

    id?:number;

    nombre:string;
    codigo: string


    descripcion?:string;

    sucursal_id?:number;

}

const cargando=ref(false);

const visibleDialog=ref(false);

const almacenes=ref([]);

const sucursales=ref([]);

const sucursalSeleccionada=ref<number>();

const almacen=ref<Almacen>({
    nombre:"",
    descripcion:"",
    codigo: "",
    sucursal_id:undefined
});

onMounted(async()=>{

    await obtenerSucursales();

});

async function obtenerSucursales(){

    const {data}=await sucursalService.funListar();

    sucursales.value=data;

}

async function funObtenerListaAlmacenes(){

    if(!sucursalSeleccionada.value){

        almacenes.value=[];

        return;

    }

    cargando.value=true;

    const {data}=await almacenService.funListar(sucursalSeleccionada.value);

    almacenes.value=data;

    cargando.value=false;

}

function nuevoAlmacen(){

    almacen.value={

        nombre:"",
        descripcion:"",
        codigo: "",

        sucursal_id:sucursalSeleccionada.value

    };

    visibleDialog.value=true;

}

function editAlmacen(item:any){

    const {created_at,updated_at,deleted_at,...datos}=item;

    almacen.value=datos;

    visibleDialog.value=true;

}

async function funGuardarAlmacen(){

    if(almacen.value.id){

        await almacenService.funModificar(

            almacen.value.id,

            almacen.value

        );

    }else{

        await almacenService.funGuardar(

            almacen.value

        );

    }

    visibleDialog.value=false;

    funObtenerListaAlmacenes();

}

async function eliminarAlmacen(item:any){

    if(confirm("¿Eliminar almacén?")){

        await almacenService.funEliminar(item.id);

        funObtenerListaAlmacenes();

    }

}

</script>