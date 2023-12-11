import React from "react"
import { BsFillClipboardFill, BsYoutube, BsFunnel } from "react-icons/bs"
import { useLoaderData, useSearchParams, Link, defer } from "react-router-dom"
import { fetchFestivalPlusData } from "./Server/fetchBackend"
import { fetchChartsData } from "./Server/fetchBackend"

export async function loader() {
  const chartsPromise = await fetchChartsData()
  const chartLevelsPromise = await fetchFestivalPlusData()
  return { charts: chartsPromise, chartLevels: chartLevelsPromise }
}
export default function NewList() {
  const songData = useLoaderData().charts
  const chartLevelData = useLoaderData().chartLevels
  console.log(chartLevelData)

  const [youtubeVisible, setYoutubeVisible] = React.useState([])

  const [versionF, setVersionF] = React.useState(null)

  const filteredChartData = chartLevelData.filter((chart) => {
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
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
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

  function renderChartGrid() {
    return songData.map((song) => {
      const chartObjectArr = filteredChartData.filter(
        (chart) => chart.chart_id === song._id
      )
      const levels = chartObjectArr[0] && chartObjectArr[0].level
      const chartType = chartObjectArr[0] && chartObjectArr[0].chart
      const youtube = chartObjectArr[0] && chartObjectArr[0].youtube

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
                {levels[0] != 0 && convertLevel(levels[0])}
              </p>
              <p style={{ backgroundColor: "#f7b807", ...levelBoxStyle }}>
                {levels[1] != 0 && convertLevel(levels[1])}
              </p>
              <p style={{ backgroundColor: "#ff828d", ...levelBoxStyle }}>
                {levels[2] != 0 && convertLevel(levels[2])}
              </p>
              <p style={{ backgroundColor: "#a051dc", ...levelBoxStyle }}>
                {levels[3] != 0 && convertLevel(levels[3])}
              </p>
              <p style={remasterLevelBoxStyle}>
                {levels[4] != 0 && convertLevel(levels[4])}
              </p>
              {chartType === "s" && (
                <li style={standardBoxStyle}>
                  <span style={{ color: "white", fontWeight: "800" }}>
                    スタンダード
                  </span>
                </li>
              )}
              {chartType === "d" && (
                <li style={deluxeBoxStyle}>
                  <span style={{ color: "#d90429", fontWeight: "800" }}>
                    で
                  </span>
                  <span style={{ color: "#fb8500", fontWeight: "800" }}>
                    ら
                  </span>
                  <span style={{ color: "#ffb703", fontWeight: "800" }}>
                    っ
                  </span>
                  <span style={{ color: "#2a9d8f", fontWeight: "800" }}>
                    く
                  </span>
                  <span style={{ color: "#0077b6", fontWeight: "800" }}>
                    す
                  </span>
                </li>
              )}
            </div>

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
                <p
                  style={{
                    ...versionStyle,
                    ...versionBackgroundColor(
                      chartObjectArr[0].version_released
                    ),
                  }}
                >
                  {chartObjectArr[0].version_released}
                </p>
              </div>
              <div>
                {(youtube) && (
                  <BsYoutube
                    onClick={() => {
                      if (youtubeVisible.includes(song.id)) {
                        const newArr = youtubeVisible.filter(
                          (id) => id !== song.id
                        )
                        setYoutubeVisible(newArr)
                      } else {
                        setYoutubeVisible([...youtubeVisible, song.id])
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

            {youtubeVisible.includes(song.id) && (
              <>
                {chartType === "s" && youtube && (
                  <div
                    style={{
                      marginLeft: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "white", fontSize: "12px" }}>
                      スタンダード
                    </p>
                    <div style={{ marginLeft: "10px" }}>
                      {
                        <Link to={youtube[3]}>
                          <BsYoutube
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              marginTop: "7px",
                              color: "#5D12D2",
                            }}
                          />
                        </Link>
                      }
                    </div>
                  </div>
                )}
                {chartType === "d" && youtube && (
                  <div
                    style={{
                      marginLeft: "15px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ color: "white", fontSize: "12px" }}>
                      でらっくす
                    </p>
                    <div style={{ marginLeft: "10px" }}>
                      {
                        <Link to={youtube[3]}>
                          <BsYoutube
                            style={{
                              fontSize: "20px",
                              cursor: "pointer",
                              marginTop: "7px",
                              color: "#5D12D2",
                            }}
                          />
                        </Link>
                      }
                    </div>
                  </div>
                )}
              </>
            )}
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
    </div>
  )
}
