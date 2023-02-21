import { useContext } from 'react'
import ControsGastosContext from '../context/ControsGastosProvider'

const useControsGastos = () => {
    return useContext(ControsGastosContext)
}

export default useControsGastos
