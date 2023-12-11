import React from 'react'
import ScrollToTopButton from './ScrollToTop'
import { useLoaderData } from 'react-router-dom'
import { getSongs } from './Database/FirebaseAccount'
import { ref, push, child, update, get } from "firebase/database";
import { database } from './Database/FirebaseAccount';
import { BsTrash3 } from 'react-icons/bs'

export function loader() {
  return getSongs()
}

function getChartType(chartType) {
  if (chartType === 's') {
    return 'スタンダード'
  } else if (chartType === 'd') {
    return 'でらっくす'
  } else {
    return 'Unknown'
  }
}

function convertSongsData(songs) {
  const updatedSongsArray = songs.map((song) => {
    const tagsArray = song.tags.split(',').map((tag) => tag.trim());
    const updatedChart = getChartType(song.chart);

    return {
      ...song,
      tags: tagsArray,
      chart: updatedChart,
    }
  })
  return updatedSongsArray
}

export default function Favorite() {
  const isLoggedIn = JSON.parse(localStorage.getItem('maimaiSongListUser'))
  const useLoader = useLoaderData()
  const songs = convertSongsData(useLoader.songs)
  const realTimeDatabase = useLoader.database
  const userName = isLoggedIn ? isLoggedIn.userName : ""

  // favorites
  const favorites = isLoggedIn ? JSON.parse(realTimeDatabase.favorites) : JSON.parse(localStorage.getItem('songfavorites')) || []
  const [favoriteSongs, setFavoriteSongs] = React.useState(songs.filter((song) => favorites.includes(song.id)))
  const tempFavorites = JSON.parse(localStorage.getItem('tempSongFavorites')) // || (props.favorites ? JSON.parse(props.favorites) : [])

  function unfavoriteSong(id) {
    setFavoriteSongs(prevFavoriteSongs => {
      const updatedFavorites = isLoggedIn ? tempFavorites.filter(songId => songId !== id) :favorites.filter(songId => songId !== id);
      const updatedSongs = prevFavoriteSongs.filter(song => song.id !== id);
      
      if (isLoggedIn) {
        localStorage.setItem('tempSongFavorites', JSON.stringify(updatedFavorites))
        uploadFavorites(updatedFavorites);
      } else {
        localStorage.setItem('songfavorites', JSON.stringify(updatedFavorites));
      }

      return updatedSongs;
    });
  }

  function unfavoriteAll () {
    let result = confirm("Are you sure you want to unfavorite all songs?")

    if (result) {
      setFavoriteSongs(prevFavoriteSongs => {
        if (isLoggedIn) {
          localStorage.setItem('tempSongFavorites', JSON.stringify([]))
          uploadFavorites([]);
        } else {
          localStorage.setItem('songfavorites', JSON.stringify([]))
        }
        return []
      })
    }
  }


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
          }

          const userId = Object.keys(users).find(key => users[key].userName === userName);
          const userRef = child(usersRef, userId);
          await update(userRef, updatedUser);

          // Update successful
          console.log('Favorites updated successfully.');
        } else {
          // User not found
          console.log('User not found.');
        }
      }
    }
  }

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')
  React.useEffect(() => {
    document.body.classList.toggle('dark', selectedOption === 'dark');
    document.title = "Favorites"
  }, []);

  const titleStyle = {
    color: selectedOption === 'dark' ? 'white' : 'black'
  }

  const tagStyle = {
    backgroundColor: selectedOption === 'dark' ? '#6B778D' : 'white',
    color: selectedOption === 'dark' ? 'white' : 'black'
  }

  // styling

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

  const bsTrashStyle ={ 
    marginTop: '27px',
    fontSize: '22px',
    cursor: 'pointer'
  }

  // conversion

  function convertLevel(level) {
    if (level % 1 === 0.5) {
      level -= 0.5
      return `${level}+`
    } else {
      return `${level}`
    }
  }

  return (
    <div className='favorite-container'>
      <div className="favorite-title-container">
        <h2 style={titleStyle}>Favorite Songs ({favoriteSongs.length})</h2>
        <BsTrash3 style={{...titleStyle, ...bsTrashStyle}} onClick={unfavoriteAll}/>
      </div>
      {!isLoggedIn && <p style={{...titleStyle, marginLeft: '10px'}}>You can save your favorites and access in different devices by registering an account</p>}
      <div className='song-list'>
        {favoriteSongs.length === 0 ? (
          <p style={{ textAlign: 'center', ...titleStyle }}>No favorite songs yet...</p>
        ) : (
          favoriteSongs.map((song) => (
            // <List key={song.id} songs={song} />
            <div>
              <div className='song-title-container'>
                <p className='song-title' style={titleStyle}>{song.title}</p>
                <p className='heart' onClick={() => unfavoriteSong(song.id)}>
                  ♥
                </p>
              </div>
              <ul>
                <li style={difficultyStyle(song.difficulty)} className='level'>
                  {song.difficulty} {convertLevel(song.level)}
                </li>
                {song.chart === 'スタンダード' && <li style={standardChartStyle}>{song.chart}</li>}
                {song.chart === 'でらっくす' && (
                  <li style={deluxeChartStyle}>
                    <span style={{ color: '#d90429' }}>で</span>
                    <span style={{ color: '#fb8500' }}>ら</span>
                    <span style={{ color: '#ffb703' }}>っ</span>
                    <span style={{ color: '#2a9d8f' }}>く</span>
                    <span style={{ color: '#0077b6' }}>す</span>
                  </li>
                )}
                {song.youtube && (
                  <a href={song.youtube}>
                    <li className='youtube-button'>▶</li>
                  </a>
                )}
              </ul>
              <ul>
                {song.tags.map((tag) => (
                  <li style={tagStyle}>{tag}</li>
                ))}
              </ul>
              <hr></hr>
            </div>
          ))
        )}
      </div>
      <ScrollToTopButton />
    </div>
  )
}