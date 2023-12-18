import React from "react"
import { useLoaderData } from "react-router-dom"
import { fetchFestivalPlusData } from "./Server/fetchBackend"
import { fetchChartsData } from "./Server/fetchBackend"
import { fetchSongsData } from "./Server/fetchBackend"
import { fetchBuddiesData } from "./Server/fetchBackend"
import { BsXLg, BsFunnel } from "react-icons/bs"

export async function loader() {
  const songsPromise = await fetchSongsData()
  const chartDataPromise = await fetchChartsData()
  const festivalPlusChartLevelsPromise = await fetchFestivalPlusData()
  const buddiesChartLevelPromise = await fetchBuddiesData()
  return {
    songs: songsPromise,
    chartData: chartDataPromise,
    festivalPlusChartLevels: festivalPlusChartLevelsPromise,
    buddiesChartLevels: buddiesChartLevelPromise,
  }
}

export default function Rating() {
  const useLoader = useLoaderData()

  const charts = useLoader.songs
  const chartData = useLoader.chartData
  const festivalPlusChartLevels = useLoader.festivalPlusChartLevels
  const buddiesChartLevels = useLoader.buddiesChartLevels

  const currentVersionId = []

  const versionList = {
    Maimai: 1,
    Plus: 2,
    Green: 3,
    "Green+": 4,
    Orange: 5,
    "Orange+": 6,
    Pink: 7,
    "Pink+": 8,
    Murasaki: 9,
    "Murasaki+": 10,
    Milk: 11,
    "Milk+": 12,
    Finale: 13,
    Deluxe: 14,
    "Deluxe+": 15,
    Splash: 16,
    "Splash+": 17,
    Universe: 18,
    "Universe+": 19,
    Festival: 20,
    "Festival+": 21,
    Buddies: 22,
  }

  const [options] = React.useState(["Festival+", "Buddies"])
  const [version, setVersion] = React.useState("Festival+")

  let chartLevels = []
  if (version === "Festival+") {
    addChartData(festivalPlusChartLevels)
    chartLevels = festivalPlusChartLevels
  } else if (version === "Buddies") {
    addChartData(buddiesChartLevels)
    chartLevels = buddiesChartLevels
  }

  const filteredMasterCharts = chartLevels.filter(
    (chart) => chart.level[3] != 0
  )

  const masterCharts = filteredMasterCharts.map((chart) => {
    return {
      ...chart,
      _id: chart._id + "1",
      level: chart.level[3],
      difficulty: "Master",
    }
  })

  const filteredRemasterCharts = chartLevels.filter(
    (chart) => chart.level[4] != 0
  )
  const remasterCharts = filteredRemasterCharts.map((chart) => {
    return {
      ...chart,
      _id: chart._id + "2",
      level: chart.level[4],
      difficulty: "Re:Master",
    }
  })

  chartLevels = masterCharts.concat(remasterCharts)

  const handleSelectChange = (event) => {
    setVersion(event.target.value)
    setSelectedNewVersionSongs([])
    setSelectedOldVersionSongs([])
  }

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Rating"
  }, [])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  function thumbnailStyle(difficulty) {
    return {
      width: "70px",
      height: "70px",
      borderRadius: "15px",
      marginTop: "10px",
      cursor: "pointer",
      userSelect: "none",
      border: difficulty === "Re:Master" ? "7px solid #BEADFA" : "none",
    }
  }

  const deleteButtonStyle = {
    color: "red",
    cursor: "pointer",
  }

  const filterButtonStyle = {
    marginLeft: "10px",
    backgroundColor: "#8062D6",
    borderRadius: "10px",
    border: "none",
    padding: "10px 10px 6px 10px",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  }

  function tableDifficultyStyle(difficulty) {
    if (difficulty === "Re:Master") {
      return {
        color: "#BEADFA",
      }
    }
  }

  const [selectedNewVersionSongs, setSelectedNewVersionSongs] = React.useState(
    []
  )
  const [selectedOldVersionSongs, setSelectedOldVersionSongs] = React.useState(
    []
  )

  const [showOldSortedThumbnails, setOldShowSortedThumbnails] =
    React.useState(false)

  const [showNewSortedThumbnails, setNewShowSortedThumbnails] =
    React.useState(false)

  function addChartData(chartLevels) {
    for (let i = 0; i < chartLevels.length; i++) {
      currentVersionId.push(chartLevels[i]._id)
    }
    const currentVersionChartData = chartData.filter((chart) =>
      currentVersionId.includes(chart._id)
    )
    chartLevels.forEach((chart) => {
      const getChartData = currentVersionChartData.filter(
        (chartData) => chartData._id === chart._id
      )[0]
      chart.version_released = getChartData.version_released
      chart.chart = getChartData.chart
    })
  }

  function getImageUrl(id) {
    return new URL(`../src/images/thumbnails/${id}.png`, import.meta.url).href
  }

  function renderNewSongs(version) {
    const filteredCharts = chartLevels.filter(
      (chart) => chart.version_released === version && chart.level >= 13.7
    )

    return renderChartThumbnails(
      filteredCharts,
      selectedNewVersionSongs,
      addChartToNewTable
    )
  }

  function renderOldSongs(version) {
    const filteredCharts = chartLevels.filter(
      (chart) =>
        versionList[chart.version_released] < versionList[version] &&
        chart.level >= 14.6
    )

    return renderChartThumbnails(
      filteredCharts,
      selectedOldVersionSongs,
      addChartToOldTable
    )
  }

  function renderChartThumbnails(chartLevels, selectedSongs, addChartToTable) {
    return chartLevels.map((chartLevel) => {
      const isSelected = selectedSongs.some(
        (song) => song._id === chartLevel._id
      )

      if (isSelected) {
        return null
      }

      return (
        <img
          key={chartLevel._id}
          src={getImageUrl(chartLevel.chart_id)}
          style={thumbnailStyle(chartLevel.difficulty)}
          onClick={() => addChartToTable(chartLevel._id)}
        />
      )
    })
  }

  function renderOldSortedChartThumbnails(version) {
    const filteredCharts = chartLevels.filter(
      (chart) => versionList[chart.version_released] < versionList[version]
    )

    const sortedCharts = filteredCharts.sort((a, b) => b.level - a.level)
    const levels = filteredCharts.map((chart) => chart.level)
    const uniqueLevels = [...new Set(levels)]
    const sortedLevels = uniqueLevels.sort((a, b) => b - a)

    return sortedLevels.map((level) => {
      let count = 0
      const charts = sortedCharts.map((chart) => {
        const isSelected = selectedOldVersionSongs.some(
          (song) => song._id === chart._id
        )
        if (!isSelected && chart.level === level) {
          count++
          return (
            <img
              key={chart._id}
              src={getImageUrl(chart.chart_id)}
              style={thumbnailStyle(chart.difficulty)}
              onClick={() => addChartToOldTable(chart._id)}
            />
          )
        }
      })
      if (count) {
        return (
          <div>
            <h2 style={titleStyle}>{level % 1 === 0 ? `${level}.0` : level}</h2>
            <div className="rating-old-song-container">{charts}</div>
          </div>
        )
      }
    })
  }

  function renderNewSortedChartThumbnails(version) {
    const filteredCharts = chartLevels.filter(
      (chart) => chart.version_released == version && chart.level >= 13.7
    )

    const sortedCharts = filteredCharts.sort((a, b) => b.level - a.level)
    const levels = filteredCharts.map((chart) => chart.level)
    const uniqueLevels = [...new Set(levels)]
    const sortedLevels = uniqueLevels.sort((a, b) => b - a)

    return sortedLevels.map((level) => {
      let count = 0
      const charts = sortedCharts.map((chart) => {
        const isSelected = selectedNewVersionSongs.some(
          (song) => song._id === chart._id
        )
        if (!isSelected && chart.level === level) {
          count++
          return (
            <img
              key={chart.id}
              src={getImageUrl(chart.chart_id)}
              style={thumbnailStyle(chart.difficulty)}
              onClick={() => addChartToNewTable(chart._id)}
            />
          )
        }
      })
      if (count) {
        return (
          <div>
            <h2 style={titleStyle}>{level % 1 === 0 ? `${level}.0` : level}</h2>
            <div className="rating-new-song-container">{charts}</div>
          </div>
        )
      }
    })
  }

  function deleteChartFromNewTable(index) {
    setSelectedNewVersionSongs((prevSongs) => {
      const updatedSongs = [...prevSongs]
      updatedSongs.splice(index, 1)
      return updatedSongs
    })
  }

  function deleteChartFromOldTable(index) {
    setSelectedOldVersionSongs((prevSongs) => {
      const updatedSongs = [...prevSongs]
      updatedSongs.splice(index, 1)
      return updatedSongs
    })
  }

  function addChartToTable(
    chartLevelId,
    selectedVersionSongs,
    setSelectedVersionSongs,
    maxSongs
  ) {
    if (!selectedVersionSongs.some((song) => song.id === chartLevelId)) {
      const chartLevel = chartLevels.find((chart) => chart._id === chartLevelId)
      if (selectedVersionSongs.length < maxSongs) {
        setSelectedVersionSongs((prevSongs) => [...prevSongs, chartLevel])
      } else {
        const lowestLevelSongs = selectedVersionSongs.reduce((prev, curr) =>
          prev.level < curr.level ? prev : curr
        )

        if (chartLevel.level > lowestLevelSongs.level) {
          setSelectedVersionSongs((prevSongs) => {
            const updatedSongs = prevSongs.filter(
              (song) => song.id !== lowestLevelSongs.id
            )
            return [...updatedSongs, chartLevel]
          })
        }
      }
    }
  }

  function addChartToNewTable(chartLevelId) {
    addChartToTable(
      chartLevelId,
      selectedNewVersionSongs,
      setSelectedNewVersionSongs,
      15
    )
  }

  function addChartToOldTable(chartLevelId) {
    addChartToTable(
      chartLevelId,
      selectedOldVersionSongs,
      setSelectedOldVersionSongs,
      35
    )
  }

  function calculateRating(level) {
    return Math.floor(22.512 * level)
  }

  function calculateTotalRating(selectedVersionSong) {
    return selectedVersionSong.reduce(
      (totalRating, song) => totalRating + Math.floor(song.level * 22.512),
      0
    )
  }

  function renderChartList(songs, i, deleteChartFromTable) {
    const song = songs[i - 1]
    if (song) {
      const getTitleObj = charts.find((chart) => chart._id === song.chart_id)
      const title = getTitleObj.title
      const difficulty = song.difficulty
      const level = song.level

      return (
        <tr key={i}>
          <th>{i}</th>
          <th style={tableDifficultyStyle(difficulty)}>{title}</th>
          <th>{level}</th>
          <th style={{ color: "#F94C10" }}>{calculateRating(level)}</th>
          <th>
            <BsXLg
              style={deleteButtonStyle}
              onClick={() => deleteChartFromTable(i - 1)}
            />
          </th>
        </tr>
      )
    }
  }

  function renderNewChartList(i) {
    return renderChartList(sortedNewSongs, i, deleteChartFromNewTable)
  }
  function renderOldChartList(i) {
    return renderChartList(sortedOldSongs, i, deleteChartFromOldTable)
  }

  const sortedNewSongs = React.useMemo(() => {
    return selectedNewVersionSongs.sort((a, b) => b.level - a.level)
  }, [selectedNewVersionSongs])

  const sortedOldSongs = React.useMemo(() => {
    return selectedOldVersionSongs.sort((a, b) => b.level - a.level)
  }, [selectedOldVersionSongs])

  return (
    <div className="rating-container">
      <h2 style={{ ...titleStyle, marginLeft: "10px" }}>
        Theoretical Rating Calculator
      </h2>
      <select
        style={{ marginLeft: "10px" }}
        onChange={handleSelectChange}
        defaultValue="Festival+"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <h3 style={titleStyle}>
        Total Rating:{" "}
        {calculateTotalRating(selectedNewVersionSongs) +
          calculateTotalRating(selectedOldVersionSongs)}
      </h3>
      <div style={{ marginTop: "40px" }}>
        <h2 style={titleStyle}>Best 15 (new version)</h2>
        <h3 style={titleStyle}>
          Best 15 total: {calculateTotalRating(selectedNewVersionSongs)}
        </h3>
        {selectedNewVersionSongs.length > 0 && (
          <button
            style={{
              marginLeft: "10px",
              borderStyle: "none",
              padding: "7px 10px",
              borderRadius: "10px",
            }}
            onClick={() => setSelectedNewVersionSongs([])}
          >
            Clear all
          </button>
        )}
        <table
          className="rating-table"
          style={{ margin: "10px 10px 10px 10px", ...titleStyle }}
        >
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Title</th>
              <th>Level</th>
              <th style={{ color: "#F94C10" }}>Rating</th>
              <th></th>
            </tr>
            {sortedNewSongs.map((song, index) => renderNewChartList(index + 1))}
          </tbody>
        </table>
        {selectedNewVersionSongs.length === 0 && (
          <h3 style={{ textAlign: "center", ...titleStyle }}>
            Add songs to table
          </h3>
        )}
        <button
          style={filterButtonStyle}
          onClick={() => setNewShowSortedThumbnails((prevState) => !prevState)}
        >
          <BsFunnel />
        </button>
        <div>
          {showNewSortedThumbnails && renderNewSortedChartThumbnails(version)}
        </div>
        {!showNewSortedThumbnails && (
          <div className="rating-new-song-container">
            {renderNewSongs(version)}
          </div>
        )}
      </div>

      <div style={{ marginTop: "60px" }}>
        <h2 style={titleStyle}>Best 35 (old version)</h2>
        <h3 style={titleStyle}>
          Best 35 total: {calculateTotalRating(selectedOldVersionSongs)}
        </h3>
        {selectedOldVersionSongs.length > 0 && (
          <button
            style={{
              marginLeft: "10px",
              borderStyle: "none",
              padding: "7px 10px",
              borderRadius: "10px",
            }}
            onClick={() => setSelectedOldVersionSongs([])}
          >
            Clear all
          </button>
        )}
        <table
          className="rating-table"
          style={{ margin: "10px 10px 10px 10px", ...titleStyle }}
        >
          <tbody>
            <tr style={{ textAlign: "left" }}>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Title</th>
              <th>Level</th>
              <th style={{ color: "#F94C10" }}>Rating</th>
              <th></th>
            </tr>
            {sortedOldSongs.map((song, index) => renderOldChartList(index + 1))}
          </tbody>
        </table>
        {selectedOldVersionSongs.length === 0 && (
          <h3 style={{ textAlign: "center", ...titleStyle }}>
            Add songs to table
          </h3>
        )}
        <button
          style={filterButtonStyle}
          onClick={() => setOldShowSortedThumbnails((prevState) => !prevState)}
        >
          <BsFunnel />
        </button>
        <div>
          {showOldSortedThumbnails && renderOldSortedChartThumbnails(version)}
        </div>
        <div className="rating-old-song-container">
          {!showOldSortedThumbnails && renderOldSongs(version)}
        </div>
      </div>
      
    </div>
  )
}

/* Debug
  // Step 2: Create a set with id values from array1
  const set1 = new Set(useLoader.charts.map((obj) => obj.id))

  // Step 3: Create a set with chart_id values from array2
  const set2 = new Set(useLoader.chartLevels.map((obj) => obj.chart_id))

  // Step 4: Find unique values
  const unique1 = [...set1].filter((id) => !set2.has(id)) // Unique values in array1
  const unique2 = [...set2].filter((id) => !set1.has(id)) // Unique values in array2

  // Step 5: Retrieve the unique variables
  const uniqueVariables = unique1.concat(unique2)

  console.log(uniqueVariables)
*/

// function renderNewSongs(version) {
//   const filteredCharts = chartLevels.filter(
//     (chart) => chart.version_released === version
//   )

//   return filteredCharts.map((chartLevel) => {
//     const isSelected = selectedNewVersionSongs.some(
//       (song) => song.id === chartLevel.id
//     )

//     if (isSelected) {
//       return null
//     }

//     return (
//       <img
//         key={chartLevel.id}
//         src={getImageUrl(chartLevel.chart_id)}
//         style={thumbnailStyle(chartLevel.difficulty)}
//         onClick={() => addChartToNewTable(chartLevel.id)}
//       />
//     )
//   })
// }

// function renderOldSongs(version) {
//   const filteredCharts = chartLevels.filter(
//     (chart) => chart.version_released !== version
//   )
//   return filteredCharts.map((chartLevel) => {
//     const isSelected = selectedOldVersionSongs.some(
//       (song) => song.id === chartLevel.id
//     )

//     if (isSelected) {
//       return null
//     }

//     return (
//       <img
//         key={chartLevel.id}
//         src={getImageUrl(chartLevel.chart_id)}
//         style={thumbnailStyle(chartLevel.difficulty)}
//         onClick={() => addChartToOldTable(chartLevel.id)}
//       />
//     )
//   })
// }

// function renderNewChartList(i) {
//   const song = selectedNewVersionSongs[i - 1]

//   if (song) {
//     const chartLevelId = song.id
//     const getChartLevelObj = chartLevels.find(
//       (chartLevel) => chartLevel.id === chartLevelId
//     )
//     const getChartId = getChartLevelObj.chart_id
//     const getChartObj = charts.find((chart) => chart.id === getChartId)
//     const title = getChartObj.title
//     const level = getChartLevelObj.level
//     const difficulty = getChartLevelObj.difficulty

//     return (
//       <tr key={i}>
//         <th>{i}</th>
//         <th style={tableDifficultyStyle(difficulty)}>{title}</th>
//         <th>{level}</th>
//         <th style={{ color: "#F94C10" }}>{calculateRating(level)}</th>
//         <th>
//           <BsXLg
//             style={deleteButtonStyle}
//             onClick={() => deleteChartFromNewTable(i - 1)}
//           />
//         </th>
//       </tr>
//     )
//   }
// }

// function renderOldChartList(i) {
//   const song = selectedOldVersionSongs[i - 1]

//   if (song) {
//     const chartLevelId = song.id
//     const getChartLevelObj = chartLevels.find(
//       (chartLevel) => chartLevel.id === chartLevelId
//     )
//     const getChartId = getChartLevelObj.chart_id
//     const getChartObj = charts.find((chart) => chart.id === getChartId)
//     const title = getChartObj.title
//     const level = getChartLevelObj.level
//     const difficulty = getChartLevelObj.difficulty

//     return (
//       <tr key={i}>
//         <th>{i}</th>
//         <th style={tableDifficultyStyle(difficulty)}>{title}</th>
//         <th>{level}</th>
//         <th style={{ color: "#F94C10" }}>{calculateRating(level)}</th>
//         <th>
//           <BsXLg
//             style={deleteButtonStyle}
//             onClick={() => deleteChartFromOldTable(i - 1)}
//           />
//         </th>
//       </tr>
//     )
//   }
// }

// let totalRating = 0
// for (let i = 0; i < selectedVersionSong.length; i++) {
//   const rating = Math.floor(selectedVersionSong[i].level * 22.512)
//   totalRating += rating
// }
// return totalRating

// function addChartToNewTable(chartLevelId) {
//   if (!selectedNewVersionSongs.some((song) => song.id === chartLevelId)) {
//     const chartLevel = chartLevels.find((chart) => chart.id === chartLevelId)

//     if (selectedNewVersionSongs.length < 15) {
//       setSelectedNewVersionSongs((prevSongs) => [...prevSongs, chartLevel])
//     } else {
//       const lowestLevelSong = selectedNewVersionSongs.reduce((prev, curr) =>
//         prev.level < curr.level ? prev : curr
//       )

//       if (chartLevel.level > lowestLevelSong.level) {
//         setSelectedNewVersionSongs((prevSongs) => {
//           const updatedSongs = prevSongs.filter(
//             (song) => song.id !== lowestLevelSong.id
//           )
//           return [...updatedSongs, chartLevel]
//         })
//       }
//     }
//   }
// }

// function addChartToOldTable(chartLevelId) {
//   if (!selectedOldVersionSongs.some((song) => song.id === chartLevelId)) {
//     const chartLevel = chartLevels.find((chart) => chart.id === chartLevelId)

//     if (selectedOldVersionSongs.length < 35) {
//       setSelectedOldVersionSongs((prevSongs) => [...prevSongs, chartLevel])
//     } else {
//       const lowestLevelSong = selectedOldVersionSongs.reduce((prev, curr) =>
//         prev.level < curr.level ? prev : curr
//       )

//       if (chartLevel.level > lowestLevelSong.level) {
//         setSelectedOldVersionSongs((prevSongs) => {
//           const updatedSongs = prevSongs.filter(
//             (song) => song.id !== lowestLevelSong.id
//           )
//           return [...updatedSongs, chartLevel]
//         })
//       }
//     }
//   }
// }
