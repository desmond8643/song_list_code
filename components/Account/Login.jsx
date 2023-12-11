import { Form, useNavigate } from "react-router-dom"
import React from "react"
import { database } from "../Database/FirebaseAccount"
import { ref, get } from "firebase/database"
import { enc, SHA256 } from "crypto-js"

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    name: "",
    password: "",
  })
  const [loginError, setLoginError] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const navigate = useNavigate()

  async function checkCredential(name, password) {
    const usersRef = ref(database)
    const snapshot = await get(usersRef)
    const users = snapshot.val()

    if (users) {
      const userArr = Object.values(users)
      const userExists = userArr.some((user) => {
        return user.email === name || user.userName === name
      })

      if (userExists) {
        const user = userArr.find(
          (user) => user.email === name || user.userName === name
        )
        const storedHash = user.encryptedPassword.passwordHash
        const storedSalt = user.encryptedPassword.salt
        return verifyPassword(password, storedHash, storedSalt)
          ? {
              userName: user.userName,
              session: user.session,
            }
          : false
      }
    }
  }

  const verifyPassword = (password, storedHash, storedSalt) => {
    const passwordWithSalt = password + storedSalt
    const passwordHash = SHA256(passwordWithSalt).toString(enc.Hex)
    return passwordHash === storedHash
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const name = loginFormData.name
    const password = loginFormData.password

    const verify = await checkCredential(name, password)
    console.log(verify)

    if (!verify) {
      console.log("username / password is not valid")
      setLoginError(true)
      setErrorMessage("Username / Password is not valid")
    } else {
      const userData = {
        userName: verify.userName,
        session: verify.session,
      }
      localStorage.setItem("maimaiSongListUser", JSON.stringify(userData))
      navigate("/")
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
    document.title = "Login"
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
      <h1 style={{ ...titleStyle, ...generalStyle }}>Login</h1>
      <Form onSubmit={handleSubmit} className="login-form">
        <p style={titleStyle}>Username/Email</p>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          placeholder="Username"
          value={loginFormData.name}
        />
        <p style={titleStyle}>Password</p>
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        {loginError && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button>Login</button>
      </Form>
    </div>
  )
}
