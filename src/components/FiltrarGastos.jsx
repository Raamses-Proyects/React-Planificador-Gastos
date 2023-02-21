import { useEffect } from 'react'
import useControsGastos from '../hooks/useControsGastos'
import { CATEGORIAS } from '../constantes/app'


function FiltrarGastos() {

  // State Global
  const { filtro, setFiltro, gastosArray, setGastosFiltradosArray, setSumaGastosCategoria } = useControsGastos()


  // Funciones
  const gastosPorCategorias = () => {
    // Obtener la cantidad gastada por cada categoria de gastos
    let gastado = 0
    let filt = gastosArray.find( (gasto) => gasto.categoria === filtro )
    if( filt?.categoria === filtro ) {
      for( let gasto of gastosArray ) {
        if( gasto.categoria === filtro ) {
            gastado += gasto.cantidad
        }
      }
    }
    return gastado
  }

  const sumaGastos = () => {
    if( gastosPorCategorias() > 0  ) {
      setSumaGastosCategoria(gastosPorCategorias())
    }
    else {
      setSumaGastosCategoria(0)
    }
  }


  // Busqueda en base al filtro
  useEffect(() => {
    if( filtro !== '' ) {
      const arrayFiltrado = gastosArray.filter((gasto) => gasto.categoria === filtro )
      setGastosFiltradosArray(arrayFiltrado)
      sumaGastos()
    }
    else {
      setGastosFiltradosArray([])
      setSumaGastosCategoria(0)
    }
  }, [filtro])


  return (
    <div className='filtrar translate-y-7'>
        <h3 className='filtrar__title'>Filtrar Gastos</h3>
        <div className='filtrar__contenido'>
            <label className='filtrar__label'>Categoría:</label>
            <select
              className='formulario-modal__input'
              value={filtro} 
              onChange={ (e) => setFiltro(e.target.value) }>
              <option value="">--Todas las Categorias--</option>
              { CATEGORIAS.map( (categ, i) => {
                return <option key={i} value={categ}>{categ}</option>
              }) }
            </select>
        </div>
    </div>
  )
}

export default FiltrarGastos