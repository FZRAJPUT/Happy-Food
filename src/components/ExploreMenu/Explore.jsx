import React from 'react'
import './Explore.css'
import { menu_list } from '../../assets/assets'

const Explore = ({category,setCategory}) => {

  return (
    <div>
    <div className='ecplore-menu' id='explore-menu'>
<h1>Explore Our Products</h1>
<p className='explore-menu-text'>Choose from a diverse products featuring a delectable array of products crafted with the
   best Quality. Our mission is to satisfy Your
   cravings and give the best services.
</p>
<div className='explore-menu-list'>
   {menu_list.map((item,index)=>{
       return <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}  key={index} className='explore-menu-list-item'>
               <img className={category===item.menu_name?"active":""} src={item.menu_image} alt='' />
               <p>{item.menu_name}</p>
            </div>
   })}
</div>
</div>
   <hr/>
</div>
  )
}

export default Explore