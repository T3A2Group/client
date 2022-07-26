import React from 'react'
import { Button } from 'react-bootstrap'

const ToolBar = ({openSearchbar}) => {
  return (
      <Button variant="outline-info" className="toolbar rounded-pill px-3" onClick={openSearchbar}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <small>     search</small>
      </Button>
  )
}

export default ToolBar