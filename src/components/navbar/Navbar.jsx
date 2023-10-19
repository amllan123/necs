 import ArrowDropDown from '@mui/icons-material/ArrowDropDown'
import './navbar.scss'
import { useState } from 'react'

const Navbar = () => {
  const [open ,setOpen]=useState(false)
  return (
    <div className='navbar'>
      <div className="wrapper">
        <span>Welcome ! Adminstartor</span>
        <div className="user" onClick={()=>setOpen(!open)}>
          <img src="/male.jpg" alt="" />
          <span>Adminstrator</span>
          <ArrowDropDown/>
        </div>
        <div className={`adminlinks ${open ? "show" : ""}`}>
          <span>Profile</span>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar