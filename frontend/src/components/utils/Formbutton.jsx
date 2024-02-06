import React from 'react'

const Formbutton = ({title, Alert}) => {
  return (
    <div>
      <button onClick={Alert} className='px-5 rounded-lg py-3 bg-blue-800 text-white'>{title}</button>
    </div>
  )
}

export default Formbutton