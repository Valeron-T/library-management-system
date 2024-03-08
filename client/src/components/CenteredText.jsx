import React from 'react'

/** Simple div with centered text */
function CenteredText({text}) {
  return (
    <div className='justify-center flex w-full'>{text}</div>
  )
}

export default CenteredText