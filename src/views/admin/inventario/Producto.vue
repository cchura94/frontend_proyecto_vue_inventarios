<template>
     <div>
        <div class="card">
            <Toolbar class="mb-6">
                <template #start>
                    <Button label="Nuevo Producto" icon="pi pi-plus" class="mr-2" @click="openNew" />
                    <Select v-model="sucursal_id" :options="sucursales" optionLabel="nombre" optionValue="id" placeholder="Seleccione una Sucursal" class="w-full md:w-56" @change="funGetAlmacenes()" />
                    <Select v-model="selectedAlmacen" :options="almacenes" optionLabel="nombre" optionValue="id" placeholder="Seleccione un Almacen" class="w-full md:w-56" @change="funListarProductos()" />

                </template>

                <template #end>
                    <Button label="EXCEL" icon="pi pi-excel" class="mr-2" @click="funDescargarEXCEL()"/>
                    <Button label="PDF" icon="pi pi-pdf" class="mr-2" @click="funDescargarPDF()"/>
                    <Button label="Exportar" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
                </template>
            </Toolbar>

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
                        <h4 class="m-0">Gestión Productos</h4>
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText placeholder="Buscar..." v-model="buscar" @keyup.enter="funListarProductos()" />
                        </IconField>
                    </div>
                </template>

                <Column field="id" header="ID" sortable style="min-width: 2rem"></Column>
                <Column field="nombre" header="NOMBRE" sortable style="min-width: 16rem"></Column>
                <Column header="Imagen">
                    <template #body="slotProps">
                        <Image v-if="slotProps.data.imagen" :src="`https://backinventarios.blumbit.net/${slotProps.data.imagen}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" preview  />
                    </template>
                </Column>
                <Column field="precio_venta_actual" header="Precio" sortable style="min-width: 8rem">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.precio_venta_actual) }}
                    </template>
                </Column>
                <Column field="categoria.nombre" header="Categoria" sortable style="min-width: 10rem"></Column>
                
                <Column field="estado" header="Estado" sortable style="min-width: 12rem">
                    <template #body="slotProps">
                        {{ slotProps.data.estado }}
                    </template>
                </Column>
                <Column :exportable="false" style="min-width: 12rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-image" class="mr-2" @click="funDialogImagen(slotProps.data)"></Button>
                        <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" variant="outlined" rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialogImagen" :style="{ width: '450px' }" header="Actualizar Imagen" :modal="true">
       
            <div class="flex flex-col gap-6">
                <FileUpload name="demo[]" :multiple="false" accept="image/*" :maxFileSize="1000000" customUpload @select="onFileSelect">
                    <template #empty>
                        <div>Drag and drop files to here to upload.</div>
                    </template>
                </FileUpload>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>
         <Dialog v-model:visible="productDialog" :style="{ width: '450px' }" header="Detalle Productos" :modal="true">
            {{product}}
            <div class="flex flex-col gap-6">
                <img v-if="product.imagen" :src="`https://backinventarios.blumbit.net/${product.imagen}`" :alt="product.imagen" class="block m-auto pb-4" />
                <div>
                    
                    
                    <label for="name" class="block font-bold mb-3">Nombre</label>
                    <InputText id="name" v-model.trim="product.nombre" required="true" autofocus :invalid="submitted && !product.nombre" fluid />
                    <small v-if="submitted && !product.nombre" class="text-red-500">Nombre es obligatorio.</small>
                </div>
                <div>
                    <label for="description" class="block font-bold mb-3">descripcion</label>
                    <Textarea id="description" v-model="product.descripcion" required="true" rows="3" cols="20" fluid />
                </div>

                <div>
                    <span class="block font-bold mb-4">Categoria</span>
                    <div class="grid grid-cols-12 gap-4">

                        <div class="flex items-center gap-2 col-span-6" v-for="cat in categorias">
                            <RadioButton :id="`category${cat.id}`" v-model="product.categoria_id" name="category" :value="`${cat.id}`" />
                            <label :for="`category${cat.id}`">{{cat.nombre}}</label>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6">
                        <label for="price" class="block font-bold mb-3">Precio venta</label>
                        <InputNumber id="price" v-model="product.precio_venta_actual" mode="currency" currency="USD" locale="en-US" fluid />
                    </div>
                    <div class="col-span-6">
                        <label for="quantity" class="block font-bold mb-3">estado</label>
                        <input type="checkbox" v-model="product.estado">
                    </div>
                </div>
            </div>

            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product"
                    >Are you sure you want to delete <b>{{ product.nombre }}</b
                    >?</span
                >
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" severity="secondary" variant="text" />
                <Button label="Yes" icon="pi pi-check" @click="deleteProduct" severity="danger" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
            <div class="flex items-center gap-4">
                <i class="pi pi-exclamation-triangle !text-3xl" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" severity="secondary" variant="text" />
                <Button label="Yes" icon="pi pi-check" text @click="" severity="danger" />
            </template>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import productoService from '../../../services/producto.service';
    import categoriaService from '../../../services/categoria.service';
    import sucursalService from '../../../services/sucursal.service';
    import almacenService from '../../../services/almacen.service';

    export interface ProductoInterface {
      id?: number,
      nombre: string,
      descripcion?: string,
      precio_venta_actual?: number,
      imagen?: string,
      estado: boolean,
      categoria_id: number,
      created_at?: string
      updated_at?: string
    }

    const dt = ref();
    
    const productos = ref<ProductoInterface[]>([{categoria_id: -1, nombre: "", estado: true, imagen: ""}]);
    const productDialog = ref(false);
    const deleteProductDialog = ref(false);
    const deleteProductsDialog = ref(false);
    const product = ref<ProductoInterface>({nombre: "", estado: true, categoria_id: -1, precio_venta_actual: 0});
    const submitted = ref(false);
    const cargando = ref<boolean>(false);
    const totalRecords = ref<number>(0);
    const lazyParams = ref<any>({page: 0});
    const buscar = ref("");
    const selectedAlmacen = ref(0);

    const categorias = ref<any>([])

    const sucursal_id = ref(-1);
    const sucursales = ref<any>([]);
    const almacenes = ref<any>([]);

    const productDialogImagen = ref(false) 
    const imagenSeleccionada = ref();
    const id_producto_imagen = ref(-1)

    onMounted(() => {
        funListarProductos();
        funGetCategorias();
        funGetSucursales();
    });

    const formatCurrency = (value: number) => {
        if(value)
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return;
    };

    const funGetCategorias = async () => {
        const {data} = await categoriaService.funListar();
        categorias.value = data;
    }

    const funGetSucursales = async () => {
        const {data} = await sucursalService.funListar();
        sucursales.value = data;
    }

    const funGetAlmacenes = async () => {
        const {data} = await almacenService.funListar(sucursal_id.value);
        almacenes.value = data;
    }



    const exportCSV = (event: any) => {
        dt.value.exportCSV();
    };

    const funDescargarPDF = async () => {
        const res = await productoService.funDescargarPDF();

        const url = window.URL.createObjectURL(
            new Blob([res.data], {type: "application/pdf"})
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = "lista_productos.pdf";
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);

    }

    const funDescargarEXCEL = async () => {
         const res = await productoService.funDescargarExcel();

        const url = window.URL.createObjectURL(
            new Blob([res.data], {type: "application/excel"})
        );

        const link = document.createElement("a");
        link.href = url;
        link.download = "lista_productos.xlsx";
        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    }

    const onPage = (event: any) => {
        lazyParams.value = event;
        console.log(lazyParams.value);
        funListarProductos();
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

    const openNew = () => {
        product.value = {nombre: "", estado: true, categoria_id: -1, precio_venta_actual: 0};
        submitted.value = false;
        productDialog.value = true;
    };
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const funDialogImagen = (prod: any) => {
    id_producto_imagen.value = prod.id;
    productDialogImagen.value = true;
}

const onFileSelect = async (event: any) => {
    imagenSeleccionada.value = event.files[0];

    const formData = new FormData();
    formData.append("imagen", imagenSeleccionada.value);

    const {data} = await productoService.funActualizarImagen(id_producto_imagen.value, formData);
    productDialogImagen.value = false;

    funListarProductos();
    id_producto_imagen.value = -1
}



const saveProduct = async () => {
    submitted.value = true;

    if (product?.value.nombre?.trim()) {
        if (product.value.id) {
            // editar
        }
        else {
            // guardar
            await productoService.funGuardar(product.value)
            // toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        productDialog.value = false;
        funListarProductos()
        product.value = {nombre: "", estado: true, categoria_id: -1, precio_venta_actual: 0};
    }
};
const editProduct = (prod: any) => {
    product.value = {...prod};
    productDialog.value = true;
};
const confirmDeleteProduct = (prod: any) => {
    product.value = prod;
    deleteProductDialog.value = true;
};
const deleteProduct = () => {
  
};
</script>

