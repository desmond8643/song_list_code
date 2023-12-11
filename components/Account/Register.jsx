import { Form, useNavigate } from "react-router-dom"
import React from "react"
import { database } from "../Database/FirebaseAccount"
import { ref, push, child, update, get } from "firebase/database"
import { enc, SHA256 } from "crypto-js"

export default function Register() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
    userName: "",
  })

  const [userNameError, setUserNameError] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)

  const [userNameMessage, setUserNameMessage] = React.useState("")
  const [emailMessage, setEmailMessage] = React.useState("")
  const [passwordMessage, setPasswordMessage] = React.useState("")

  const navigate = useNavigate()

  async function checkEmailExists(email) {
    const usersRef = ref(database)
    const snapshot = await get(usersRef)
    const users = snapshot.val()

    if (users) {
      const userArr = Object.values(users)
      const emailExists = userArr.some((user) => user.email === email)
      return emailExists
    } else {
      return false
    }
  }

  async function checkUsernameExists(userName) {
    const usersRef = ref(database)
    const snapshot = await get(usersRef)
    const users = snapshot.val()

    if (users) {
      const userArr = Object.values(users)
      const userNameExists = userArr.some((user) => user.userName === userName)
      return userNameExists
    } else {
      return false
    }
  }

  const generatePasswordHash = (password) => {
    const salt = generateRandomSalt()
    const passwordWithSalt = password + salt
    const passwordHash = SHA256(passwordWithSalt).toString(enc.Hex)
    return { passwordHash, salt }
  }

  const generateRandomSalt = () => {
    const saltArray = new Uint8Array(8)
    crypto.getRandomValues(saltArray)
    const salt = Array.from(saltArray)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
    return salt
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(loginFormData)

    const email = loginFormData.email
    const password = loginFormData.password
    const userName = loginFormData.userName
    const encryptedPassword = generatePasswordHash(password)

    const emailExists = await checkEmailExists(email)
    const userNameExists = await checkUsernameExists(userName)

    if (emailExists) {
      console.log("Email already exists in the database.")
      setEmailMessage("Email already exists in the database")
      setEmailError(true)
      // Handle the case when the email already exists
    } else if (email === "") {
      console.log("Email is not valid")
      setEmailMessage("Email is not valid")
      setEmailError(true)
    }

    if (userNameExists) {
      console.log("Username has been taken")
      setUserNameMessage("Username has been taken")
      setUserNameError(true)
    } else if (userName === "") {
      setUserNameMessage("Username is not valid")
      setUserNameError(true)
    }

    if (password === "") {
      console.log("Please enter your password")
      setPasswordMessage("Please enter your password")
      setPasswordError(true)
    } else {
      console.log("Email is available.")
      // Proceed with registration or further actions

      const newSession = crypto.randomUUID()

      let obj = {
        email: email,
        password: password,
        encryptedPassword: encryptedPassword,
        userName: userName,
        session: newSession,
      }
      const newPostKey = push(child(ref(database), "posts")).key
      const updates = {}
      updates["/" + newPostKey] = obj
      await update(ref(database), updates)

      navigate("/success")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  // dark mode
  const [selectedOption, setSelectedOption] = React.useState(
    () => JSON.parse(localStorage.getItem("songlisttheme")) || "light"
  )

  React.useEffect(() => {
    document.body.classList.toggle("dark", selectedOption === "dark")
    document.title = "Register"
  }, [selectedOption])

  const titleStyle = {
    color: selectedOption === "dark" ? "white" : "black",
  }

  const generalStyle = {
    display: "flex",
    justifyContent: "center",
  }

  return (
    <div className="register-container">
      <h1 style={{ ...titleStyle, ...generalStyle }}>Register your account</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <p style={titleStyle}>Username</p>
        <input
          name="userName"
          onChange={handleChange}
          type="text"
          placeholder="Username"
          value={loginFormData.userName}
        />
        {userNameError && <p style={{ color: "red" }}>{userNameMessage}</p>}
        <p style={titleStyle}>Email Address</p>
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        {emailError && <p style={{ color: "red" }}>{emailMessage}</p>}
        <p style={titleStyle}>Password</p>
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        {passwordError && <p style={{ color: "red" }}>{passwordMessage}</p>}
        <button>Register</button>
      </Form>
    </div>
  )
}
