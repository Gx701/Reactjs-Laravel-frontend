# After clone the project

Execute the next commands

### `npm install`

### `npm run build`

### `npm start`

### about the project
# Crear una aplicación React simple
En terminos generales la aplicación es el frontend de una api creada en laravel (backend)
consume sus servicios para mostrarlos en el framework de Reactjs (Libreria).

# Uso de hooks:
los hooks que se usaron en esta aplicación fueron:

useState: Permite añadir estado a un componente funcional.
lo use en una clase router "PrivateRoute" para determinar cuando se haya iniciado sesión en el lado del frontend.

useContext: Permite acceder al contexto de un componente. lo aplique para poder obtener el token de inición 
de sesión del lado del backend junto al useState, determina en una página si esta tiene el token activo mantiene la sesión abierta al recargar la página si el token expiro devuelve al login. Si se intenta acceder 
a una ruta protejida por el AuthContext tampoco deja acceder por no haber token de inicio de sesión

useEffect: Permite ejecutar código en respuesta a cambios en el componente.
Lo use para verificar los estados de los endpoints que se llaman de la api de laravel, para determinar cuando se produzca un insert, update, delete o un create en la aplicación del frontend para el backend, para recoger información

