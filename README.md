# Pokémon
Aplicación desarrollada en Angular que utiliza la API https://pokemontcg.io/

# Instalación y Ejecución

1. Clona este repositorio: `git clone https://github.com/Sokrof/ProyectoFinalDY`;
2. Ejecuta el comando `npm install` para instalar las dependencias;
3. Ejecuta el comando `ng serve` para iniciar la aplicación.


# Bibliotecas Utilizadas

- Tailwindcss
- Uuid

# Servicios

Se utilizó BaseService para centralizar la lógica de comunicación con la API, con el objetivo de reutilizar código, simplificar el mantenimiento, facilitar la extensión, estandarizar y mejorar la testabilidad. Encapsula operaciones comunes como lectura y búsqueda, proporcionando métodos genéricos que otros servicios pueden utilizar para interactuar de manera consistente y eficiente con la API.

# Estructura de Carpetas

├── app/
   ├── _core/           # Archivos relacionados con el núcleo de la aplicación
   ├── _helpers/        # Funciones y utilidades auxiliares                   
   ├── _models/         # Modelos de la aplicación
   ├── _services/       # Servicios compartidos
   ├── modules/         # Componentes de las páginas principales
   ├── shared/          # Componentes y utilidades compartidos
      ├── components/   # Componentes reutilizables  
      ├── pipes/        # Pipes globales
├── app.component.ts    # Componente raíz de la aplicación
├── app.module.ts     

# Validación
La validación personalizada en Angular es una forma de crear reglas de validación específicas para satisfacer las necesidades únicas de tu aplicación. En este caso, por ejemplo, la baraja debe tener entre 2 y 60 cartas.

# Almacenamiento de Barajas en Memoria
Se ha implementado CRUD (crear, leer, actualizar y eliminar) para almacenar mazos en memoria dentro de tu aplicación Angular. El uso de Observables permite una comunicación reactiva y asíncrona entre componentes que dependen de estos datos.

# Filtros en la API
Este método permite buscar cartas de la API basadas en un criterio de búsqueda proporcionado, devolviendo un Observable que emite los datos correspondientes. Esto es útil para implementar funcionalidades de búsqueda y filtrado en tu aplicación Angular, manteniendo la lógica de comunicación con la API encapsulada dentro de un servicio reutilizable.
