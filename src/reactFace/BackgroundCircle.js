import React from 'react'

function BackgroundCircle({radius,strokeWidth}){
    return(
        <circle
        r={radius}
        fill="yellow"
        stroke="black"
        strokeWidth={strokeWidth}
      ></circle>
    )
}

export default BackgroundCircle