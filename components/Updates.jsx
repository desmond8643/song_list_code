import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { getSongs } from './Database/FirebaseAccount'
import { Link } from 'react-router-dom'

export function loader() {
    return getSongs()
}

export default function Updates() {
    const useLoader = useLoaderData()
    const updateData = useLoader.update

    // dark mode
    const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')

    React.useEffect(() => {
        document.body.classList.toggle('dark', selectedOption === 'dark')
        document.title = "Updates"
    }, [])

    const titleStyle = {
        color: selectedOption === 'dark' ? 'white' : 'black',
        marginLeft: '10px'
    }

    const linkStyle = {
        color: 'black'
    }

    const festivalPlusUpdates = Array.from(new Set(
        updateData
            .filter(item => item.version === 'Festival+')
            .map(item => item.updateName)
    ));

    function modifiedUpdateName(updateName) {
        return updateName.replace(/\//g, "-")
    }

    return (
        <div className="update-container">
            <h1 style={titleStyle}>Updates</h1>
            <hr></hr>
            <h2 style={titleStyle}>Festival+</h2>
            <ul>
                {festivalPlusUpdates.map((updateName, index) => (
                    <Link to={`/updates/${modifiedUpdateName(updateName)}`} style={linkStyle}>
                        <li key={index}>{updateName}</li>
                    </Link>
                ))}
            </ul>
            <hr></hr>
        </div>
    )
}