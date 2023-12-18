import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom'
import React from 'react'
import '../src/Sidebar.css'

export default function props() {
  const [isOpen, setOpen] = React.useState(false)

  const handleIsOpen = () => {
    setOpen(!isOpen)
  }

  const closeSideBar = () => {
    setOpen(false)
  }

  const isLoggedIn = localStorage.getItem('maimaiSongListUser')

  return (
    <div className='navbar-container'>
      <Menu isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
        <Link to='/' className='menu-item' onClick={closeSideBar}>
          Song List
        </Link>
        <Link to='/favorite' className='menu-item' onClick={closeSideBar}>
          Favorite
        </Link>
        <Link to='/new-list' className='menu-item' onClick={closeSideBar}>
          Browse Songs
        </Link>
        <Link to='/converter' className='menu-item' onClick={closeSideBar}>
          Chart Converter
        </Link>
        <Link to='/dxscore' className='menu-item' onClick={closeSideBar}>
          Deluxe Score
        </Link>
        <Link to='/target' className='menu-item' onClick={closeSideBar}>
          Target
        </Link>
        <Link to='/updates' className='menu-item' onclick={closeSideBar}>
          Updates
        </Link>
        <Link to='/rating' className='menu-item' onClick={closeSideBar}>
          Rating
        </Link>
        <Link to='/metronome' className='menu-item' onclick={closeSideBar}>
          Metronome
        </Link>
        <Link to='/about' className='menu-item' onClick={closeSideBar}>
          About
        </Link>
        {!isLoggedIn &&
          <Link to='/register' className='menu-item' onClick={closeSideBar}>
            Register
          </Link>}
        {!isLoggedIn &&
          <Link to='/login' className='menu-item' onClick={closeSideBar}>
            Login
          </Link>}
      </Menu>
    </div>
  )
}
