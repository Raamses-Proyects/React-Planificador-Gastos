import React, { useState, useEffect } from 'react'
import useControsGastos from '../hooks/useControsGastos'
import Modal from './Modal'
import FiltrarGastos from './FiltrarGastos'
import ListaGastos from './ListaGastos'
import { formatearCantidad, calcularGastado, calcularDisponible, calcularPorcentaje } from '../helpers/index'
import IconoAgregar from '../img/nuevo-gasto.svg'


function ResumenGastos() {
  
  // State Global
  const { presupuesto, setAbrirModal, gastosArray, resetearApp } = useControsGastos()


  // State Local
  const [gastado, setGastado] = useState(0)
  const [disponible, setDisponible] = useState(presupuesto)
  const [porcentajeRestante, setPorcentajeRestante] = useState(100)
  const [clase, setClase] = useState('')


  // Funciones
  const abrirModalFn = () => {
    setAbrirModal(true)
  }

  const resetear = () => {
    resetearApp()
    setGastado(0)
    setDisponible(0)
    setPorcentajeRestante(100)
  }


  /* Calculando los Gastos, Disponible y el Porcentaje Gastado 
    por cada vez que se actualze el array de gastos. 
    Nota: debido a este useEffect no se tienen que guardar gastado, disponible ni el porcentajeRestante
    en localStorage ya que cada vez que detecta que hay un cambio en el gastosArray, hace los calculos */
  useEffect(() => {
      if( gastosArray?.length > 0 ) {

        const gastos = calcularGastado(gastosArray)
        const dineroDisponible = calcularDisponible(presupuesto, gastos)
        const porcentaje = calcularPorcentaje(presupuesto, gastos)
    
        // Actualizando los states
        setGastado(gastos)
        setDisponible(dineroDisponible)
        setPorcentajeRestante(porcentaje)

        // Cambiando color de circulo
        if( porcentaje > 66.66 ) {
          setClase('good')
        }
        else if( porcentaje > 33.33 && porcentaje < 66.66 ) {
          setClase('warning')
        }
        else if( porcentaje < 33.3 ){
          setClase('alert')
        }
      }
      else {
        setGastado(0)
        setClase('good')
        setDisponible(presupuesto)
        setPorcentajeRestante(100)
      }
  }, [gastosArray])


  const colorTexto = () => {
    let color = ''
    if( clase === 'warning' ) {
        color = 'color-warning ' 
    }
    else if( clase === 'alert' ) {
      color = 'color-alert'
    }
    return color
  }
  

  return (
    <>
        <div className='resumen-gastos contenedor translate-y-7'>
            <h1 className='resumen-gastos__heading'>Planificador de gastos</h1>
            <div className='resumen'>
                <div className={`porcentaje ${clase}`}>
                    <p className='porcentaje__texto '>Disponible</p>
                    <p className='porcentaje__texto'>{porcentajeRestante}%</p>
                </div>
                <div className='resumen__datos'>
                  <input 
                    className='resumen__button' 
                    type="button" 
                    value="Resetear App" 
                    title="Reestablecer la app"
                    onClick={ resetear }
                  />
                  <p className='resumen__title'>Presupuesto: <span className='resumen__span'>{ formatearCantidad(presupuesto) }</span></p>
                  <p className={`resumen__title ${ colorTexto(clase) }`}>Disponible: <span className={`resumen__span ${ colorTexto(clase) } ${ porcentajeRestante <= 0 && 'line-through' }`}>{ formatearCantidad(disponible) }</span></p>
                  <p className={`resumen__title ${ colorTexto(clase) }`}>Gastado: <span className={`resumen__span ${ colorTexto(clase) }`}>{ formatearCantidad(gastado) }</span></p>
                </div>
            </div>
        </div>
        <div className='nuevo-gasto' title='Agregar gastos'>
            <img 
                src={IconoAgregar} 
                alt="Icono de nuevo gasto"
                onClick={ abrirModalFn } />
        </div>


        { gastosArray?.length <= 0 ? (
          <Modal />
        ) : (
          <>
            <Modal />
            <FiltrarGastos />
            <ListaGastos />
          </>
        )}
    </>
  )
}

export default ResumenGastos