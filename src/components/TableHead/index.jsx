import React from 'react'
import TableCellContext from '../../contexts/tableCell'

const TableHead = (props) => {
  const { Provider } = TableCellContext

  return (
    <Provider value='head'>
      <thead {...props} />
    </Provider>
  )
}

export default TableHead