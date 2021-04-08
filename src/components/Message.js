import React from 'react'

const Message = (props) => {
    console.log(props)
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Message
