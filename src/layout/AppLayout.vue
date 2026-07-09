<template>
    <h1>App Layout</h1>

    <RouterLink to="/admin">PANEL ADMINISTRATIVO</RouterLink> | 
    <RouterLink to="/admin/perfil">Mi PERFIL</RouterLink> |
        <RouterLink to="/admin/usuario">USUARIOS</RouterLink> |

    <RouterLink to="/">VOLVER A LA PÁGINA INICIO</RouterLink>


    <router-view />
</template>