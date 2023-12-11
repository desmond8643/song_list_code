import React from "react"

export default function Metronome() {
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Metronome"
  }, [])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const [bpm, setBpm] = React.useState(100)
  const [playing, setPlaying] = React.useState(false)
  const [count, setCount] = React.useState(0)

  const click1 = React.useRef(
    new Audio("//daveceddia.com/freebies/react-metronome/click1.wav")
  )
  const click2 = React.useRef(
    new Audio("//daveceddia.com/freebies/react-metronome/click2.wav")
  )

  React.useEffect(() => {
    const bpmSpeed = (60 * 1000) / bpm
    let timer = null

    if (playing) {
      timer = setInterval(playClick, bpmSpeed)
    }

    return () => {
      clearInterval(timer)
    }
  }, [bpm, playing])

  const handleBPM = (event) => {
    const newBpm = event.target.value
    setBpm(newBpm)

    if (playing) {
      setCount(0)
    }
  }

  const playClick = () => {
    if (count === 0) {
      click2.current.play()
    } else {
      click1.current.play()
    }

    setCount((prevCount) => prevCount + 1)
  }

  const startStop = () => {
    if (playing) {
      setPlaying(false)
    } else {
      setCount(0)
      setPlaying(true)
      playClick()
    }
  }

  const generateRandomBPM = () => {
    const minBpm = 60
    const maxBpm = 240
    const randomBpm = Math.floor(Math.random() * (maxBpm - minBpm + 1) + minBpm)
    setBpm(randomBpm)
  }

  const handleInteraction = () => {
    if (!playing) {
      // Play audio only if it's not already playing
      playClick()
    }
  }

  return (
    <div className="metronome-container" style={{ paddingTop: "70px" }}>
      <h2 style={titleStyle}>Metronome</h2>
      <p style={{ marginLeft: "10px", ...titleStyle }}>
        Only work on PC, with inconsistent rhythm...
      </p>
      <Slider bpm={bpm} handleChange={handleBPM} />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          handleClick={startStop}
          currentState={playing}
          handleInteraction={handleInteraction}
        />
        <RandomBpmButton handleClick={generateRandomBPM} />
      </div>
    </div>
  )
}

const Button = ({ handleClick, currentState, handleInteraction }) => {
  const buttonStyle = {
    borderRadius: "17px",
    border: "none",
    backgroundColor: "#8062D6",
    color: "white",
    padding: "10px 10px 10px 10px",
    fontWeight: "bold",
  }
  return (
    <button
      style={{ marginLeft: "10px", ...buttonStyle }}
      onClick={handleClick}
      onTouchStart={handleInteraction}
    >
      {currentState ? "Stop" : "Start"}
    </button>
  )
}

const Slider = ({ bpm, handleChange }) => {
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
    display: "flex",
  }

  return (
    <div
      style={{
        marginLeft: "10px",
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
      }}
      id="bpm-slider"
    >
      <div
        style={{
          ...titleStyle,
          margin: "auto",
          fontSize: "20px",
          marginBottom: "20px",
        }}
      >
        {bpm} BPM
      </div>
      <input
        type="range"
        min="60"
        max="240"
        value={bpm}
        onChange={handleChange}
        style={{ alignItems: "center", width: "80%", margin: "auto" }}
      />
    </div>
  )
}

const RandomBpmButton = ({ handleClick }) => {
  const buttonStyle = {
    borderRadius: "17px",
    border: "none",
    backgroundColor: "#8062D6",
    color: "white",
    padding: "10px 10px 10px 10px",
    fontWeight: "bold",
  }
  return (
    <button
      style={{ marginLeft: "10px", ...buttonStyle }}
      onClick={handleClick}
    >
      Random BPM
    </button>
  )
}
