<template>
  <div class="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
    <!-- Navbar Principal -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo / Marca -->
          <div class="flex-shrink-0 flex items-center">
            <RouterLink to="/" class="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MIEMPRESA
            </RouterLink>
          </div>

          <!-- Navegación Central (Desktop) -->
          <nav class="hidden md:flex space-x-1">
            <RouterLink 
              to="/" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Inicio
            </RouterLink>
            <RouterLink 
              to="/servicios" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Servicios
            </RouterLink>
            <RouterLink 
              to="/acercade" 
              class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              Acerca de Nosotros
            </RouterLink>
          </nav>

          <!-- Acceso / Acciones (Derecha) -->
          <div class="hidden md:flex items-center space-x-3">
            <RouterLink 
              to="/auth/ingresar" 
              class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Ingresar
            </RouterLink>
            <RouterLink 
              to="/admin/perfil" 
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-500/10 transition-colors"
            >
              Mi Perfil
            </RouterLink>
          </div>

          <!-- Botón Menú Móvil (Simplificado) -->
          <div class="flex md:hidden">
            <button type="button" class="text-slate-500 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100">
              <span class="sr-only">Abrir menú</span>
              <!-- Icono de hamburguesa simple -->
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </header>

    <!-- Contenido Dinámico principal de la página -->
    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Pie de página (Footer) -->
    <footer class="bg-white border-t border-slate-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm text-slate-500">
          &copy; 2026 MiEmpresa. Todos los derechos reservados.
        </p>
        <div class="flex space-x-6 text-sm text-slate-400">
          <a href="#" class="hover:text-slate-600 transition-colors">Privacidad</a>
          <a href="#" class="hover:text-slate-600 transition-colors">Términos</a>
        </div>
      </div>
    </footer>
  </div>
</template>