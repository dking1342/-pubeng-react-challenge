import React from 'react'

const Repeatable = ({
  value,
  onCreate,
  onUpdate,
  onDelete,
}) => (
  <div>
    {value.map(({ id, name }) => (
      <div key={id}>
        <input onChange={e => onUpdate({ id, name: e.target.value })} value={name} />
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    ))}
    <button onClick={() => onCreate({ name: '' })}>Add New</button>
  </div>
)

export default Repeatable