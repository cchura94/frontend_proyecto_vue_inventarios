<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-2 p-1">
        <div class="col-span-3 bg-white p-1 rounded-lg shadow-md">
            <div class="bg-blue-700 text-white p-2">Lista de productos</div>
            <DataTable
                ref="dt"
                lazy
                :loading="cargando"
                :totalRecords="totalRecords"
                @page="onPage($event)"
                :value="productos"
                dataKey="id"
                :paginator="true"
                :rows="10"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25]"
                currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} productos"
            >
                <template #header>
                    <div class="flex flex-wrap gap-2 items-center justify-between">
                        <h4 class="m-0">Productos Para Compra</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." v-model="buscar" @keyup.enter="funListarProductos()" />
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 1rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 12rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <Image v-if="slotProps.data.imagen" :src="`https://backinventarios.blumbit.net/${slotProps.data.imagen}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" preview  />
                    </template>
                </Column>
                <Column field="precio_venta_actual" header="Precio" sortable style="min-width: 3rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio_venta_actual) }}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" sortable style="min-width: 10rem"></Column>
                
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-plus" rounded class="mr-2" @click="addCarrito(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-span-2  ">
            <div class="bg-white p-2 rounded-lg shadow-md">
                <div class="bg-blue-700 text-white p-2">Carrito</div>
               
                <DataTable :value="carrito" tableStyle="min-width: 5rem">
                    <Column field="nombre" header="NOMBRE" />
                    <Column field="precio_venta_actual" header="PRECIO" />
                    <Column field="cantidad" header="CANT" />
                    <Column :exportable="false" style="min-width: 2rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-times" rounded class="mr-2" @click="addCarrito(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="bg-white p-2 rounded-lg shadow-md">
                <div class="bg-blue-700 text-white p-2">Almacen</div>
                <div>
                    <Select 
                    v-model="sucursalSelected"
                        :options="sucursales"
                        optionLabel="nombre"
                        optionValue="id"
                        placeholder="Seleccionar Sucursal"
                        class="w-full"
                        @change="funListarAlmacenes"
                    />

                    <Select 
                        v-model="almacenSelected"
                        :options="almacenes"
                        optionLabel="nombre"
                        optionValue="id"
                        placeholder="Seleccionar Almacen"
                        class="w-full"
                    />
                </div>
            </div>
            <div class="bg-white p-2 rounded-lg shadow-md">
                <div class="bg-blue-700 text-white p-2 rounded">Proveedor</div>
               
            </div>
            <div class="bg-white p-4 rounded-lg shadow-md">
                <Button label="Guardar Cambios" @click="generarCompra"></Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { ProductoInterface } from '../inventario/Producto.vue';
import productoService from '../../../services/producto.service.ts';
import sucursalService from '../../../services/sucursal.service.ts';
import almacenService from '../../../services/almacen.service.ts';
    
const cargando = ref<boolean>(false);
    const totalRecords = ref<number>(0);    
    const productos = ref<ProductoInterface[]>([{categoria_id: -1, nombre: "", estado: true, imagen: ""}]);
    const lazyParams = ref<any>({page: 0});

    const buscar = ref("");
    const selectedAlmacen = ref(0);
    const carrito = ref<any[]>([]);
    const sucursales = ref([]);
    const sucursalSelected = ref();
    const almacenSelected = ref();
    const almacenes = ref([])

    onMounted(() => {
        funListarProductos()
        funListarSucursales();
    })



    function generarCompra(){

    }

    const onPage = (event: any) => {
        lazyParams.value = event;
        console.log(lazyParams.value);

    }

   async function funListarProductos(){
        try {
            cargando.value = true
    
            const {data} = await productoService.funListar(lazyParams.value.page + 1, lazyParams.value.rows, buscar.value, selectedAlmacen.value);
            productos.value = data.data;
            totalRecords.value = data.total;
    
            cargando.value = false
            
        } catch (error) {
            cargando.value = false;
        }
    }

    async function funListarSucursales(){
        try {
           
    
            const {data} = await sucursalService.funListar();
            sucursales.value = data;
    
            
        } catch (error) {
        }
    }

     async function funListarAlmacenes(){
        try {
    
            const {data} = await almacenService.funListar(sucursalSelected.value);
            almacenes.value = data;
    
            
        } catch (error) {
        }
    }

    const formatCurrency = (value: number) => {
        if(value)
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return;
    };

    const addCarrito = (prod: any) => {
        carrito.value.push({nombre: prod.nombre, precio_venta_actual: prod.precio_venta_actual, cantidad: 1 });
    }

</script>