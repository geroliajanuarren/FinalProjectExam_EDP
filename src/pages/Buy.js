import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'product', headerName: 'Product Name', width: 130 },
  { field: 'price', headerName: 'Price', width: 130 },
  { field: 'stocks', headerName: 'Quantity', width: 90 },
  {
    field: 'totalPrice',
    headerName: 'Total Price',
    type: 'number',
    width: 160,
  },
];

export default function Cart({ orderHistory }) {
  const rows = orderHistory.reduce((acc, order, index) => {

    const orderItems = order.items.map((item) => ({
      id: item.id,
      product: item.product,
      price: item.price,
      stocks: item.stocks,
      totalPrice: item.price * item.stocks, 
    }));


    return acc.concat();
  }, []);
  return (
    <div style={{ height: 400, width: '80%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
      />
    </div>
  );
}