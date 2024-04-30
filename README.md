# API
https://pokemontcg.io/

# Instalación y Ejecución
1. Clona este repositorio: `git clone https://github.com/Sokrof/ProyectoPCTG`;
2. Ejecuta el comando `npm install` para instalar las dependencias;
3. Ejecuta el comando `ng serve` para iniciar la aplicación.

# Bibliotecas Utilizadas
- Tailwindcss
- Uuid

# Validación
La validación personalizada en Angular es una forma de crear reglas de validación específicas para satisfacer las necesidades únicas de tu aplicación. En este caso, por ejemplo, la baraja debe tener entre 2 y 60 cartas.

# Almacenamiento de Barajas en Memoria
Se ha implementado CRUD (crear, leer, actualizar y eliminar) para almacenar mazos en memoria dentro de tu aplicación Angular. El uso de Observables permite una comunicación reactiva y asíncrona entre componentes que dependen de estos datos.

# Filtros en la API
Este método permite buscar cartas de la API basadas en un criterio de búsqueda proporcionado.
