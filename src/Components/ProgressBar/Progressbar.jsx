import React from 'react'

const Progressbar = ({progress}) => {
    return (
        <div>
            <h1>Progressbar</h1>
            <div className='ouuter'>
                <div className='inner'>
                    {progress}%
                </div>
                </div>
        </div>
    )
}

export default Progressbar