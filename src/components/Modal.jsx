import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import useControsGastos from '../hooks/useControsGastos'
import { generarID } from '../helpers/index'
import IconoClose from '../img/cerrar.svg'
import { CATEGORIAS } from '../constantes/app'
let mensaje = "";


function Modal() {
  
  // Stale Global
  const { abrirModal, setAbrirModal, gastosArray, setGastosArray, gastosObj, setGastoObj } = useControsGastos()


  // State Local
  const [nombre, setNombre] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [categoria, setCategoria] = useState('')
  const [error, setError] = useState(false)


  // Funciones
  const cerrarModal = () => {
    setAbrirModal(false)
    setNombre('')
    setCantidad('')
    setCategoria('')
    setGastoObj({})
  }


  const handleAgregarGasto = (e) => {
    e.preventDefault()
    
    // Validando no campos vacios
    if( [nombre, cantidad, categoria].some( (dato) => dato.toString().trim() === '' ) ) {
        mensaje = 'No se permiten campos vacios'
        setError(true)
        setTimeout(() => {
            setError(false)
        }, 3000);
        return
    }


    // Actualizando registro
    if( Object.keys(gastosObj).length > 0 ) {
        // Creando Objeto de lo que el usuario ingresa en el state y combinandolo con la fecha y el id del objeto seleccionado para la edicion
        const gastosActualizadosObj = { nombre, cantidad, categoria, id: gastosObj.id, fecha: gastosObj.fecha }

        // Usando .map() para crear el array actualizado 
        const gastosActualizados = gastosArray.map( (gasto) => {
            if( gasto.id === gastosObj.id ) {
                return gastosActualizadosObj
            }
            else {
                return gasto
            }
        })
        setGastosArray(gastosActualizados)
    }
    else { // Insertando registro

        // Validando que la categoria exista
        let existe = false
        for( let i = 0; i < CATEGORIAS.length; i++ ) {
            if( CATEGORIAS[i] === categoria ) {
                existe = true
            }
        }
        if( !existe ) {
            mensaje = 'La categoria ingresada no existe'
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
            return
        }


        // Generando ID y fecha
        const id = generarID()
        const fecha = Date.now()


        // Creando Objeto de lo que el usuario ingresa en el state
        const gastos = { nombre, cantidad, categoria, id, fecha }


        // Agregando nuevo gasto
        setGastosArray([ ...gastosArray, gastos ]) 
    }

    // Restableciendo state
    setError(false) // Quitando la alerta de error en caso de que se siga viendo
    cerrarModal() // Limpiando el state y cerrando la ventana modal
  }


  // Al habrir el modal, que los inputs tengan los datos del objeto seleccionado para la edicion
  useEffect(() => {
    if( Object.keys(gastosObj).length > 0 ) {
        setNombre(gastosObj.nombre)
        setCantidad(gastosObj.cantidad)
        setCategoria(gastosObj.categoria)
        setAbrirModal(true)
    }
  }, [gastosObj])
   
  
  return (
    <div className={`modal ${ abrirModal ? '' : 'display-none' }`}>
        <div className='modal__grid'>

            <div className='close-modal' title='Cerrar ventana modal' onClick={ cerrarModal }>
                <img className='close-modal__img' src={IconoClose} alt="Icono cerrar" />
            </div>

            <div className='formulario-modal'>
                <h3 className='formulario-modal__title'>Nuevo gasto</h3>
                <form className='formulario-modal__contenido' onSubmit={ handleAgregarGasto }>
                    <div className='formulario-modal__bloque'>
                        <label className='formulario-modal__label' htmlFor="nombre">Nombre:</label>
                        <input 
                            className='formulario-modal__input'
                            id='nombre' 
                            name='nombre' 
                            type="text" 
                            placeholder='Añade el nombre del gasto'
                            value={ nombre }
                            onChange={ (e) => setNombre(e.target.value) } />
                    </div>
                    <div className='formulario-modal__bloque'>
                        <label className='formulario-modal__label' htmlFor="cantidad">Cantidad:</label>
                        <input 
                            className='formulario-modal__input'
                            id='cantidad' 
                            name='cantidad' 
                            type="number" 
                            placeholder='Añade la cantidad del gasto, Ej: 300'
                            min={1}
                            value={ cantidad }
                            onChange={ (e) => setCantidad(Number(e.target.value)) } />
                    </div>
                    <div className='formulario-modal__bloque'>
                        <label className='formulario-modal__label' htmlFor="categoria">Categoría:</label>
                        <input 
                            className='formulario-modal__input' 
                            list='categoria' 
                            placeholder='Filtrar gastos por categoría'
                            value={ categoria }
                            onChange={ (e) => setCategoria(e.target.value) } />
                        <datalist id='categoria'>
                            { CATEGORIAS.map( (categ, i) => {
                                return <option key={i} value={categ} />
                            }) }
                        </datalist>
                    </div>
                    <button 
                        className='formulario-modal__submit'
                        type="submit">
                        { Object.keys(gastosObj).length ? 'Actualizar Gasto' : 'Añadir gasto' }
                    </button>

                    { error && <Alerta mensaje={mensaje}/> }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Modal