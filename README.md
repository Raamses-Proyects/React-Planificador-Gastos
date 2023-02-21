# React-Planificador-Gastos
¿Que tiene que hacer este proyecto de Planificador de Gastos?

    1.- Se ingresa un presupuesto, el cual se va a validar que sea mayor a cero, que no tenga espacios 
        en blanco etc, y en base al presupuesto se va a calcular lo que se a gastado y el saldo restante,
        datos que se van a mostrar al usuario siempre.

    2.- Cada gasto se va a solicitar la información de: Nombre de gasto, Cantidad, Categoría, la Fecha
        que no se va a solicitar al usuario pero si se va a guardar automáticamente y se va a mostrar
        al usuario, y por ultimo un id para reconocer a cada gasto.  

    3.- La app tiene la funcionalidad de actualizar los gastos o de eliminarlos.

    4.- Va a tener la funcionalidad de filtrar por la categoría de gastos y a ser un filtro valido
        muestre el total de los gastos asociados.



REACT:

    1.- Para instalar/usar react se utilizo la herramienta de vite con el comando de:
            npm init vite@latest
        Y se siguieron los pasos que proporciona la herramienta de vite

    2.- Ejemplo de como importar imagenes como si fueran componentes en el archivo de App.jsx
        import IconoNuevoGasto from './img/nuevo-gasto.svg'

    3.- Explicación del simbolo de &&: en el ( Video 102. Añadir un botón para registrar un nuevo gasto )
        Pero en general, si la primer condición es verdadera, ya no requieres colocar el : o sea el sino en el operador
        ternario

    4.- Agregar clases dinámicas a los componentes ( Video 105. Creando una Animación en el Modal )
        Ver ejemplos en los archivos Mensaje.jsx o Modal.jsx

    5.- Validación:
        Hay una validación en el archivo de Modal.jsx que es
        if( [nombre, cantidad, categoria].some( (dato) => dato.toString().trim() === '' ) ) {
            console.log('No se permiten campos vacios')
            return
        }
            1.- Se utilizo el metodo de array .some() para saber si al menos un valor cumplia con la condición
            2.- Se aplico el metodo .toString() a cada valor de la intereacción para convertir cada valor 
                a un string y asi poder utilizar el metodo de .trim()
            3.- El método de .trim() es para quitar los espacios en blanco del inicio y al final de cada string
                pero también arroja un true o un false si encuentra, o no, espacios en blanco, y en base a eso en 
                cada intereaccion del ciclo se verifica los inputs no queden asi === '' o asi === '  '
    
    6.- Formas de acomodar las declaraciones de los import, 
            1.- Primero todo lo relacionado con react o otras librerías
            2.- Los Componentes
            3.- Hojas de estilos e imágenes

    7.- Ejemplo de como usar un select/combobox en React ( Video 119. Colocando el Gasto a Editar en el State y en el Formulario )
        en el archivo de Modal.jsx, pero fue reemplazado por un datalist

    8.- Para la implementación del Hook UseContext se siguieron los siguientes pasos:
            1.- Se crea un componente con un nombre relacionado con la app AppNombreApp.jsx
            2.- En el archivo de App.jsx, se renderizo solamente el componente de AppNombreApp.jsx
            3.- Ejemplo:
                import { ControsGastosProvider } from './context/ControsGastosProvider'
                import AppControlGastos from './components/AppControlGastos'
                function App() {

                    return (
                        <ControsGastosProvider>
                            <AppControlGastos />
                        </ControsGastosProvider>
                    )
                }
                export default App

        Para crear el archivo de NombreAppProvider.jsx primero:
            1.- import { createContext } from 'react'

            2.- Se declara una variable para guardar y crear el context,
                const NombreAppContext = createContext()

            3.- Despues se crea el provider, que es de donde provienen los datos, el cual es
                una función normal con la diferencia de que en el return seria asi:
        
            const NombreAppProvider = ({children}) => {

                // Aqui todas las variables, funciones, states, effects, etc.

                return(
                    <NombreAppContext.Provider
                        value={{
                            // Aqui van todas las variables, funciones, states, que van a estar de manera global para
                            // todos los componentes que esten dentro de la funcion de NombreAppProvider
                        }}
                        >
                        {children} /* children: Todos los componentes que van a tener acceso a las variables 
                                      globales de NombreAppProvider */
                    </NombreAppContext.Provider>
                )
            }
    
        4.- En el archivo de App.jsx se va a exportar la función de NombreAppProvider del archivo que esta en 
            NombreAppProvider.jsx, el cual va a rodear el componente de AppNombreApp.jsx que si se sigue esta
            forma de crear el context debería ser el único componente de ese archivo de App.jsx

        5.- Hook para el context:
            1.- Crear un archivo con el nombre de useNombreApp, ver ejemplo en useControsGastos.jsx

        Notas: 
            1.- Para ver como se implementa y explica un context desde cero es en el proyecto de
                Sección 21: PROYECTO: Cotizador de Seguro de Automóvil con Context API

            2.- En el video de ( 310. Pasar state desde el Provider y Consumirlo en los Componentes )
                se explica para que es y que contiene NombreAppProvider y por debajo el Context.Provider
                representados en React-Devalopers-tools, pero en terminos simples el:

            3.- NombreAppProvider: contiene todas las variables, funciones, states, effects, etc. 
                Que se declaran antes del return de la función de NombreAppProvider o sea antes 
                de que esten disponibles de manera global para los componentes.
        
            4.- Context.Provider: aqui ya seria todas las variables, funciones, states, effects, etc, 
                pero ya de manera global. O sea ya dentro del value del return de la funcion 
                de NombreAppProvider.
    


CSS/estilos:

    1.- Se utilizo código de css plano

    2.- La ventana modal implementada fue hecha primero en un ejemplo aparte y luego implementada en
        en el proyecto para enfocarse en su correcto funcionamiento e implementación



JavaScript/Funcionalidades:

    1.- Formatear cantidad: ( Video 101. Formatear Números a Dinero )
        JS tiene una API que permite formatear la cantidad de 1000 a $1,000.00, sin modificar el 
        valor/objeto que contenga el valor de 1000

        Ejemplo
        const formatearCantidad = (cantidad) => {
            return cantidad.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
        }
    
    2.- Generar ID: ( Video 109. Creando una función para generar un ID único y Añadiendo Gastos al State )
        Se tiene una funcion para generar id aleatorios que seria la siguiente
        const generarID = () => {
            const random = Math.random().toString(36).substring(2)
            const fecha = Date.now().toString(36)
            return random + fecha
        }

    3.- Formatear fechas: ( Video 112. Formateando las Fechas )
        Pasar la fecha de asi 1672515321248 y que quede asi 31 de diciembre de 2022
        const formatearFecha = (fecha) => {
            const fechaNueva = new Date(fecha)
            const opciones = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            return fechaNueva.toLocaleDateString('es-ES', opciones)
        }
    
    4.- Crear un Diccionario dinamico para los iconos de los gastos ( Video 113. Mostrando el Icono de Gastos )
        Ejemplo en el archivo de Gasto.jsx

    5.- Calculando los gastos, disponible y el porcentaje gastado
        1.- Calcular Gastos (con metodo .reduce()):
            const totalGastos = gastos.reduce((acumulador, gasto) => acumulador + gasto.cantidad, 0)
        
        2.- Calcular saldo disponible: 
            const totalDisponible = presupuesto - totalGastos

        3.- Calcular el porcentaje gastado:
            const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        Estos calculos estan en el archivo de ControlPresupuesto.jsx, y se hacen en un useEffect()
    
    6.- Sincronizar con LocalStorage:
        const sincronizarStorage = (nombre, array) => {
            localStorage.setItem( nombre, JSON.stringify(array) )
        }
    
    7.- Al ser una aplicación que tiene un array con la lista de los pacientes y otro array
        con la lista de pacientes con relacion a la busqueda del usuario, se necesita saber
        en que momento renderizar uno u otro, para eso se utilizo la función de:

          const arrayARenderizar = () => {
            // Eligir si se va a renderizar el array con todos los pacientes o solo el array filtrado por la busqueda
            let array;
            if( pacientesArrayBusqueda?.length > 0 ) {
                array = pacientesArrayBusqueda
            }
            else {
                array = pacientesArray
            }
            return array
        }
