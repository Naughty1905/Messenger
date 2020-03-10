import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <div className="block">
        <p className="circle">
          <span className="ouro ouro3">
            <span className="left"><span className="anim"></span></span>
            <span className="right"><span className="anim"></span></span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Loader
