import { Outlet } from 'react-router-dom'
import Sidebar from "./Sidebar"
import { Link } from 'react-router-dom'
import settingLogo from "../src/images/setting-logo.png"
import { BsFillHouseFill, BsGearFill } from 'react-icons/bs'

export default function Layout() {
    return (
        <div> 
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <header style={{userSelect: 'none'}}>Song List</header>
            <Link to='settings'>
                {/* <img src={settingLogo} className="setting-logo"/> */}
                <BsGearFill className='setting-logo'/>
            </Link>
            <Link to='/'>
                <BsFillHouseFill className="home-logo"/>
            </Link>
            <main>
                <Outlet />
            </main>
        </div>
    )
}