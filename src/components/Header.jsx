import { useState } from 'react'
import Alerta from './Alerta'
import ResumenGastos from './ResumenGastos'
import useControsGastos from '../hooks/useControsGastos'

function Formulario() {
    
    // State Global
    const { presupuesto, setPresupuesto, setPresupuestoValido } = useControsGastos()


    // State local
    const [error, setError] = useState(false)


    // Funciones
    const handlePresupuesto = (e) => {
        e.preventDefault()

        // Validando error
        if( presupuesto === 0 || presupuesto === '' ) {
            setError(true)
            setPresupuestoValido(false)
            setTimeout(() => {
                setError(false)
            }, 3000)
            return
        }
        setError(false)
        setPresupuestoValido(true)
    }

    // Creo que aqui un useEffect verificando si el presupuesto es mayor a cero
    
    return(
        <>
            <div className='formulario contenedor translate-y-7'>
                <h1 className='formulario__heading'>Planificador de Gastos</h1>
                <form className='formulario-contenido' onSubmit={ handlePresupuesto }>
                    <div className='formulario__bloque'>
                        <label className='formulario__label' htmlFor="presupuesto">Definir Presupuesto</label>
                        <input 
                            className='formulario__input' 
                            type="number" 
                            name="presupuesto" 
                            id="presupuesto" 
                            placeholder='Ingresa tu presupuesto, ej: 300'
                            min="1"
                            onChange={ (e) => setPresupuesto(Number(e.target.value))}/>
                    </div>
                    <button className='formulario__submit' type="submit" title='Añadir un gasto'>Añadir</button>
                    { error && <Alerta mensaje='Presupuesto no valido'/> }
                </form>
            </div>
        </>
    )
}


function Header() {
  
  // Stale Global
  const { presupuestoValido,  abrirModal } = useControsGastos()

  // Si el presupuesto es valido, se muestra el resumen para ver y agregar gastos, si no,
  // se sigue mostrando el formulario para agregar un presupuesto que sea valido
  return (
    <div className={`${ abrirModal ? 'fijar' : '' }`}>
        <header className='header'>
            { presupuestoValido ? ( <ResumenGastos /> ) : ( <Formulario /> ) }
        </header>
    </div>
  )
}

export default Header