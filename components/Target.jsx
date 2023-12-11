import React from "react"
import {
  BsList,
  BsTable,
  BsFillPlusCircleFill,
  BsFillDashCircleFill,
} from "react-icons/bs" //https://react-icons.github.io/react-icons/icons?name=bs
import { getSongs } from "./Database/FirebaseAccount"
import { useLoaderData } from "react-router-dom"
import { ref, push, child, update, get } from "firebase/database"
import { database } from "./Database/FirebaseAccount"

export function loader() {
  return getSongs()
}

export default function Target() {
  const useLoader = useLoaderData()
  const databaseTarget = useLoader.database.target

  const isLoggedIn = JSON.parse(localStorage.getItem("maimaiSongListUser"))
  const userName = isLoggedIn ? isLoggedIn.userName : ""

  // store total quantity of songs in each level, need to be updated (11, 11+, 12, 12+, 13, 13+, 14)
  const chartQuantity = [172, 156, 227, 287, 379, 278, 143]

  const [maimaiTargets, setMaimaiTargets] = React.useState(
    !isLoggedIn
      ? JSON.parse(localStorage.getItem("maimaitargets")) || [
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
        ]
      : databaseTarget || [
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
          {
            fiveStars: 0,
            fourStars: 0,
            sss: 0,
            sssPlus: 0,
            ap: 0,
            apPlus: 0,
          },
        ]
  )
  //     fiveStars: 0,
  //     fourStars: 0,
  //     sss: 0,
  //     sssPlus: 0,
  //     ap: 0,
  //     apPlus: 0
  //   },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // },
  // {
  //   fiveStars: 0,
  //   fourStars: 0,
  //   sss: 0,
  //   sssPlus: 0,
  //   ap: 0,
  //   apPlus: 0
  // }]

  // dark mode

  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Target"
  }, [])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const iconStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const generalStyle = {
    marginLeft: "10px",
  }

  const buttonStyle = {
    borderRadius: "17px",
    border: "none",
    backgroundColor: "#8062D6",
    color: "white",
    padding: "10px 10px 10px 10px",
    fontWeight: "bold",
    userSelect: "none",
  }

  function fraction(quantity) {
    return `${quantity}/${chartQuantity[selectedLevelNumber]}`
  }

  function percentage(quantity) {
    const percent = (quantity / chartQuantity[selectedLevelNumber]) * 100
    return `${percent.toFixed(2)}%`
  }

  // update db
  async function uploadTargets(updatedTarget) {
    if (isLoggedIn) {
      const usersRef = ref(database)
      const snapshot = await get(usersRef)
      const users = snapshot.val()

      if (users) {
        const userArr = Object.values(users)
        const user = userArr.find((user) => user.userName === userName)

        if (user) {
          const updatedUser = {
            ...user,
            target: updatedTarget,
          }

          const userId = Object.keys(users).find(
            (key) => users[key].userName === userName
          )
          const userRef = child(usersRef, userId)
          await update(userRef, updatedUser)

          // Update successful
          console.log("targets updated successfully.")
        } else {
          // User not found
          console.log("User not found.")
        }
      }
    }
  }

  // Level options

  const [options] = React.useState([
    "Level 11",
    "Level 11+",
    "Level 12",
    "Level 12+",
    "Level 13",
    "Level 13+",
    "Level 14",
  ])
  const [selected, setSelected] = React.useState("")
  const [selectedLevelNumber, setSelectedNumber] = React.useState("")
  const [statOptions] = React.useState([
    "✦✦✦✦✦",
    "✦✦✦✦",
    "SSS+",
    "SSS",
    "AP+",
    "AP",
  ])

  const [selectedStat, setSelectedStat] = React.useState("")
  const [statValue, setStatValue] = React.useState("")
  const [changeStat, setChangeStat] = React.useState(false)

  const handleSelectChange = (event) => {
    const index = event.target.selectedIndex - 1
    setSelected(event.target.value)
    setSelectedNumber(index)
  }

  const handleStatChange = (event) => {
    const stat = event.target.value
    if (stat === "✦✦✦✦✦") {
      setSelectedStat("fiveStars")
    }
    if (stat === "✦✦✦✦") {
      setSelectedStat("fourStars")
    }
    if (stat === "SSS+") {
      setSelectedStat("sssPlus")
    }
    if (stat === "SSS") {
      setSelectedStat("sss")
    }
    if (stat === "AP") {
      setSelectedStat("ap")
    }
    if (stat === "AP+") {
      setSelectedStat("apPlus")
    }
  }

  const handleStatValueChange = (event) => {
    const inputValue = event.target.value
    // Remove any non-numeric characters from the input
    const numericValue = inputValue.replace(/\D/g, "")
    setStatValue(numericValue)
  }

  const handleSaveStatChange = () => {
    console.log(selectedLevelNumber, selectedStat, statValue)
    const parseStatValue = parseInt(statValue)
    if (
      statValue !== "" &&
      parseStatValue <= chartQuantity[selectedLevelNumber]
    ) {
      setMaimaiTargets((prevTargets) => {
        const updatedTargets = [...prevTargets]
        updatedTargets[selectedLevelNumber][selectedStat] = parseStatValue

        if (
          selectedStat === "apPlus" &&
          parseStatValue > updatedTargets[selectedLevelNumber]["ap"]
        ) {
          updatedTargets[selectedLevelNumber]["ap"] = parseStatValue
          updatedTargets[selectedLevelNumber]["sssPlus"] = parseStatValue
          updatedTargets[selectedLevelNumber]["sss"] = parseStatValue
        }
        if (
          selectedStat === "ap" &&
          parseStatValue > updatedTargets[selectedLevelNumber]["sssPlus"]
        ) {
          updatedTargets[selectedLevelNumber]["sssPlus"] = parseStatValue
          updatedTargets[selectedLevelNumber]["sss"] = parseStatValue
        }
        if (
          selectedStat === "sssPlus" &&
          parseStatValue > updatedTargets[selectedLevelNumber]["sss"]
        ) {
          updatedTargets[selectedLevelNumber]["sss"] = parseStatValue
        }
        if (
          selectedStat === "fiveStars" &&
          parseStatValue > updatedTargets[selectedLevelNumber]["fourStars"]
        ) {
          updatedTargets[selectedLevelNumber]["fourStars"] = parseStatValue
        }

        if (!isLoggedIn) {
          localStorage.setItem("maimaitargets", JSON.stringify(updatedTargets))
        } else {
          uploadTargets(updatedTargets)
        }
        return updatedTargets
      })
    }
  }

  const addOneStat = () => {
    setMaimaiTargets((prevTargets) => {
      const updatedTargets = [...prevTargets]
      if (
        selectedStat != "" &&
        updatedTargets[selectedLevelNumber][selectedStat] <
          chartQuantity[selectedLevelNumber]
      ) {
        updatedTargets[selectedLevelNumber][selectedStat] += 1
      }

      if (!isLoggedIn) {
        localStorage.setItem("maimaitargets", JSON.stringify(updatedTargets))
      } else {
        uploadTargets(updatedTargets)
      }
      return updatedTargets
    })
  }

  const minusOneStat = () => {
    setMaimaiTargets((prevTargets) => {
      const updatedTargets = [...prevTargets]
      if (
        selectedStat != "" &&
        updatedTargets[selectedLevelNumber][selectedStat] > 0
      ) {
        updatedTargets[selectedLevelNumber][selectedStat] -= 1
      }
      if (!isLoggedIn) {
        localStorage.setItem("maimaitargets", JSON.stringify(updatedTargets))
      } else {
        uploadTargets(updatedTargets)
      }
      return updatedTargets
    })
  }

  // Change listing
  const [listButtonStyle, setListButtonStyle] = React.useState({
    backgroundColor: "#8062D6",
    borderStyle: "solid",
    borderColor: "#8062D6",
  })

  const [tableButtonStyle, setTableButtonStyle] = React.useState({
    backgroundColor: selectedOption === "dark" ? "#17223B" : "#FAF3F0",
    borderStyle: "solid",
    borderColor: "gray",
  })

  const [showList, setShowList] = React.useState(true)
  const [showTable, setShowTable] = React.useState(false)

  function handleListClick() {
    if (!showList && showTable) {
      setShowList(true)
      setShowTable(false)
      setListButtonStyle({
        backgroundColor: "#8062D6",
        borderStyle: "solid",
        borderColor: "#8062D6",
      })
      setTableButtonStyle({
        backgroundColor: selectedOption === "dark" ? "#17223B" : "#FAF3F0",
        borderStyle: "solid",
        borderColor: "gray",
        color: "black",
      })
    }
  }

  function handleTableClick() {
    if (!showTable && showList) {
      setShowTable(true)
      setShowList(false)
      setTableButtonStyle({
        backgroundColor: "#8062D6",
        borderStyle: "solid",
        borderColor: "#8062D6",
      })
      setListButtonStyle({
        backgroundColor: selectedOption === "dark" ? "#17223B" : "#FAF3F0",
        borderStyle: "solid",
        borderColor: "gray",
        color: "black",
      })
    }
  }

  return (
    <div className="target-container">
      <h2 style={titleStyle}>Target</h2>
      <select style={{ ...generalStyle }} onChange={handleSelectChange}>
        <option disabled value="" selected="selected">
          Select level
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div style={{ ...generalStyle, marginTop: "10px" }}>
        <button
          style={{
            padding: "9px 10px 8px 9px",
            borderTopLeftRadius: "5px",
            borderBottomLeftRadius: "5px",
            borderStyle: "none",
            ...listButtonStyle,
          }}
          onClick={handleListClick}
        >
          <BsList style={{ fontSize: "25px", ...iconStyle }} />
        </button>
        <button
          style={{
            padding: "9px 9px 8px 10px",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            borderStyle: "none",
            ...tableButtonStyle,
          }}
          onClick={handleTableClick}
        >
          <BsTable style={{ fontSize: "25px", ...iconStyle }} />
        </button>
      </div>
      {selected && (
        <div>
          <p style={{ ...titleStyle, ...generalStyle }}>{selected}</p>
          {showTable && (
            <table style={{ margin: "10px 10px 10px 10px" }}>
              <tr style={{ textAlign: "left" }}>
                <th>
                  <span style={{ color: "#E8AA42" }}>S</span>
                  <span style={{ color: "#4477CE" }}>S</span>
                  <span style={{ color: "#CD1818" }}>S</span>
                </th>
                <th>
                  <span style={{ color: "#E8AA42" }}>S</span>
                  <span style={{ color: "#4477CE" }}>S</span>
                  <span style={{ color: "#CD1818" }}>S</span>
                  <span style={{ color: "#E8AA42" }}>+</span>
                </th>
                <th style={{ color: "#F94C10" }}>AP</th>
                <th style={{ color: "#F94C10" }}>AP+</th>
                <th style={{ color: "#CD1818" }}>✦✦✦✦</th>
                <th style={{ color: "#E8AA42", width: "16.67%" }}>✦✦✦✦✦</th>
              </tr>
              <tr style={{ textAlign: "left" }}>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].sss)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].sssPlus)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].ap)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].apPlus)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].fourStars)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : fraction(maimaiTargets[selectedLevelNumber].fiveStars)}
                </th>
              </tr>
              <tr style={{ textAlign: "left" }}>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].sss)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].sssPlus)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].ap)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].apPlus)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].fourStars)}
                </th>
                <th style={titleStyle}>
                  {selectedLevelNumber === ""
                    ? ""
                    : percentage(maimaiTargets[selectedLevelNumber].fiveStars)}
                </th>
              </tr>
            </table>
          )}

          {showList && (
            <div>
              <p style={{ ...titleStyle, ...generalStyle }}>
                Achievement Score
              </p>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ paddingRight: "20px" }}>
                    <span style={{ color: "#E8AA42" }}>S</span>
                    <span style={{ color: "#4477CE" }}>S</span>
                    <span style={{ color: "#CD1818" }}>S</span>
                  </th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].sss)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(maimaiTargets[selectedLevelNumber].sss)}
                  </th>
                </tr>
              </table>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ paddingRight: "10px" }}>
                    <span style={{ color: "#E8AA42" }}>S</span>
                    <span style={{ color: "#4477CE" }}>S</span>
                    <span style={{ color: "#CD1818" }}>S</span>
                    <span style={{ color: "#E8AA42" }}>+</span>
                  </th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].sssPlus)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(maimaiTargets[selectedLevelNumber].sssPlus)}
                  </th>
                </tr>
              </table>
              <p style={{ ...titleStyle, ...generalStyle }}>AP</p>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ color: "#F94C10", paddingRight: "28px" }}>AP</th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].ap)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(maimaiTargets[selectedLevelNumber].ap)}
                  </th>
                </tr>
              </table>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ paddingRight: "18px", color: "#F94C10" }}>
                    AP+
                  </th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].apPlus)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(maimaiTargets[selectedLevelNumber].apPlus)}
                  </th>
                </tr>
              </table>
              <p style={{ ...titleStyle, ...generalStyle }}>Deluxe Score</p>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ color: "#E8AA42", paddingRight: "20px" }}>
                    ✦✦✦✦✦
                  </th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].fiveStars)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(
                          maimaiTargets[selectedLevelNumber].fiveStars
                        )}
                  </th>
                </tr>
              </table>
              <table style={{ margin: "10px 10px 10px 10px" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ color: "#CD1818", paddingRight: "33px" }}>
                    ✦✦✦✦
                  </th>
                  <th style={{ ...titleStyle, paddingRight: "20px" }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : fraction(maimaiTargets[selectedLevelNumber].fourStars)}
                  </th>
                  <th style={{ ...titleStyle }}>
                    {selectedLevelNumber === ""
                      ? ""
                      : percentage(
                          maimaiTargets[selectedLevelNumber].fourStars
                        )}
                  </th>
                </tr>
              </table>
            </div>
          )}

          <button
            style={{ ...generalStyle, ...buttonStyle, marginTop: "20px" }}
            onClick={() => setChangeStat((prevState) => !prevState)}
          >
            Change stats
          </button>
          {changeStat && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                marginLeft: "10px",
                marginTop: "15px",
              }}
            >
              <select onChange={handleStatChange}>
                <option disabled selected="selected">
                  Select stat
                </option>
                {statOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  alignItems: "center",
                }}
              >
                <input
                  style={{ fontSize: "20px", width: "80%" }}
                  type="text"
                  onChange={handleStatValueChange}
                  value={statValue}
                />
                <BsFillDashCircleFill
                  style={{
                    fontSize: "25px",
                    marginLeft: "10px",
                    color: "#8062D6",
                  }}
                  onClick={minusOneStat}
                />
                <BsFillPlusCircleFill
                  style={{
                    fontSize: "25px",
                    marginLeft: "10px",
                    color: "#8062D6",
                  }}
                  onClick={addOneStat}
                />
              </div>
              {parseInt(statValue) > chartQuantity[selectedLevelNumber] && (
                <p style={{ color: "#CD1818" }}>
                  Number cannot be larger than total!
                </p>
              )}
              <button
                style={{ marginTop: "10px", ...buttonStyle }}
                onClick={handleSaveStatChange}
              >
                Save Change
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
