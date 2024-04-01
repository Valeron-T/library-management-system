import React from 'react'

/** Returns bold text in a rounded div and primary themed background */
function TitleText({text, style}) {
  return (
    <div className={`${style} flex flex-row font-poppins font-semibold dark:text-white text-zinc-700 p-8`}>
      <p className='md:text-3xl sm:text-2xl text-xl m-0'>{text}</p>
    </div>
  )
}

export default TitleText