import React from 'react'
import Header from '../Header/Header'

const Base = ({children}) => {
  return (
    <div>
        <Header/>
        <div>
            {children}
        </div>
    </div>
  )
}

export default Base