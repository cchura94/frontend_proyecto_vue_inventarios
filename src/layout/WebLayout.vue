<template>
    <h1>Web layout</h1>

    <RouterLink to="/">INICIO</RouterLink> | 
    <RouterLink to="/servicios">SERVICIOS</RouterLink> |
    <RouterLink to="/acercade">ACERCA DE NOSOTROS</RouterLink> |
    <RouterLink to="/auth/ingresar">INGRESAR</RouterLink> |
    <RouterLink to="/admin/perfil">ENTRAR AL PERFIL</RouterLink>

    <router-view />
</template>