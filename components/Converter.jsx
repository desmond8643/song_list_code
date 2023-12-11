import React from "react"
import { BsClipboard, BsLink45Deg } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Converter() {
  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Chart Converter"
  }, [])

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

  const mirrorButton = {
    marginLeft: "10px",
    borderRadius: "17px",
    border: "none",
    backgroundColor: "#8062D6",
    color: "white",
    padding: "10px 10px 10px 10px",
    marginTop: "20px",
    fontWeight: "bold",
    cursor: "pointer",
  }

  const clipBoardButton = {
    color: selectedOption === "dark" ? "white" : "black",
    marginRight: "20px",
    marginTop: "10px",
    fontSize: "20px",
    cursor: "pointer",
  }

  const buttonContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }

  const linkStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const [text, setText] = React.useState("")
  const [mirrorContent, setMirrorContent] = React.useState("")
  const [mirrorDirection, setMirrorDirection] = React.useState("horizontal") // State for mirror direction

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleButtonClick = () => {
    setMirrorContent(mirrorChart(text, mirrorDirection)) // Pass mirrorDirection to mirrorChart function
  }

  const copyToClipboard = () => {
    const mirrorContentWithoutNewLine = mirrorContent.replace(/\n\n/g, "\n")
    navigator.clipboard
      .writeText(mirrorContentWithoutNewLine)
      .then(() => {
        confirm("Copied!")
      })
      .catch((error) => {
        console.error("Failed to copy content to clipboard:", error)
      })
  }

  const handleRadioChange = (event) => {
    setMirrorDirection(event.target.value)
  }

  function mirrorChart(chart, mirrorDirection) {
    let buttons
    if (mirrorDirection === "horizontal") {
      buttons = ["8", "7", "6", "5", "4", "3", "2", "1"]
    }

    if (mirrorDirection === "vertical") {
      buttons = ["4", "3", "2", "1", "8", "7", "6", "5"]
    }

    let mirror = ""
    let checkChar = true
    for (let i = 0; i < chart.length; i++) {
      if (chart[i] === "(" || chart[i] === "{" || chart[i] === "[") {
        checkChar = false
      }
      if (chart[i] === ")" || chart[i] === "}" || chart[i] === "]") {
        checkChar = true
      }
      if (checkChar) {
        switch (chart[i]) {
          case "1":
            mirror += buttons[0]
            break
          case "2":
            mirror += buttons[1]
            break
          case "3":
            mirror += buttons[2]
            break
          case "4":
            mirror += buttons[3]
            break
          case "5":
            mirror += buttons[4]
            break
          case "6":
            mirror += buttons[5]
            break
          case "7":
            mirror += buttons[6]
            break
          case "8":
            mirror += buttons[7]
            break
          default:
            mirror += chart[i]
        }
      } else {
        mirror += chart[i]
      }

      if (chart[i] === "\n") {
        mirror += "\n"
      }
    }

    return mirror
  }

  return (
    <div className="converter-container">
      <h2 style={titleStyle}>Chart Converter</h2>
      <p style={{ marginLeft: "10px", ...titleStyle }}>
        Copy and paste the chart here and it can generate a mirror chart
      </p>
      <p style={{ marginLeft: "10px", ...titleStyle }}>
        (You can get resources here{" "}
        <Link to="https://w.atwiki.jp/simai/" target="_blank" style={linkStyle}>
          <BsLink45Deg />
        </Link>
        )
      </p>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={textAreaStyle}
        rows="10"
      ></textarea>
      <div style={{ marginTop: "10px", marginLeft: "10px", ...titleStyle }}>
        <label style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="horizontal"
            checked={mirrorDirection === "horizontal"}
            onChange={handleRadioChange}
          />
          Horizontal Mirror
        </label>
        <label>
          <input
            type="radio"
            value="vertical"
            checked={mirrorDirection === "vertical"}
            onChange={handleRadioChange}
          />
          Vertical Mirror
        </label>
      </div>
      <div style={buttonContainer}>
        <button style={mirrorButton} onClick={handleButtonClick}>
          Mirror
        </button>
        <BsClipboard style={clipBoardButton} onClick={copyToClipboard} />
      </div>
      <p
        style={{
          marginLeft: "15px",
          whiteSpace: "pre-line",
          lineHeight: "1.2",
          ...titleStyle,
        }}
      >
        {mirrorContent}
      </p>
    </div>
  )
}
