import React from 'react'
import { useLoaderData, useParams, Link } from 'react-router-dom'
import { getSongs } from './Database/FirebaseAccount'
import { BsPlayFill, BsYoutube, BsChevronLeft } from 'react-icons/bs'

export function loader() {
    return getSongs()
}

export default function UpdatesDetail() {
    const params = useParams()
    const updateData = useLoaderData().update

    // change updateName with special symbols
    const updateName = params.updateName.replace(/-/g, "/");

    // dark mode
    const [selectedOption, setSelectedOption] = React.useState(() => JSON.parse(localStorage.getItem('songlisttheme')) || 'light')
    React.useEffect(() => {
        document.body.classList.toggle('dark', selectedOption === 'dark');
        document.title = updateName
    }, []);

    const titleStyle = {
        color: selectedOption === 'dark' ? 'white' : 'black'
    }

    function difficultyStyle(level) {
        if (level.includes('Master')) {
            return {
                backgroundColor: '#6528F7',
                color: 'white'
            }
        }
        if (level.includes('Expert')) {
            return {
                backgroundColor: '#F31559',
                color: 'white'
            }
        }
        if (level.includes('Re:Master')) {
            return {
                backgroundColor: 'white',
                color: '#6528F7',
                boxShadow: '0px 1px 4px rgba(101, 40, 247, 0.4)'
            }
        }
    }

    const songContainerStyle = {
        display: 'flex'
    }

    const thumbnailStyle = {
        width: '120px',
        height: '120px',
        borderRadius: '15px',
        marginTop: '15px' 
    }

    // filter data for the update
    const filteredData = updateData.filter(obj => obj.updateName === updateName)

    // sort master level in ascending order
    const regex = /M(\d+)(\+)?/;
    filteredData.sort((a, b) => {
        const [, numberA, plusA] = a.difficulty.match(regex);
        const [, numberB, plusB] = b.difficulty.match(regex);

        const valueA = parseFloat(plusA ? `${numberA}.5` : numberA);
        const valueB = parseFloat(plusB ? `${numberB}.5` : numberB);

        return valueA - valueB;
    });

    console.log(filteredData)

    function getImageUrl(id) {
        return new URL(`../src/images/thumbnails/${id}.png`, import.meta.url).href
    }

    const updateElement = filteredData.map(song => (
        <>
            <div style={songContainerStyle}>
                <img src={getImageUrl(song.id)} style={thumbnailStyle} />
                <div style={{marginLeft: '20px'}}>
                    <p style={titleStyle}>{song.title}</p>
                    <ul>
                        {convertDifficulty(song.difficulty, song.youtube)}
                    </ul>
                    <p style={titleStyle}>How to Obtain: {song.obtainFrom}</p>
                </div>
            </div>
            <hr></hr>
        </>
    ))

    function convertDifficulty(difficulty, youtube) {
        const mappings = {
            E: "Expert",
            M: "Master"
        }
        const splitLevels = difficulty.split(', ');
        const levels = splitLevels.map(level => {
            const key = level.charAt(0)
            const number = level.substring(1)
            return `${mappings[key]} ${number}`
        })
        return levels.map(level => (
            <li style={difficultyStyle(level)} className='level'>
                {level}
                {level.includes("Master") && youtube &&
                <Link to={`${youtube}`}>
                    <BsPlayFill style={{color: 'white', fontSize:'20px', paddingTop: '6px'}}/>
                </Link>
                }
            </li>
        ))
    }

    return (
        <div className="updates-detail-container">
            <Link 
                to='/updates'
                style={titleStyle}
            >
                <BsChevronLeft style={{fontSize: '15px'}}/>
                <span style={{marginLeft: '5px'}}>Updates</span>
            </Link>
            <h1 style={titleStyle}>{updateName}</h1>
            <h4 style={titleStyle}>Update Type: {filteredData[0].updateType}</h4>
            {updateElement}
        </div>
    )
}

