import React from 'react'

function Eyes({eyeOffsetX,eyeOffsetY,eyeRadius}){
    return(
        <React.Fragment>
        <circle
        cx={-eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
      ></circle>
      <circle
        cx={eyeOffsetX}
        cy={-eyeOffsetY}
        r={eyeRadius}
      ></circle>
      </React.Fragment>
    )
}

export default Eyes