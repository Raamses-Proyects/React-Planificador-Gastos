import React from 'react'
import useControsGastos from '../hooks/useControsGastos'
import { formatearCantidad, formatearFecha } from '../helpers/index'
import IconoAhorro from '../img/icono_ahorro.svg'
import IconoComida from '../img/icono_comida.svg'
import IconoCasa from '../img/icono_casa.svg'
import IconoGastos from '../img/icono_gastos.svg'
import IconoOcio from '../img/icono_ocio.svg'
import IconoSalud from '../img/icono_salud.svg'
import IconoSuscripciones from '../img/icono_suscripciones.svg'
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    subscripciones: IconoSuscripciones
}


function Gasto() {

    // State global
    const { gastosArray, setGastosArray, setGastoObj, gastosFiltradosArray } = useControsGastos()

    // Funciones
    const editarGasto = (id) => {
        const gastoFiltrado = gastosArray.filter( (gasto) => gasto.id === id )
        setGastoObj(gastoFiltrado[0])
    }

    const eliminarGasto = (id) => {
        const gastosActualizado = gastosArray.filter( (gasto) => gasto.id !== id )
        setGastosArray(gastosActualizado)
    }


    const arrayARenderizar = () => {
        // Eligir si se va a renderizar el array con todos los gastos o solo el array filtrado por la busqueda
        let array;
        if( gastosFiltradosArray?.length > 0 ) {
            array = gastosFiltradosArray
        }
        else {
            array = gastosArray
        }
        return array
    }

    return(
        arrayARenderizar()?.map( (dato) => {
            const { cantidad, categoria, fecha, id, nombre } = dato
            return (
                <div className='gasto' key={id}>
                    <div className='gasto__contenido'>
                        <img className='gasto__img' src={diccionarioIconos[categoria]} alt="Icono de ahorro" />
                        <div className='gasto__info'>
                            <h3 className='gasto__texto capitalize'>{categoria}</h3>
                            <p className='gasto__texto'>Costo: <span className='gasto__span'>{ formatearCantidad(cantidad) }</span></p>
                            <p className='gasto__texto'>Nombre: <span className='gasto__span'>{ nombre }</span></p>
                            <p className='gasto__texto'>Agregado el: <span className='gasto__span'>{ formatearFecha(fecha) }</span></p>
                        </div>
                    </div>
                    <div className='gasto__acciones'>
                        <button 
                            className='gasto__button gasto__button--actualizar' 
                            type='button' title='Editar gasto'
                            onClick={ () => editarGasto(id) }
                            >Editar</button>
                        <button 
                            className='gasto__button gasto__button--eliminar'
                            type="button" 
                            title='Eliminar gasto'
                            onClick={ () => eliminarGasto(id) }
                            >Eliminar</button>                    
                    </div>
                </div>
            )
        })
    )
}

function ListaGastosTitle() {
    
    // State Global
    const { sumaGastosCategoria, filtro, gastosFiltradosArray } = useControsGastos()

    let textoTitulo;
    let filtroEncontrado = false
    if(!filtro) {
      filtroEncontrado = false
      textoTitulo = 'Lista Gastos'
    }
    else if( filtro && Object.values(gastosFiltradosArray).length === 0 ) {
      filtroEncontrado = false
      textoTitulo =  `Sin gastos de ${filtro}`
    }
    else if( filtro && Object.values(gastosFiltradosArray).length > 0 ) {
      filtroEncontrado = true
    }

    return (
        <>
           { !filtroEncontrado ? (
                <h3 className='lista-gastos__title'>
                    {textoTitulo}
                </h3>) 
           : (
                <div className='contenido-lista-gastos__title'>
                    <h3 className='lista-gastos__title'>
                        Total gastado en: 
                        <span 
                            className='capitalize normal'
                            >
                            {filtro} {formatearCantidad(sumaGastosCategoria)}
                        </span>
                    </h3>
                </div>
            ) }
        </>
    )
}


function ListaGastos() {
  return (
    <div className='lista-gastos translate-y-7'>
        <ListaGastosTitle />

        <div className='lista-gastos__grid'>
            <Gasto/>
        </div>
    </div>
  )
}

export default ListaGastos