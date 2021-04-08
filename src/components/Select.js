// intentionally left blank
import React from 'react'

export default props => {
    return (
        <select {...props} value={props.value || ''}>
            {
                Array(11).fill(2010).map((yr,i)=>{
                    return <option key={i} value={ yr + i }>{ yr + i }</option>
                })
            }
        </select>
    ) 
}

