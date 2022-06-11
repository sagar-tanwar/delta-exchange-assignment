import { useState, useEffect } from 'react';
import './App.css';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from './components';

const ws = new WebSocket('wss://production-esocket.delta.exchange');

function App() {
  const [rows, setRows] = useState({});
  const columns = [
    { label: 'Symbol', align: 'left' },
    { label: 'Description', align: 'left' },
    { label: 'Underlying Asset', align: 'left' },
    { label: 'Mark Price', align: 'right' }
  ];

  function updateMarkPrice (event, rows) {
    const data = JSON.parse(event.data);
    const rowsClone = {...rows}
    const { symbol, mark_price } = data || {}
    if(symbol && mark_price) {
      rowsClone[symbol]['markPrice'] = mark_price
      setRows(rowsClone)
    }
  };

  useEffect(() => {
    fetch('https://api.delta.exchange/v2/products')
      .then((res) => res.json())
      .then((data) => {
        const hydratedData = data.result?.reduce((res, {symbol = '', id = '', description = '', underlying_asset = {} }) => {
          res[symbol] = {
            id,
            symbol,
            description,
            underlyingAsset: underlying_asset.symbol,
            markPrice: null
          }
          return res
        }, {});
        setRows(hydratedData);
        return hydratedData
      })
      .then((data) => {
        const symbols = Object.keys(data)
        const payload = {
          type: 'subscribe',
          payload: {
            channels: [{ name: 'v2/ticker', symbols }]
          },
        };
        const stringifiedPayload = JSON.stringify(payload)
        ws.onopen = () => ws.send(stringifiedPayload)
        
        ws.onmessage = (e) => updateMarkPrice(e, data)
      })
  }, []);

  return (
    <div className="App">
        <Table stickyHeader stickyFirstColumn>
          <TableHead>
            <TableRow>
              {columns?.map((column) => (
                <TableCell key={column.label} align={column.align}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(rows ?? {})?.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.underlyingAsset}</TableCell>
                <TableCell align='right'>{row.markPrice ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}

export default App;
