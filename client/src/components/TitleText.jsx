import React from 'react'

/** Returns bold text in a rounded div and primary themed background */
function TitleText({text}) {
  return (
    <div className="flex flex-col sm:p-6 text-zinc-700 py-4 p-8">
      <h1 className='md:text-4xl sm:text-3xl text-2xl m-0'>{text}</h1>
    </div>
  )
}

export default TitleText