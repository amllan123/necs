import React from 'react'

import './widget.scss'
const Widget = ({icon,color,title,count}) => {
  return (
<div className="widget" style={{backgroundColor:`${color}`}}>
    <div className="top">
        {icon}
        <span className='heading'>{title}</span>
    </div>
    <span className='count'>{count}</span>
</div>
  )
}

export default Widget