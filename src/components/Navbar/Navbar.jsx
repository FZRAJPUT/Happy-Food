import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

const Navbar = ({ setshowLogin }) => {

    const { getTotalCartAmount,token,settoken } = useContext(StoreContext)
    const [Menu, setMenu] = useState("home");
    const naviGate = useNavigate();

    const logOut = ()=>{
        localStorage.removeItem("token");
        settoken("")
        naviGate("/");
    }

    return (
        <div className='navbar'>
            <Link to='/' ><img src="/logo.png" alt="" /></Link>
            <ul className='navbar-menu'>
                <Link to='/' onClick={() => { setMenu('home') }} className={Menu == 'home' ? 'active' : ""}>HOME</Link>
                <a href='#explore-menu' onClick={() => { setMenu('menu') }} className={Menu == 'menu' ? 'active' : ""}>MENU</a>
                <a href='#app-download' onClick={() => { setMenu('mobile-app') }} className={Menu == 'mobile-app' ? 'active' : ""}>MOBILE-APP</a>
                <a href='#footer' onClick={() => { setMenu('contact-us') }} className={Menu == 'contact-us' ? 'active' : ""}>CONTACT US</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} />
                <div className='navbar-search-icon'>
                    <Link to="/cart" ><img src={assets.basket_icon} /></Link>
                    <div className={getTotalCartAmount() === 0?"":"dot"}></div>
                </div>
                {!token?
                <button onClick={() => { setshowLogin(true); }}>Sign in</button>:
                <div className='navbar-profile'>
                    <img src={assets.profile_icon} alt="" />
                    <ul className="nav-profile-dropdown">
                        <li><img src={assets.bag_icon} alt="" /> <p>Orders</p></li>
                        <hr />
                        <li onClick={logOut}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Navbar