export const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const generarID = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
}

export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const sincronizarStorage = (nombre, array) => {
    localStorage.setItem( nombre, JSON.stringify(array) )
}

export const calcularGastado = (gastosArray) => {
    const gastos = gastosArray?.reduce( (acumulado, gasto) => acumulado + gasto.cantidad , 0 )
    return gastos
}
export const calcularDisponible = (presupuesto, gastado) => {
    // console.log(gastado)
    const disponible = presupuesto - gastado
    return disponible
}
export const calcularPorcentaje = (presupuesto, gastado) => {
    const porcentaje = ( ( (presupuesto - gastado) / presupuesto ) * 100).toFixed(2)
    return porcentaje
}