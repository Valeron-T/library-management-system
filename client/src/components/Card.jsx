import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Card widget which supports a title, value, icon and link to navigate to.
 * @param {Object} cardOptions
 * @param {String} cardOptions.value - Value 
 * @param {String} cardOptions.title - Title
 * @param {IconType} cardOptions.icon - React-Icons icon component 
 */
function Card({ value, title, icon }) {

    return (
        <div className="bg-white dark:bg-light-gray dark:text-white flex flex-col rounded-2xl m-4 py-2 shadow-soft">
            <div className="flex sm:flex-row-reverse items-center text-xl flex-col m-0 justify-between w-full">
                {/* Icon */}
                <div className="flex bg-pink-magenta rounded-full items-center justify-center max-sm:mt-2 sm:mr-4 p-3">
                    {icon}
                </div>

                {/* Value */}
                <p className="font-semibold sm:pl-4 my-4 !duration-0 font-poppins text-3xl">{value}</p>
            </div>

            {/* Title */}
            {title && <p className="sm:ml-4 mb-2 m-0 max-sm:self-center">{title}</p>}
        </div>

    )
}

export default Card
