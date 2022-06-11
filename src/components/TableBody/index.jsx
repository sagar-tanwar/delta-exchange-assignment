import React from 'react'
import TableCellContext from '../../contexts/tableCell'

const TableBody = (props) => {
  const { Provider } = TableCellContext

  return (
    <Provider value='body'>
      <thead {...props} />
    </Provider>
  )
}

export default TableBody