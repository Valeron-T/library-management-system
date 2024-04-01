import React from 'react'

/** Returns bold text in a rounded div smaller than title */
function SubTitleText({text, style}) {
  return (
    <div className={`${style} flex flex-row font-poppins font-semibold dark:text-white text-zinc-700 p-8`}>
      <p className='md:text-2xl sm:text-xl text-lg m-0'>{text}</p>
    </div>
  )
}

export default SubTitleText