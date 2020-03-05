import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div style={{ margin: '0 auto' }}>
      <div class="block">
        <p class="circle">
          <span class="ouro ouro3">
            <span class="left"><span class="anim"></span></span>
            <span class="right"><span class="anim"></span></span>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Loader
