import React from 'react'
import { ref, push, child, update, get } from "firebase/database";
import { database } from './Database/FirebaseAccount';

export default function list(props) {
  const isLoggedIn = JSON.parse(localStorage.getItem('maimaiSongListUser'))
  const userName = isLoggedIn ? isLoggedIn.userName : ""

  const favorites = props.favorites ? JSON.parse(props.favorites) : JSON.parse(localStorage.getItem('songfavorites')) || []
  const tempFavorites = JSON.parse(localStorage.getItem('tempSongFavorites')) || (props.favorites ? JSON.parse(props.favorites) : [])
  const [isFavorite, setIsFavorite] = React.useState(favorites.includes(props.songs.id))


  async function uploadFavorites(updatedFavorites) {
    if (isLoggedIn) {
      const usersRef = ref(database);
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      if (users) {
        const userArr = Object.values(users);
        const user = userArr.find(user => user.userName === userName);

        if (user) {
          const updatedUser = {
            ...user,
            favorites: JSON.stringify(updatedFavorites)
          };

          const userId = Object.keys(users).find(key => users[key].userName === userName);
          const userRef = child(usersRef, userId);
          await update(userRef, updatedUser);

          // Update successful
          // console.log('Favorites updated successfully.')
        } else {
          // User not found
          console.log('User not found.');
        }
      }
    }
  }

  React.useEffect(() => {
    if (isFavorite) {
      const updatedFavorites = isLoggedIn ? [...tempFavorites, props.songs.id] : [...favorites, props.songs.id];
      localOrCloud(updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter(id => id !== props.songs.id)
      localOrCloud(favorites.filter(id => id !== props.songs.id));
    }
  }, [isFavorite])

  function localOrCloud(updatedFavorites) {
    if (isLoggedIn) {
      localStorage.setItem('tempSongFavorites', JSON.stringify(updatedFavorites))
      // console.log(updatedFavorites)
      uploadFavorites(updatedFavorites)
    } else {
      localStorage.setItem('songfavorites', JSON.stringify(updatedFavorites))
    }
  }

  function difficultyStyle(difficulty) {
    if (difficulty === 'Master') {
      return {
        backgroundColor: '#6528F7',
        color: 'white'
      }
    }
    if (difficulty === 'Expert') {
      return {
        backgroundColor: '#F31559',
        color: 'white'
      }
    }
    if (difficulty === 'Re:Master') {
      return {
        backgroundColor: 'white',
        color: '#6528F7',
        boxShadow: '0px 1px 4px rgba(101, 40, 247, 0.4)'
      }
    }
  }

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')
  React.useEffect(() => {
    document.body.classList.toggle('dark', selectedOption === 'dark')
  }, [selectedOption])

  const titleStyle = {
    color: selectedOption === 'dark' ? 'white' : 'black'
  }

  const tagStyle = {
    backgroundColor: selectedOption === 'dark' ? '#6B778D' : 'white',
    color: selectedOption === 'dark' ? 'white' : 'black'
  }

  const standardChartStyle = {
    backgroundColor: '#30A2FF',
    color: 'white',
    fontWeight: '900',
    fontSize: '15px'
  }

  const deluxeChartStyle = {
    fontWeight: '900',
    fontSize: '15px'
  }

  function convertLevel(level) {
    if (level % 1 === 0.5) {
      level -= 0.5
      return `${level}+`
    } else {
      return `${level}`
    }
  }

  return (
    <div>
      <div className='song-title-container'>
        <p className='song-title' style={titleStyle}>{props.songs.title}</p>
        <p className='heart' onClick={() => setIsFavorite(!isFavorite)}>
          {isFavorite ? '♥' : '♡'}
        </p>
      </div>

      <ul>
        <li style={difficultyStyle(props.songs.difficulty)} className='level'>
          {props.songs.difficulty} {convertLevel(props.songs.level)}
        </li>
        {props.songs.chart === 'スタンダード' && <li style={standardChartStyle}>{props.songs.chart}</li>}
        {props.songs.chart === 'でらっくす' && (
          <li style={deluxeChartStyle}>
            <span style={{ color: '#d90429' }}>で</span>
            <span style={{ color: '#fb8500' }}>ら</span>
            <span style={{ color: '#ffb703' }}>っ</span>
            <span style={{ color: '#2a9d8f' }}>く</span>
            <span style={{ color: '#0077b6' }}>す</span>
          </li>
        )}
        {props.songs.youtube && (
          <a href={props.songs.youtube}>
            <li className='youtube-button'>▶</li>
          </a>
        )}
      </ul>
      <ul>
        {props.songs.tags.map((tag) => (
          <li key={tag.id} style={tagStyle}>
            {tag}
          </li>
        ))}
      </ul>
      <hr></hr>
    </div>
  )
}

