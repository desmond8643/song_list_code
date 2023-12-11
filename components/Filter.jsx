import React from 'react'
import List from './List'
import ScrollToTopButton from '../components/ScrollToTop'
import { useLoaderData } from 'react-router-dom'
import { getSongs } from './Database/FirebaseAccount'

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

export default function Filter() {
  const useLoader = useLoaderData()
  const songs = convertSongsData(useLoader.songs)
  const realTimeDatabase = useLoader.database

  const [expandFilter, setExpandFilter] = React.useState(false)
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('')
  const [selectedTags, setSelectedTags] = React.useState([])
  const [selectedLevels, setSelectedLevels] = React.useState([])

  const difficulties = [...new Set(songs.map((song) => song.difficulty))]

  const tagsArray = [...new Set(songs.map((song) => song.tags))]
  const flattenTagsArray = [].concat(...tagsArray)
  const tags = flattenTagsArray.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  const levels = [...new Set(songs.map((song) => song.level))]
  levels.sort((a, b) => a - b)

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')
  React.useEffect(() => {
    document.body.classList.toggle('dark', selectedOption === 'dark')
    document.title = "Song List"
  }, [])


   const paragraphStyle = {
    marginLeft: '10px',
    color: selectedOption === 'dark' ? 'white' : 'black',
   }

  const optionStyle = {
    backgroundColor: selectedOption === 'dark' ? '#263859' : '#FFFDF8',
    color: selectedOption === 'dark' ? 'white' : 'black',
    borderColor: selectedOption === 'dark' ? '#263859' : 'white'
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

  function filterStyle(option) {
    if (selectedOption === 'light') {
      return {
        backgroundColor: option ? '#322653' : 'white',
        color: option ? 'white' : 'black'
      }
    }
    if (selectedOption === 'dark') {
      return {
        backgroundColor: option ? 'white' : '#6B778D',
        color: option ? 'black' : 'white'
      }
    }
  }

  function createDifficulties() {
    return difficulties.map((difficulty) => (
      <li
        className='cursor'
        key={difficulty}
        style={difficultyStyle(difficulty)}
        onClick={() => {
          if (selectedDifficulty === difficulty) {
            setSelectedDifficulty('')
          } else {
            setSelectedDifficulty(difficulty)
          }
        }}
      >
        {difficulty}
      </li>
    ))
  }

  function createTags() {
    return tags.map((tag) => (
      <li
        className='cursor'
        key={tag}
        onClick={() => {
          setSelectedTags((prevState) => {
            if (prevState.includes(tag)) {
              return prevState.filter((otherTag) => otherTag !== tag)
            } else {
              return [...prevState, tag]
            }
          })
        }}
        style={filterStyle(selectedTags.includes(tag))}
      >
        {tag}
      </li>
    ))
  }

  function createLevels() {
    return levels.map((level) => (
      <li
        style={filterStyle(selectedLevels.includes(level))}
        className='level-options cursor'
        key={level}
        onClick={() => {
          setSelectedLevels((prevState) => {
            if (prevState.includes(level)) {
              return prevState.filter((otherLevel) => otherLevel !== level)
            } else {
              return [...prevState, level]
            }
          })
        }}
      >
        {convertLevel(level)}
      </li>
    ))
  }

  function convertLevel(level) {
    if (level % 1 === 0.5) {
      level -= 0.5
      return `${level}+`
    } else {
      return `${level}`
    }
  }

  function filteredSongs() {
    if (selectedDifficulty === '' && selectedTags.length === 0 && selectedLevels.length === 0) {
      return songs
    } else {
      return songs.filter((song) => {
        let result = true
        if (selectedDifficulty !== '') {
          result = result && song.difficulty === selectedDifficulty
        }
        if (selectedTags.length > 0) {
          result = result && selectedTags.every((tag) => song.tags.includes(tag))
        }
        if (selectedLevels.length > 0) {
          result = result && selectedLevels.includes(song.level)
        }
        return result
      })
    }
  }


  return (
    <div className='filter-container'>
      <button className='filter-button' onClick={() => setExpandFilter(!expandFilter)}>
        Filter
      </button>
      {expandFilter && (
        <div className='filter-options' style={optionStyle}>
          <p className='option-title'>Difficulties</p>
          <ul className='difficulty'>{createDifficulties()}</ul>
          <p className='option-title'>Level</p>
          <ul className='filter-tag'>{createLevels()}</ul>
          <p className='option-title'>Tags</p>
          <ul className='filter-tag'>{createTags()}</ul>
          <p className='result-title'>{filteredSongs().length} results</p>
        </div>
      )}
      <div className='song-list'>
        {filteredSongs().map((song) => (
          <List
            key={song.id}
            songs={song}
            selectedDifficulty={selectedDifficulty}
            favorites={realTimeDatabase.favorites}
          />
        ))}
      </div>
      <ScrollToTopButton />
    </div>
  )
}
