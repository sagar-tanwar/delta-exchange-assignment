import './style.css'

const Table = ({
  stickyHeader = false,
  stickyFirstColumn = false,
  ...restProps
}) => {
  return (
    <table className={`table ${stickyHeader ? 'stickyHeader' : ''} ${stickyFirstColumn ? 'stickyFirstColumn' : ''}`} {...restProps} />
  )
}

export default Table