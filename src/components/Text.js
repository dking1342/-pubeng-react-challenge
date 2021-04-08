import React from 'react'

export default props => <input {...props} value={props.value || '' } type="text" />