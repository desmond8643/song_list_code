import React from "react"

export default function About() {
  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )
  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "About"
  }, [])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const generalStyle = {
    marginLeft: "10px",
    marginRight: "20px",
    marginTop: "20px",
  }

  const centerStyle = {
    // textAlign: 'center'
  }

  return (
    <div className="about-container">
      <h2 style={titleStyle}>About</h2>
      <p style={{ ...generalStyle, ...titleStyle }}>
        This website is inspired by a rhythm game. Created with React. The main
        purpose of this website is to practice coding and self-use.
      </p>
      <p style={{ ...generalStyle, ...titleStyle, marginBottom: "40px" }}>
        User data and information of songs are stored in a database, and User's
        password will be encrypted.
      </p>
      <div style={centerStyle}>
        <h3 style={{ ...generalStyle, ...titleStyle }}>
          <span>Song List</span>
        </h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          It includes songs in the game with subjective tags about the chart, so
          use it with a grain of salt. Youtube chart videos are included for
          most of the song in the list, which is a extra source of reference of
          the chart.
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>
          Favorite <span style={{ color: "#CD1818" }}>♥</span>
        </h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          To access songs more conveniently, songs can be added and accessed in
          favorite.
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>Register and Login</h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          User can access their favorite songs and other upcoming functions in
          different devices by registering an account.
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>Updates</h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          It shows you the useful update informations in a simple way
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>Chart Converter</h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          Charts can be converted horizontally and vertically with this
          converter.
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>
          Deluxe Score <span style={{ color: "#E8AA42" }}>✦</span>
        </h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          Check deluxe score of favorite songs correspond to the star ratings
        </p>
        <h3 style={{ ...generalStyle, ...titleStyle }}>Target</h3>
        <p style={{ ...generalStyle, ...titleStyle }}>
          Import and access your statistic in a convenient way
        </p>
      </div>
    </div>
  )
}
