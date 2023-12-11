import React from "react"
import songs from "./songs"
import { useLoaderData } from "react-router-dom"
import { getSongs } from "./Database/FirebaseAccount"
import { ref, push, child, update, get } from "firebase/database"
import { database } from "./Database/FirebaseAccount"

export function loader() {
  return getSongs()
}

function convertSongsData(songs) {
  const updatedSongsArray = songs.map((song) => {
    const tagsArray = song.tags.split(",").map((tag) => tag.trim())
    const updatedChart = getChartType(song.chart)

    return {
      ...song,
      tags: tagsArray,
      chart: updatedChart,
    }
  })
  return updatedSongsArray
}
function getChartType(chartType) {
  if (chartType === "s") {
    return "スタンダード"
  } else if (chartType === "d") {
    return "でらっくす"
  } else {
    return "Unknown"
  }
}

export default function DeluxeScore() {
  const isLoggedIn = JSON.parse(localStorage.getItem("maimaiSongListUser"))
  const useLoader = useLoaderData()
  const songs = convertSongsData(useLoader.songs)
  const realTimeDatabase = useLoader.database
  const userName = isLoggedIn ? isLoggedIn.userName : ""

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Deluxe Score"
  }, [selectedOption])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const localStorageFavorites = isLoggedIn
    ? JSON.parse(realTimeDatabase.favorites)
    : JSON.parse(localStorage.getItem("songfavorites")) || []

  const favorites = localStorageFavorites.map((id) => {
    const song = songs.find((song) => song.id === id)
    return song ? `${song.title} (${song.difficulty} ${song.chart})` : null
  })
  const uniqueFavorites = [...new Set(favorites)]
  const [options] = React.useState([
    "Select a song from favorites",
    ...uniqueFavorites,
  ])
  const [selectedDxScore, setSelectedDxScore] = React.useState("")

  // Get dxscore of the selected song
  const handleSelectChange = (event) => {
    const index = event.target.selectedIndex - 1
    const selectedSong = songs.find(
      (song) => song.id === localStorageFavorites[index]
    )
    const dxscore = selectedSong ? selectedSong.dxscore : null
    setSelectedDxScore(dxscore)
  }

  function calculateDxScore(score, star) {
    const percentage = {
      6: 0.99,
      5: 0.97,
      4: 0.95,
      3: 0.93,
      2: 0.9,
      1: 0.85,
    }
    const targetScore = Math.floor(score * percentage[star])
    return `${targetScore}/${score} (-${score - targetScore})`
  }

  return (
    <div className="dxscore-container">
      <h2 style={titleStyle}>Deluxe Score</h2>
      <table>
        <tr>
          <th style={{ color: "#E8AA42" }}>✦✦✦✦✦✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 6)
              : "でらくっすスコア * 99%"}
          </th>
        </tr>
        <tr>
          <th style={{ color: "#E8AA42" }}>✦✦✦✦✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 5)
              : "でらくっすスコア * 97%"}
          </th>
        </tr>
        <tr>
          <th style={{ color: "#CD1818" }}>✦✦✦✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 4)
              : "でらくっすスコア * 95%"}
          </th>
        </tr>
        <tr>
          <th style={{ color: "#CD1818" }}>✦✦✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 3)
              : "でらくっすスコア * 93%"}
          </th>
        </tr>
        <tr>
          <th style={{ color: "#5B9A8B" }}>✦✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 2)
              : "でらくっすスコア * 90%"}
          </th>
        </tr>
        <tr>
          <th style={{ color: "#5B9A8B" }}>✦</th>
          <th style={titleStyle}>
            {selectedDxScore
              ? calculateDxScore(selectedDxScore, 1)
              : "でらくっすスコア * 85%"}
          </th>
        </tr>
      </table>
      <select onChange={handleSelectChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
