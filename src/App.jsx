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
