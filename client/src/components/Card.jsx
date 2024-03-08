import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Card widget which supports a title, descriptive text, icon and link to navigate to.
 * @param {Object} cardOptions
 * @param {String} cardOptions.title - Title (Bold)
 * @param {String} cardOptions.text - Descriptive text
 * @param {IconType} cardOptions.icon - React-Icons icon component 
 * @param {String} cardOptions.link - Link to navigate to when clicked
 */
function Card({ title, text, icon, link }) {
    
    return (
        <Link to={link}>
            <div className="bg-white text-licorice flex flex-col items-center rounded-2xl overflow-hidden relative group m-2 p-2 z-0">
                {/* Circle for aesthetics in top-right corner */}
                <div className="circle absolute h-[5em] w-[5em] -top-[2.5em] -right-[2.5em] rounded-full bg-sea-green group-hover:scale-[2000%] duration-500 z-[-1]"></div>
                {/* Icon */}
                {icon}
                {/* Title */}
                {title && <h1 className="z-20 font-bold font-Poppin group-hover:text-white duration-500 text-[1.4em]">{title}</h1>}
                {/* Descriptive text */}
                {text && <p className="z-20 group-hover:text-white duration-500">{text}</p>}
            </div>
        </Link>

    )
}

export default Card
