import React from 'react'

/** Returns bold text in a rounded div and primary themed background */
function TitleText({text}) {
  return (
    <div className="flex flex-col m-4 sm:p-6 p-4 rounded-2xl dark:bg-licorice dark:text-white bg-white">
        <h1 className='md:text-4xl sm:text-3xl text-2xl m-0'>{text}</h1>
    </div>
  )
}

export default TitleText