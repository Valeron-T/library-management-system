import React from 'react'

function BookCard({ title, author, isbn }) {
    return (
        <div className='flex flex-col dark:text-white mx-8 m-4'>
            <img className='rounded-2xl sm:h-56 sm:w-44 h-48 w-32 shadow-hard' draggable="false" src={`https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`}></img>
            <div className="flex flex-col pt-3 p-1">
                <p className='font-semibold text-md'>{title}</p>
                <p className='font-light text-sm mt-2'>{author}</p>
            </div>

        </div>
    )
}

export default BookCard