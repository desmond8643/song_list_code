import React from "react"
import { BsFillClipboardFill, BsYoutube, BsFunnel } from "react-icons/bs"
import { useLoaderData, useSearchParams, Link, defer } from "react-router-dom"
import { fetchFestivalPlusData } from "./Server/fetchBackend"
import { fetchBuddiesData } from "./Server/fetchBackend"
import { fetchChartsData } from "./Server/fetchBackend"
import { fetchSongsData } from "./Server/fetchBackend"
import ScrollToTopButton from "./ScrollToTop"

export async function loader() {
  const chartsPromise = await fetchSongsData()
  const chartLevelsPromise = await fetchBuddiesData()
  const chartDataPromise = await fetchChartsData()
  return {
    songs: chartsPromise,
    chartLevels: chartLevelsPromise,
    chartData: chartDataPromise,
  }
}
export default function NewList() {
  const songData = useLoaderData().songs
  const chartLevelData = useLoaderData().chartLevels
  const chartData = useLoaderData().chartData

  const currentVersionId = []
  for (let i = 0; i < chartLevelData.length; i++) {
    currentVersionId.push(chartLevelData[i]._id)
  }

  const currentVersionChartData = chartData.filter((chart) =>
    currentVersionId.includes(chart._id)
  )

  const [youtubeVisible, setYoutubeVisible] = React.useState([])

  const [versionF, setVersionF] = React.useState(null)

  const [youtubeUrl, setYoutubeUrl] = React.useState({})

  chartLevelData.forEach((chart) => {
    const getChartData = currentVersionChartData.filter(
      (chartData) => chartData._id === chart._id
    )[0]
    if (getChartData.youtube) {
      chart.youtube = getChartData.youtube
    }
    chart.version_released = getChartData.version_released
    chart.chart = getChartData.chart
  })

  const sortedReMasterChartLevelData = sortChartLevelData(4)
  const sortedMasterChartLevelData = sortChartLevelData(3)

  const sortedChartLevelData = sortedReMasterChartLevelData.concat(sortedMasterChartLevelData)

  const sortedSongData = []
  sortedChartLevelData.forEach((chart) => {
    const getSong = songData.find((song) => song._id === chart.chart_id)
    sortedSongData.push(getSong)
  })

  function sortChartLevelData(index) {
    const sortedChartLevelData = []
    chartLevelData.forEach((chart) => {
      if (index === 4 && chart.level[index]) {
        sortedChartLevelData.push(chart)
      }
      if (index === 3 && chart.level[index] && !chart.level[4]) {
        sortedChartLevelData.push(chart)
      }
    })
    sortedChartLevelData.sort((a, b) => b.level[index] - a.level[index])
    return sortedChartLevelData
  }

  const filteredChartData = sortedChartLevelData.filter((chart) => {
    if (versionF) {
      const selectedVersions = versionF.split(",")
      if (!selectedVersions.includes(chart.version_released)) {
        return false
      }
    }
    return true
  })

  function handleVersionFilter(stringifyVersion) {
    if (stringifyVersion === versionF) {
      setVersionF(null)
    } else {
      setVersionF(stringifyVersion)
    }
  }

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "dark"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Browse Songs"
  }, [])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const generalStyle = {
    marginLeft: "10px",
  }

  function versionBackgroundColor(version) {
    if (version === "Festival" || version === "Festival+") {
      return {
        backgroundColor: "#B15EFF",
      }
    }
    if (version === "Finale") {
      return {
        backgroundColor: "#0802A3",
      }
    }
    if (version === "Deluxe" || version === "Deluxe+") {
      return {
        backgroundColor: "#00A9FF",
      }
    }
    if (version === "Milk" || version === "Milk+") {
      return {
        backgroundColor: "#C2D9FF",
      }
    }
    if (version === "Murasaki" || version === "Murasaki+") {
      return {
        backgroundColor: "#9A208C",
      }
    }
    if (version === "Pink" || version === "Pink+") {
      return {
        backgroundColor: "#FF4B91",
      }
    }
    if (version === "Orange" || version === "Orange+") {
      return {
        backgroundColor: "#ED7D31",
      }
    }
    if (version === "Green" || version === "Green+") {
      return {
        backgroundColor: "#004225",
      }
    }
    if (version === "Maimai" || version === "Plus") {
      return {
        backgroundColor: "#9A3B3B",
      }
    }
    if (version === "Splash" || version === "Splash+") {
      return {
        backgroundColor: "#27E1C1",
      }
    }
    if (version === "Universe" || version === "Universe+") {
      return {
        backgroundColor: "#2F58CD",
      }
    }
    if (version === "Buddies") {
      return {
        backgroundColor: "#FB8B24",
        color: "#0F2167",
      }
    }
  }

  function copyTitle(title) {
    navigator.clipboard
      .writeText(title)
      .then(() => {
        confirm("Copied!")
      })
      .catch((error) => {
        confirm("Failed to copy content to clipboard:", error)
      })
  }

  const versionStyle = {
    fontSize: "12px",
    borderRadius: "10px",
    padding: "6px",
    color: "white",
    margin: "0",
    fontWeight: "600",
    marginBottom: "10px",
    userSelect: "none",
  }

  const levelBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    height: "47px",
    color: "white",
    fontWeight: "800",
    borderRadius: "10px",
  }

  const remasterLevelBoxStyle = {
    border: "solid 4px #a051dc",
    width: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "49px",
    color: "#a051dc",
    fontWeight: "800",
    backgroundColor: "white",
    borderRadius: "10px",
  }

  const standardBoxStyle = {
    display: "flex",
    justifyContent: "center",
    listStyleType: "none",
    backgroundColor: "#30A2FF",
    borderRadius: "10px",
    padding: "5px",
    width: "106px",
    userSelect: "none",
    fontSize: "12px",
  }

  const deluxeBoxStyle = {
    display: "flex",
    justifyContent: "center",
    listStyleType: "none",
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "5px",
    width: "106px",
    fontSize: "15px",
    userSelect: "none",
  }

  const filterButtonStyle = {
    backgroundColor: "#8062D6",
    borderRadius: "10px",
    border: "none",
    padding: "10px 10px 6px 10px",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
    marginBottom: "10px",
  }

  const resetButtonStyle = {
    borderRadius: "17px",
    border: "none",
    backgroundColor: "#8062D6",
    color: "white",
    padding: "10px 10px 10px 10px",
    fontWeight: "600",
    cursor: "pointer",
  }

  const youtubeUrlStyle = {
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    borderRadius: "10px",
    width: "fit-content",
    paddingRight: "1.5%",
    paddingLeft: "1.5%",
    paddingBottom: "2px",
    paddingTop: "2px",
    margin: "0",
    margin: "0px 10px 10px 10px",
  }

  function youtubeUrlBackgroundColor(difficulty) {
    if (difficulty === "Expert") {
      return {
        backgroundColor: "#ff828d",
      }
    }
    if (difficulty === "Master") {
      return {
        backgroundColor: "#a051dc",
      }
    }
    if (difficulty === "Re:Master") {
      return {
        backgroundColor: "#beadfa",
      }
    }
  }

  function kanjiToVersion(kanji) {
    const conversion = {
      真: ["Maimai", "Plus"],
      超: ["Green"],
      檄: ["Green+"],
      橙: ["Orange"],
      曉: ["Orange+"],
      桃: ["Pink"],
      櫻: ["Pink+"],
      紫: ["Murasaki"],
      堇: ["Murasaki+"],
      白: ["Milk"],
      雪: ["Milk+"],
      輝: ["Finale"],
      熊: ["Deluxe"],
      華: ["Deluxe+"],
      爽: ["Splash"],
      煌: ["Splash+"],
      宙: ["Universe"],
      星: ["Universe+"],
      祭: ["Festival"],
      祝: ["Festival+"],
      友: ["Buddies"],
    }
    return conversion[kanji]
  }
  function renderVersionReleased() {
    const kanjiVersions = [
      "真",
      "超",
      "檄",
      "橙",
      "曉",
      "桃",
      "櫻",
      "紫",
      "堇",
      "白",
      "雪",
      "輝",
      "熊",
      "華",
      "爽",
      "煌",
      "宙",
      "星",
      "祭",
      "祝",
      "友",
    ]
    return kanjiVersions.map((kanjiVersion) => {
      const version = kanjiToVersion(kanjiVersion)
      const stringifyVersion =
        version.length > 1 ? version.join(",") : `${version[0]}`
      return (
        <li
          style={{
            ...(versionF === stringifyVersion
              ? { ...versionBackgroundColor(version[0]), color: "white" }
              : ""),
            cursor: "pointer",
            padding: "7px 11px",
          }}
          onClick={() => handleVersionFilter(stringifyVersion)}
        >
          {kanjiVersion}
        </li>
      )
    })
  }

  function convertLevel(level) {
    if (level % 1 > 0.6) {
      return `${level - (level % 1)}+`
    } else {
      return `${level - (level % 1)}`
    }
  }

  async function getYouTubeVideoTitle(url) {
    // Extract the video ID from the YouTube URL
    const videoId = extractVideoId(url)
    console.log(videoId)

    // Make a request to the YouTube Data API to get video details
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDxcyxqu1ZPy_fPmp9FCJdneFKQz66OqmU`
    )
    const data = await response.json()

    // Extract the video title from the API response
    const videoTitle = data.items[0].snippet.title

    setYoutubeUrl((prevObject) => {
      return { ...prevObject, [videoId]: videoTitle }
    })

    console.log(youtubeUrl)

    return videoTitle
  }

  function extractVideoId(url) {
    const videoIdRegex =
      /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:.*)?/
    const match = url.match(videoIdRegex)
    return match ? match[1] : null
  }

  function renderChartGrid() {
    return sortedSongData.map((song) => {
      const chartObjectArr = filteredChartData.filter(
        (chart) => chart.chart_id === song._id
      )

      const youtube2 = () => {
        const youtubeId = []
        const difficulty = []
        chartObjectArr.forEach((chart) => {
          chart.youtube.forEach((youtube, index) => {
            if (youtube) {
              youtubeId.push(extractVideoId(youtube))
              if (index === 2) {
                difficulty.push("Expert")
              } else if (index === 3) {
                difficulty.push("Master")
              } else if (index === 4) {
                difficulty.push("Re:Master")
              }
            }
          })
        })
        const checkYoutubeArr = youtubeId.some((id) =>
          youtubeUrl.hasOwnProperty(id)
        )

        return (
          <div style={{ display: "grid", marginTop: '10px' }}>
            {checkYoutubeArr ? (
              youtubeId.map((id, index) => {
                return (
                  <Link
                    to={`https://youtube.com/watch?v=${id}`}
                    target="_blank"
                  >
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        ...youtubeUrlBackgroundColor(difficulty[index]),
                        ...youtubeUrlStyle,
                      }}
                    >
                      <BsYoutube
                        style={{ alignItems: "center", fontSize: "18px" }}
                      />
                      {youtubeUrl[id]}
                    </p>
                  </Link>
                )
              })
            ) : (
              <p>Loading...</p>
            )}
          </div>
        )
      }

      const chartRow = chartObjectArr.map((chart) => {
        return (
          <div
            style={{
              marginLeft: "10px",
              marginRight: "10px",
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <p style={{ backgroundColor: "#6ed43e", ...levelBoxStyle }}>
              {chart.level[0] != 0 && convertLevel(chart.level[0])}
            </p>
            <p style={{ backgroundColor: "#f7b807", ...levelBoxStyle }}>
              {chart.level[1] != 0 && convertLevel(chart.level[1])}
            </p>
            <p style={{ backgroundColor: "#ff828d", ...levelBoxStyle }}>
              {chart.level[2] != 0 && convertLevel(chart.level[2])}
            </p>
            <p style={{ backgroundColor: "#a051dc", ...levelBoxStyle }}>
              {chart.level[3] != 0 && convertLevel(chart.level[3])}
            </p>
            <p style={remasterLevelBoxStyle}>
              {chart.level[4] != 0 && convertLevel(chart.level[4])}
            </p>
            {chart.chart === "s" && (
              <li style={standardBoxStyle}>
                <span style={{ color: "white", fontWeight: "800" }}>
                  スタンダード
                </span>
              </li>
            )}
            {chart.chart === "d" && (
              <li style={deluxeBoxStyle}>
                <span style={{ color: "#d90429", fontWeight: "800" }}>で</span>
                <span style={{ color: "#fb8500", fontWeight: "800" }}>ら</span>
                <span style={{ color: "#ffb703", fontWeight: "800" }}>っ</span>
                <span style={{ color: "#2a9d8f", fontWeight: "800" }}>く</span>
                <span style={{ color: "#0077b6", fontWeight: "800" }}>す</span>
              </li>
            )}
          </div>
        )
      })

      const chartVersion = chartObjectArr.map((chart) => {
        return (
          <p
            style={{
              ...versionStyle,
              ...versionBackgroundColor(chart.version_released),
            }}
          >
            {chart.version_released}
          </p>
        )
      })

      if (chartObjectArr[0]) {
        return (
          <div
            style={{
              backgroundColor: "#6B778D",
              paddingTop: "1px",
              marginTop: "25px",
              borderRadius: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3 style={{ marginLeft: "14px", color: "white" }}>
                {song.title}
              </h3>
            </div>

            {chartRow}

            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginLeft: "13px",
                  alignItems: "center",
                }}
              >
                {chartVersion}
              </div>
              <div>
                {(chartObjectArr[0].youtube ||
                  (chartObjectArr.length === 2 &&
                    chartObjectArr[1].youtube)) && (
                  <BsYoutube
                    onClick={() => {
                      if (youtubeVisible.includes(song._id)) {
                        const newArr = youtubeVisible.filter(
                          (id) => id !== song._id
                        )
                        setYoutubeVisible(newArr)
                      } else {
                        setYoutubeVisible([...youtubeVisible, song._id])
                        chartObjectArr[0].youtube.forEach((youtube) => {
                          getYouTubeVideoTitle(youtube)
                        })
                        if (chartObjectArr[1].youtube) {
                          chartObjectArr[1].youtube.forEach((youtube) => {
                            getYouTubeVideoTitle(youtube)
                          })
                        }
                      }
                    }}
                    style={{
                      marginBottom: "11px",
                      marginRight: "20px",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  />
                )}
                <BsFillClipboardFill
                  style={{
                    marginBottom: "14px",
                    marginRight: "20px",
                    fontSize: "18px",
                    cursor: "pointer",
                  }}
                  onClick={() => copyTitle(song.title)}
                />
              </div>
            </div>

            {/* {youtubeVisible.includes(song._id) && <>{youtube}</>} */}
            {youtubeVisible.includes(song._id) && <>{youtube2()}</>}
          </div>
        )
      }
    })
  }

  return (
    <div className="new-list-container">
      <button style={filterButtonStyle}>
        <BsFunnel />
      </button>
      <ul>{renderVersionReleased()}</ul>
      <button
        style={resetButtonStyle}
        onClick={() => handleVersionFilter(null)}
      >
        Reset
      </button>
      {renderChartGrid()}
      <ScrollToTopButton />
    </div>
  )
}
