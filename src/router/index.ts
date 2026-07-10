import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Inicio from "../views/web/Inicio.vue";
import Nosotros from "../views/web/Nosotros.vue";
import Servicios from "../views/web/Servicios.vue";
import Login from "../views/auth/Login.vue";
import WebLayout from "../layout/WebLayout.vue";
import AppLayout from "../layout/AppLayout.vue";
import Perfil from "../views/admin/Perfil.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Usuario from "../views/admin/Usuario.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: WebLayout,
        children: [
            { path: '/', component: Inicio},
            { path: '/acercade', component: Nosotros },
            { path: '/servicios', component: Servicios },
            { path: '/auth/ingresar', component: Login, name: 'Login', meta: {redirectIfAuth: true} }
        ]
    },
    {
        path: '/admin',
        component: AppLayout,
        meta: {requireAuth: true},
        children: [
            { path: '', component: Dashboard },
            { path: 'perfil', component: Perfil, /*name="Perfil*/},
            { path: 'usuario', component: Usuario},
            
        ]
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    console.log("ESTOY EN (FROM): "+ from.path);
    console.log("QUIERO INGRESAR A (TO): "+to.path);
    const token = localStorage.getItem("access_token");

    if(to.meta.requireAuth){
        if(!token){
            return next({name: 'Login'})
        }else{
            return  next();
        }
    }
    
    if(to.meta.redirectIfAuth && token){
        return next({name: 'Perfil'});
    }

    return next();
})


export default router;