import React from "react"

export default function Success() {
  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Success"
  }, [selectedOption])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const generalStyle = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <div className="success-container">
      <h1 style={{ ...generalStyle, ...titleStyle }}>
        Your Registration is successful!
      </h1>
    </div>
  )
}
