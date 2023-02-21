import { useState, useEffect, createContext } from 'react'
import { sincronizarStorage } from '../helpers'

// Variable y nombre del context
const ControsGastosContext = createContext()

// Provider/fuente de los datos
const ControsGastosProvider = ({children}) => {

    // States
    const [presupuesto, setPresupuesto] = useState( JSON.parse(localStorage.getItem('presupuesto')) || 0 )
    const [presupuestoValido, setPresupuestoValido] = useState(false)
    const [abrirModal, setAbrirModal] = useState(false)
    const [gastosArray, setGastosArray] = useState( JSON.parse(localStorage.getItem('gastos')) || [] )
    const [gastosObj, setGastoObj] = useState({})
    const [filtro, setFiltro] = useState('')
    const [gastosFiltradosArray, setGastosFiltradosArray] = useState([])
    const [sumaGastosCategoria, setSumaGastosCategoria] = useState(0)


    // Funciones
    const resetearApp = () => {
        setPresupuesto(0)
        sincronizarStorage('presupuesto', 0)
        setPresupuestoValido(false)
        setGastosArray([])
        setFiltro('')
        setGastosFiltradosArray([])
    }

    // Sincronizando el presupuesto con local storage
    useEffect(() => {
        if( presupuestoValido ) {
            sincronizarStorage('presupuesto', presupuesto)
        }
        else {
            sincronizarStorage('presupuesto', JSON.parse(localStorage.getItem('presupuesto')) || 0 )
            if( presupuesto > 0 ) {
                setPresupuestoValido(true)
            }
        }
    }, [presupuestoValido])


    // Sincronizando array de gastos al localstorage
    useEffect(() => {
        sincronizarStorage('gastos', gastosArray)
    }, [gastosArray])


    return(
        <ControsGastosContext.Provider
            value={{
                presupuesto,
                setPresupuesto,
                presupuestoValido,
                setPresupuestoValido,
                abrirModal,
                setAbrirModal,
                gastosArray,
                setGastosArray,
                gastosObj,
                setGastoObj,
                filtro,
                setFiltro,
                gastosFiltradosArray,
                setGastosFiltradosArray,
                resetearApp,
                sumaGastosCategoria,
                setSumaGastosCategoria
            }}
        >
            {children}
        </ControsGastosContext.Provider>
    )
}

export {
    // Este va a ser la funcion/componente que va a encerrar al AppNombreApp que se manda a llamar 
    // en el App.jsx, para que todos los componentes que esten dentro del AppNombreApp tengan acceso a
    // las variables globales
    ControsGastosProvider
}

// Cada vez que se tenga que mandar a usar el context se tiene que usar el Context creado aqui, por
// lo que es el que se manda a llamar al momento de crear un hook para usar el context
export default ControsGastosContext