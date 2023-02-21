import React from 'react'

function Alerta({mensaje}) {
  return (
    <div className='alerta'>
        <p className='alerta__mensaje'>{mensaje}</p>
    </div>
  )
}

export default Alerta