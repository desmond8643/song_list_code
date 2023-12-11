import React from "react"
import ConvertSimai from "./Logic/ConvertSimai"

export default function Ma2() {
  const getRecords = JSON.parse(localStorage.getItem("ma2")) || ["", "", "", ""]

  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
  }, [])

  const [rhythm, setRhythm] = React.useState(getRecords[0])
  const handleRhythm = (event) => {
    const updatedRhythm = event.target.value
    setRhythm(updatedRhythm)
    const records = [updatedRhythm, measure, duration, text]
    localStorage.setItem("ma2", JSON.stringify(records))
  }
  const [measure, setMeasure] = React.useState(getRecords[1])
  const handleMeasureChange = (event) => {
    const updatedMeasure = event.target.value
    setMeasure(updatedMeasure)
    const records = [rhythm, updatedMeasure, duration, text]
    localStorage.setItem("ma2", JSON.stringify(records))
  }
  const [duration, setDuration] = React.useState(getRecords[2])
  const handleDurationChange = (event) => {
    const updatedDuration = event.target.value
    setDuration(updatedDuration)

    const records = [rhythm, measure, updatedDuration, text]
    localStorage.setItem("ma2", JSON.stringify(records))
  }
  const [text, setText] = React.useState(getRecords[3])
  const handleTextChange = (event) => {
    const updatedText = event.target.value
    setText(updatedText)

    const records = [rhythm, measure, duration, updatedText]
    localStorage.setItem("ma2", JSON.stringify(records))
  }

  const [changeInDuration, setChangeInDuration] = React.useState("")
  const handleChangeInDurationChange = (event) => {
    setChangeInDuration(event.target.value)
  }
  const [shiftText, setShiftText] = React.useState("")
  const handleShiftTextChange = (event) => {
    setShiftText(event.target.value)
  }

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }
  const textAreaStyle = {
    resize: "none",
    marginLeft: "10px",
    width: "calc(100% - 20px)",
    backgroundColor: selectedOption === "dark" ? "#263859" : "white",
    color: selectedOption === "dark" ? "white" : "black",
  }
  const textBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }

  const [tableData, setTableData] = React.useState([
    ["", "", "", "", "", "", "", ""],
  ])
  const [shiftedTableData, setShiftedTableData] = React.useState([
    ["", "", "", "", "", "", "", ""],
  ])

  const tableComponent = () => {
    const getTableData = ConvertSimai(rhythm, measure, duration, text)
    setTableData(getTableData)
  }
  const copyTableData = () => {
    let data = ""
    tableData.map((row, index) => {
      row.map((value, index) => {
        data += value + "\t"
      })
      data += "\n"
    })
    console.log(data)
    navigator.clipboard
      .writeText(data)
      .then(() => {
        confirm("Copied!")
      })
      .catch((error) => {
        confirm("Failed to copy content to clipboard:", error)
      })
  }
  const getMeasureAndDuration = () => {
    setMeasure(tableData[tableData.length - 1][1])
    setDuration(tableData[tableData.length - 1][2])
  }

  const shiftTableData = () => {
    const splitNewLine = shiftText.split("\n")
    let splitTab = []
    splitNewLine.forEach((row) => {
      const rowArray = row.split("\t")
      splitTab.push(rowArray)
    })
    const shiftRhythm = parseInt(changeInDuration)
    
    splitTab.forEach((row) => {
      row[2] = parseInt(row[2]) + shiftRhythm
      console.log(row[2])
      if (row[2] > 384) {
        row[1] = parseInt(parseInt(row[1]) + row[2] / 384)
        row[2] = row[2] % 384
      } else if (row[2] < 0) {
        console.log(row[1])
        row[1] = parseInt(parseInt(row[1]) + shiftRhythm / 384)
        row[2] = row[2] % 384 + 384
      }
    })
    setShiftedTableData(splitTab)
    console.log(splitTab)
  }
  const copyShiftedTableData = () => {
    let data = ""
    shiftedTableData.map((row, index) => {
      row.map((value, index) => {
        data += value + "\t"
      })
      data += "\n"
    })
    navigator.clipboard
      .writeText(data)
      .then(() => {
        confirm("Copied!")
      })
      .catch((error) => {
        confirm("Failed to copy content to clipboard:", error)
      })
  }

  return (
    <div className="ma2-container">
      <h2 style={titleStyle}>Ma2 Converter</h2>
      <div style={{ ...textBoxStyle, ...titleStyle }}>
        <p>Rhythm</p>
        <input value={rhythm} onChange={handleRhythm}></input>
      </div>
      <div style={{ ...textBoxStyle, ...titleStyle }}>
        <p>Measure</p>
        <input value={measure} onChange={handleMeasureChange}></input>
      </div>
      <div style={{ ...textBoxStyle, ...titleStyle }}>
        <p>Duration</p>
        <input value={duration} onChange={handleDurationChange}></input>
      </div>
      <p style={titleStyle}>Composition</p>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={textAreaStyle}
        rows="10"
      ></textarea>
      <button onClick={() => tableComponent()}>Convert</button>
      <button onClick={() => copyTableData()}>Copy</button>
      <button onClick={() => getMeasureAndDuration()}>Continue</button>
      <tbody>
        {tableData.map((note, index) => (
          <tr style={{ ...titleStyle }}>
            {note.map((value, idx) => (
              <td key={idx} style={{ paddingRight: "30px" }}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <h2 style={titleStyle}>Shift Rhythm</h2>
      <div style={{ ...textBoxStyle, ...titleStyle }}>
        <p>Change in duration</p>
        <input
          value={changeInDuration}
          onChange={handleChangeInDurationChange}
        ></input>
      </div>
      <textarea
        value={shiftText}
        onChange={handleShiftTextChange}
        style={textAreaStyle}
        rows="10"
      ></textarea>
      <button onClick={() => shiftTableData()}>Convert</button>
      <button onClick={() => copyShiftedTableData()}>Copy</button>
      <tbody>
        {shiftedTableData.map((note, index) => (
          <tr style={{ ...titleStyle }}>
            {note.map((value, idx) => (
              <td key={idx} style={{ paddingRight: "30px" }}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </div>
  )
}
