import { useContext } from 'react'
import TableCellContext from '../../contexts/tableCell'
import './style.css'

const TableCell = ({
  align = 'left',
  variant = '',
  className = '',
  ...restProps
}) => {
  let contextValue = useContext(TableCellContext)
  if(variant) contextValue = variant

  return contextValue === 'head'
    ? <th className={`tableCell tableCell--${align} ${className}`} {...restProps}></th>
    : <td className={`tableCell tableCell--${align} ${className}`} {...restProps}></td>
}

export default TableCell