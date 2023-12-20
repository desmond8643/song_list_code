import Filter, { loader as filterLoader } from "../components/Filter"
import Layout from "../components/Layout"
import Favorite, { loader as favoriteLoader } from "../components/Favorite"
import About from "../components/About"
import Converter from "../components/Converter"
import Settings from "../components/Settings"
import DeluxeScore, {
  loader as deluxeScoreLoader,
} from "../components/DeluxeScore"
import Target, { loader as targetLoader } from "../components/Target"
import Metronome from "../components/Metronome"
import NewList, { loader as newListLoader } from "../components/NewList"
import Register from "../components/Account/Register"
import Success from "../components/Account/Success"
import Login from "../components/Account/Login"
import Updates, { loader as updatesLoader } from "../components/Updates"
import UpdatesDetail, {
  loader as updatesDetailLoader,
} from "../components/UpdatesDetail"
import Rating, { loader as ratingLoader } from "../components/Rating"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  useNavigation,
  Outlet,
} from "react-router-dom"
import Ma2 from "../components/Ma2"

import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const AnimatedText = styled.p`
  animation: ${fadeIn} 2s ease-in-out infinite;
  animation-delay: 0s;

  &:nth-child(2) {
    animation: ${fadeOut} 2s ease-in-out infinite;
    animation-delay: 2s;
  }
`

function Loading() {
  const { state } = useNavigation()

  const loadingStyle = {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "46%",
    fontWeight: "bold",
    fontSize: "20px",
  }

  if (state === "loading") {
    return (
      <div className="loading-container">
        <AnimatedText style={loadingStyle}>Loading...</AnimatedText>
      </div>
    )
  }
  return <Outlet />
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route element={<Loading />}>
        <Route index element={<Filter />} loader={filterLoader} />
        <Route path="favorite" element={<Favorite />} loader={favoriteLoader} />
        <Route path="about" element={<About />} />
        <Route path="converter" element={<Converter />} />
        <Route path="settings" element={<Settings />} />
        <Route
          path="dxscore"
          element={<DeluxeScore />}
          loader={deluxeScoreLoader}
        />
        <Route path="target" element={<Target />} loader={targetLoader} />
        <Route path="metronome" element={<Metronome />} />
        <Route path="updates" element={<Updates />} loader={updatesLoader} />
        <Route
          path="updates/:updateName"
          element={<UpdatesDetail />}
          loader={updatesDetailLoader}
        />
        <Route path="rating" element={<Rating />} loader={ratingLoader} />

        <Route path="new-list" element={<NewList />} loader={newListLoader} />
        <Route path="ma2" element={<Ma2 />} />
        <Route path="success" element={<Success />} />
        <Route
          path="register"
          element={<Register />}
          loader={async () => {
            const isLoggedIn = localStorage.getItem("maimaiSongListUser")
            if (isLoggedIn) {
              throw redirect("/")
            }
            return null
          }}
        />
        <Route
          path="login"
          element={<Login />}
          loader={async () => {
            const isLoggedIn = localStorage.getItem("maimaiSongListUser")
            if (isLoggedIn) {
              throw redirect("/")
            }
            return null
          }}
        />
      </Route>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App

// <BrowserRouter>
//   <Routes>
//     <Route path='/' element={<Layout />}>
//       <Route index element={<Filter />} />
//       <Route path='favorite' element={<Favorite />} />
//       <Route path='about' element={<About />} />
//       <Route path='converter' element={<Converter />} />
//       <Route path='settings' element={<Settings />} />
//       <Route path='dxscore' element={<DeluxeScore />} />
//       <Route path='target' element={<Target />} />
//       <Route path='metronome' element={<Metronome />} />
//       <Route path='new-list' element={<NewList />} />
//       <Route path="register" element={<Register />} />
//     </Route>
//   </Routes>
// </BrowserRouter>
