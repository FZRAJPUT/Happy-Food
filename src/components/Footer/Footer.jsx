import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
        <Link to='/' ><img src="/logo.png" alt="" /></Link>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero, itaque magnam. Deserunt minima optio iste adipisci consequuntur nisi provident aliquam eius, ex eum, voluptas natus quis beatae quibusdam. Quidem, porro?</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon}   />         
                <img src={assets.twitter_icon}   />
                <img src={assets.linkedin_icon}   />      
            </div>
        </div>
        <div className='footer-content-center'>
            <h2>Company</h2>
            <ul>
              <li>HOME</li>
              <li>ABOUT US</li>
              <li>DELIVERY</li>
              <li>PRIVACY POLICY</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>
              Get in Touch
            </h2>
            <ul>
              <li>+91 986762364</li>
              <li>Contact12@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>Copyright 2024 Tomato.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer