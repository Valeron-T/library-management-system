import React from 'react'
import { Link } from 'react-router-dom'

function LinkWrapper({ link, styles, text }) {
    return (
        <div className="flex w-full flex-row-reverse px-6">
            <Link to={link} className={styles}>{text}</Link>
        </div>

    )
}

export default LinkWrapper