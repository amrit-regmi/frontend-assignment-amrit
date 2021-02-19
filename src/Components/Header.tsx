import React, { FC } from 'react'

const Header:FC<{ title: string }> = ({ title }) => {

  return (
    <div className='header'>
      <h1>{title}</h1>
    </div>

  )
}

export default Header