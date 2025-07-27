# Documentación Técnica - Componente Dashboard

## Descripción General

El **Dashboard Component** es el componente principal de la aplicación **Grades Calculator** que sirve como página de inicio para usuarios autenticados. Proporciona una interfaz de usuario centralizada con navegación principal, logo de la aplicación y estado de construcción.

## Estructura del Componente

### Ubicación de Archivos
```
GradesCalculator/src/app/dashboard/
├── dashboard.component.html    # Plantilla HTML
├── dashboard.component.ts      # Lógica del componente
└── dashboard.component.scss    # Estilos CSS
```

## Análisis del Archivo HTML (dashboard.component.html)

### Estructura del Template

```html
<div class="dashboard-container">
  <nav class="navbar">
    <div class="nav-content">
      <h1 class="nav-title">GRADES CALCULATOR</h1>
      <div class="nav-menu">
        <button class="nav-button" type="button">Consultar Notas</button>
        <button class="nav-button" type="button">Agregar Notas</button>
        <button class="nav-button" type="button">Calcular Materia</button>
        <button class="nav-button" type="button">Visualizar Progreso</button>
      </div>
      <div class="nav-actions">
        <button class="logout-button" type="button" (click)="logout()">Logout</button>
      </div>
    </div>
  </nav>
  
  <div class="main-content">
    <div class="logo-container">
      <img src="assets/logo.jpg" alt="Grades Calculator Logo" class="logo-image">
    </div>
    
    <div class="construction-message">
      <div class="message-box">
        APP UNDER CONSTRUCTION...
      </div>
    </div>
  </div>
</div>
```

### Elementos Principales

1. **Contenedor Principal** (`dashboard-container`)
   - Envuelve toda la interfaz del dashboard
   - Configura el layout principal de la página

2. **Barra de Navegación** (`navbar`)
   - **Título**: "GRADES CALCULATOR"
   - **Menú de Navegación**: 4 botones principales
   - **Botón de Logout**: Funcionalidad de cierre de sesión

3. **Contenido Principal** (`main-content`)
   - **Logo**: Imagen de la aplicación
   - **Mensaje de Construcción**: Indica estado de desarrollo

### Botones del Menú

| Botón | Función Prevista | Estado |
|-------|------------------|--------|
| Consultar Notas | Ver notas existentes | No implementado |
| Agregar Notas | Añadir nuevas notas | No implementado |
| Calcular Materia | Calcular promedio de materias | No implementado |
| Visualizar Progreso | Ver progreso académico | No implementado |

## Análisis del Archivo TypeScript (dashboard.component.ts)

### Estructura del Componente

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    // Clear any stored auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
```

### Funcionalidades Implementadas

#### 1. Constructor
- **Dependencia**: `Router` de Angular para navegación
- **Propósito**: Inyección de dependencias para routing

#### 2. Método `logout()`
- **Función**: Cierre de sesión del usuario
- **Acciones**:
  - Elimina `authToken` del localStorage
  - Elimina `userData` del localStorage
  - Redirige al usuario a la página de login (`/login`)

### Importaciones y Dependencias

| Importación | Propósito |
|-------------|-----------|
| `Component` | Decorador para definir el componente |
| `Router` | Servicio para navegación entre rutas |

## Análisis del Archivo SCSS (dashboard.component.scss)

### Estructura de Estilos

#### 1. Contenedor Principal
```scss
.dashboard-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
}
```

#### 2. Barra de Navegación
```scss
.navbar {
  background-color: #007bff;  // Azul principal
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

#### 3. Botones de Navegación
```scss
.nav-button {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: white;
    color: #007bff;
  }
}
```

#### 4. Botón de Logout
```scss
.logout-button {
  background-color: transparent;
  border: 2px solid #dc3545;  // Rojo para logout
  color: #dc3545;
  
  &:hover {
    background-color: #dc3545;
    color: white;
  }
}
```

#### 5. Logo
```scss
.logo-image {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

#### 6. Mensaje de Construcción
```scss
.message-box {
  background-color: #ffc107;  // Amarillo de advertencia
  color: #212529;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
```

### Diseño Responsivo

#### Media Queries Implementadas

1. **Tablets (≤768px)**:
   - Navegación en columna
   - Título reducido
   - Botones centrados
   - Logo más pequeño

2. **Móviles (≤480px)**:
   - Menú en columna vertical
   - Botones de ancho completo
   - Padding reducido
   - Logo mínimo

## Colores Utilizados

| Color | Código HEX | Uso |
|-------|------------|-----|
| Azul Principal | `#007bff` | Navbar, botones hover |
| Rojo de Logout | `#dc3545` | Botón de logout |
| Amarillo de Advertencia | `#ffc107` | Mensaje de construcción |
| Gris Claro | `#f8f9fa` | Fondo principal |
| Gris Oscuro | `#212529` | Texto del mensaje |

## Flujo de Navegación

### 1. Acceso al Dashboard
- Usuario autenticado accede desde login
- Ruta: `/dashboard`

### 2. Interacciones Disponibles
- **Logout**: Cierra sesión y redirige a `/login`
- **Botones de Menú**: Actualmente sin funcionalidad

### 3. Navegación de Salida
- Único punto de salida: botón "Logout"
- Limpia datos de autenticación
- Redirige a página de login

## Recursos Externos

### Imágenes
- **Logo**: `assets/logo.jpg`
- **Fuente**: `Imagenes_README/logo.jpg` (copiado a assets)
- **Tamaño**: Máximo 300x300px (responsivo)

## Estado de Implementación

### ✅ Funcionalidades Completadas
- Interfaz de usuario completa
- Navegación responsive
- Funcionalidad de logout
- Carga de logo
- Mensaje de estado de construcción

### ⏳ Funcionalidades Pendientes
- Implementación de botones de menú:
  - Consultar Notas
  - Agregar Notas
  - Calcular Materia
  - Visualizar Progreso

### 🔧 Mejoras Recomendadas
1. **Funcionalidad de Menú**: Implementar navegación a páginas específicas
2. **Guards de Ruta**: Proteger acceso al dashboard con autenticación
3. **Estado de Usuario**: Mostrar información del usuario logueado
4. **Notificaciones**: Sistema de mensajes para el usuario
5. **Animaciones**: Mejorar transiciones entre estados

## Integración con el Sistema

### Dependencias del Componente
- **Angular Router**: Para navegación
- **LocalStorage**: Para manejo de autenticación
- **Assets**: Para recursos estáticos

### Componentes Relacionados
- **Login Component**: Redirige al dashboard tras autenticación
- **Signup Component**: Potencial entrada al dashboard
- **App Routes**: Configuración de rutas en `app.routes.ts`

## Consideraciones de Desarrollo

### Buenas Prácticas Implementadas
- Uso de TypeScript para type safety
- Separación de responsabilidades (HTML, TS, SCSS)
- Diseño responsivo con media queries
- Accesibilidad básica (alt text, focus states)

### Puntos de Mejora
- Falta de lazy loading para el componente
- No hay tests unitarios
- Gestión de estado local (sin servicios)
- Hardcoded strings (falta internacionalización)

## Conclusión

El Dashboard Component representa una base sólida para la aplicación Grades Calculator. Proporciona una interfaz limpia y profesional con navegación clara y funcionalidad básica de logout. La implementación actual es adecuada para el estado de desarrollo, con una arquitectura que facilita la expansión futura de funcionalidades.

La estructura modular y el diseño responsivo aseguran que el componente pueda adaptarse tanto a nuevas características como a diferentes dispositivos, manteniendo una experiencia de usuario consistente.
