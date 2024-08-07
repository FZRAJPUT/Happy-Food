import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className='header-content'>
            <h2>Order Your favourite food here</h2>
            <a href='#explore-menu'><button>View Menu</button></a>
        </div>
    </div>
  )
}

export default Header
