import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const isLoggedIn = JSON.parse(localStorage.getItem('maimaiSongListUser'))
  const navigate = useNavigate()

  const handleSignout = () => {
    localStorage.removeItem('maimaiSongListUser')
    navigate('/')
  }

  const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value
    setSelectedOption(newSelectedOption)
    localStorage.setItem('songlisttheme', JSON.stringify(newSelectedOption))
  }

  const style = {
    color: selectedOption === 'light' ? 'black' : 'white'
  }

  const subTitleStyle = {
    color: selectedOption === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'
  }

  const signOutButtonStyle = {
    marginLeft: '10px',
    borderRadius: '17px',
    border: 'none',
    backgroundColor:'#8062D6',
    color: 'white',
    padding: '10px 10px 10px 10px',
    marginTop: '20px',
    fontWeight: 'bold',
    cursor: 'pointer'

  }

  React.useEffect(() => {
    document.body.classList.toggle('dark', selectedOption === 'dark')
    document.title="Settings"
  }, [selectedOption])

  return (
    <div className='settings-container'>
      <h2 style={style}>Settings</h2>
      {isLoggedIn && <h3 style={style}>User: {isLoggedIn.userName}</h3>}
      <h3 style={subTitleStyle}>Theme</h3>
      <div style={{ marginLeft: '10px' }}>
        <label style={style}>
          <input type='radio' value='light' checked={selectedOption === 'light'} onChange={handleOptionChange} />
          Light
        </label>
        <label style={{ marginLeft: '10px', ...style }}>
          <input type='radio' value='dark' checked={selectedOption === 'dark'} onChange={handleOptionChange} />
          Dark
        </label>
      </div>
      {isLoggedIn && <button style={signOutButtonStyle} onClick={handleSignout}>Signout</button>}
    </div>
  )
}
