import React from 'react'

function BookCard({ title, author, isbn }) {
    return (
        <div className='flex flex-col dark:text-white mx-8 m-4'>
            <img className='rounded-2xl' draggable="false" src='https://covers.openlibrary.org/b/isbn/0439785960-M.jpg'></img>
            <div className="flex flex-col p-1">
                <p className='font-semibold text-lg'>{title}</p>
                <p className='font-light'>{author}</p>
            </div>

        </div>
    )
}

export default BookCard