import React from 'react'

const Die = (props) => {
    const logic = 0;
  return (
    <div style={{backgroundColor: props.logic ? '#59E391':'rgba(15, 48, 110, 0.8)'}} onClick={()=>{props.HandleClick(props.cid)}} className='dies'>
      <h2 className="h1-small">{props.figure}</h2>
    </div>
  )
}

export default Die
