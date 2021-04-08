// intentionally left blank
import React from 'react'

export default props => {
    return (
        <select {...props} value={props.value || ''}>
            {
                Array(11).fill(0).map((rating,i)=>{
                    return <option key={i} value={ rating + i}>{ rating + i }</option>
                })
            }
        </select>
    ) 
}
