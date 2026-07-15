<template>
  <div class="max-w-2xl mx-auto py-6">
    <!-- Proveedor de confirmaciones (Requerido para usar ConfirmDialog) -->
    <ConfirmDialog></ConfirmDialog>

    <!-- Tarjeta Principal de PrimeVue estilizada con Tailwind -->
    <Card
      class="overflow-hidden border border-slate-200/80 shadow-xl shadow-slate-200/40 rounded-3xl bg-white"
    >
      <!-- Encabezado / Cover de la Tarjeta -->
      <template #header>
        <div class="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <!-- Círculos decorativos sutiles -->
          <div class="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
        </div>
      </template>

      <!-- Título y Contenido Principal -->
      <template #title>
        <div
          class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 px-2 -mt-16 relative z-10 pb-6 border-b border-slate-100"
        >
          <!-- Bloque de Usuario (Avatar + Nombre) -->
          <div class="flex items-end gap-4">
            <!-- Avatar de PrimeVue -->
            <Avatar
              :label="perfil.name ? perfil.name.charAt(0).toUpperCase() : 'U'"
              size="xlarge"
              shape="circle"
              class="w-24 h-24 text-2xl font-bold bg-white text-blue-600 border-4 border-white shadow-md flex items-center justify-center"
            />
            <div class="mb-2">
              <h1
                v-if="cargando"
                class="text-2xl font-bold text-slate-950 tracking-tight"
              >
                <Skeleton width="180px" height="2rem"></Skeleton>
              </h1>
              <h1
                v-else
                class="text-2xl font-bold text-slate-950 tracking-tight"
              >
                {{ perfil.name }}
              </h1>
              <p
                class="text-xs font-semibold uppercase tracking-wider text-blue-600 mt-0.5"
              >
                Panel de Control
              </p>
            </div>
          </div>

          <!-- Botón de Cerrar Sesión con PrimeVue Button -->
          <Button
            @click="confirmarSalida()"
            icon="pi pi-power-off"
            label="Cerrar Sesión"
            severity="danger"
            text
            raised
            class="sm:mb-2 font-medium border border-red-100 bg-red-50/50 hover:bg-red-50 text-red-600 rounded-xl px-4 py-2 text-sm transition-all duration-200"
          />
        </div>
      </template>

      <!-- Cuerpo de Datos Técnicos -->
      <template #content>
        <div class="mt-4 px-2 space-y-4">
          <h3
            class="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2"
          >
            Información de cuenta
          </h3>

          <!-- Fila: Correo Electrónico -->
          <div
            class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100"
          >
            <div class="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <i class="pi pi-envelope text-lg"></i>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-xs font-medium text-slate-400 block"
                >Correo Electrónico</span
              >
              <Skeleton v-if="cargando" width="70%" class="mt-1"></Skeleton>
              <span
                v-else
                class="text-sm font-semibold text-slate-700 block truncate"
                >{{ perfil.email }}</span
              >
            </div>
          </div>

          <!-- Fila: Fecha de Creación -->
          <div
            class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100"
          >
            <div class="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <i class="pi pi-calendar text-lg"></i>
            </div>
            <div class="flex-1">
              <span class="text-xs font-medium text-slate-400 block"
                >Miembro Desde</span
              >
              <Skeleton v-if="cargando" width="40%" class="mt-1"></Skeleton>
              <span v-else class="text-sm font-semibold text-slate-700 block">{{
                perfil.created_at
              }}</span>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { funPerfil } from "./../../services/perfil.service";
import { logoutConLaravel } from "./../../services/auth.service";

// Componentes explícitos de PrimeVue
import Card from "primevue/card";
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import ConfirmDialog from "primevue/confirmdialog";

const perfil = ref<any>({});
const cargando = ref<boolean>(true);
const confirm = useConfirm();

async function funObtenerPerfil() {
  cargando.value = true;
  try {
    const data = await funPerfil();
    perfil.value = data;
  } catch (error) {
    console.error("Error al obtener el perfil", error);
  } finally {
    cargando.value = false;
  }
}

funObtenerPerfil();

// Confirmación nativa y elegante antes de salir
function confirmarSalida() {
  confirm.require({
    message: "¿Estás seguro de que deseas cerrar tu sesión actual?",
    header: "Confirmar Salida",
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Cancelar",
    acceptLabel: "Salir",
    rejectClass:
      "p-button-secondary p-button-outlined rounded-xl text-sm px-3 py-2 mr-2",
    acceptClass:
      "p-button-danger bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm px-4 py-2",
    accept: async () => {
      await logoutConLaravel();
      funObtenerPerfil();
    },
  });
}
</script>

<style scoped>
/* Asegura la correcta visualización de los iconos si usas PrimeIcons */
@import "primeicons/primeicons.css";
</style>
