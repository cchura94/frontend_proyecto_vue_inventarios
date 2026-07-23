<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administración',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                to: '/admin'
            },
            {
                label: 'Mi Perfil',
                icon: 'pi pi-fw pi-user',
                to: '/admin/perfil'
            }
        ]
    },
    {
        label: 'Usuarios',
        items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                to: '/admin/usuario'
            },
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-check-square',
                to: '/uikit/input'
            },
            /*{
                label: 'Button',
                icon: 'pi pi-fw pi-mobile',
                to: '/uikit/button',
                class: 'rotated-icon'
            },
            {
                label: 'Table',
                icon: 'pi pi-fw pi-table',
                to: '/uikit/table'
            },
            {
                label: 'List',
                icon: 'pi pi-fw pi-list',
                to: '/uikit/list'
            },
            {
                label: 'Tree',
                icon: 'pi pi-fw pi-share-alt',
                to: '/uikit/tree'
            },
            {
                label: 'Panel',
                icon: 'pi pi-fw pi-tablet',
                to: '/uikit/panel'
            },
            {
                label: 'Overlay',
                icon: 'pi pi-fw pi-clone',
                to: '/uikit/overlay'
            },
            {
                label: 'Media',
                icon: 'pi pi-fw pi-image',
                to: '/uikit/media'
            },
            {
                label: 'Menu',
                icon: 'pi pi-fw pi-bars',
                to: '/uikit/menu'
            },
            {
                label: 'Message',
                icon: 'pi pi-fw pi-comment',
                to: '/uikit/message'
            },
            {
                label: 'File',
                icon: 'pi pi-fw pi-file',
                to: '/uikit/file'
            },
            {
                label: 'Chart',
                icon: 'pi pi-fw pi-chart-bar',
                to: '/uikit/charts'
            },
            {
                label: 'Timeline',
                icon: 'pi pi-fw pi-calendar',
                to: '/uikit/timeline'
            },
            {
                label: 'Misc',
                icon: 'pi pi-fw pi-circle',
                to: '/uikit/misc'
            }*/
        ]
    },
    {
        label: 'Inventarios',
        icon: 'pi pi-fw pi-prime',
        path: '/blocks',
        items: [
            {
                label: 'Categorias',
                icon: 'pi pi-fw pi-box',
                to: '/admin/categoria'
            },
            {
                label: 'Productos',
                icon: 'pi pi-fw pi-table',
                to: '/admin/producto'
            },
            {
                label: 'Sucursales',
                icon: 'pi pi-fw pi-circle',
                to: '/admin/sucursal'
            },
            {
                label: 'Almacenes',
                icon: 'pi pi-fw pi-circle',
                to: '/admin/almacen'
            }
        ]
    },
    {
        label: 'Compras y Ventas',
        icon: 'pi pi-fw pi-shop',
        path: '/pages',
        items: [
            {
                label: 'Gestión Compras',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/nota/compra'
            },
            {
                label: 'Gestión Ventas',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/nota/venta'
            },
            {
                label: 'Lista Compras y Ventas',
                icon: 'pi pi-fw pi-globe',
                to: '/admin/nota'
            },
            
        ]
    },
   
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
