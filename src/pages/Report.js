import React from "react";

import { Box } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';

export default function Report({ orderHistory, setOrderHistory, date }) {

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, align: "center" },
    { field: 'product', headerName: 'Product Name', width: 150, align: "center"},
    { field: 'price', headerName: 'Price', width: 120, align: "center" },
    { field: 'stocks', headerName: 'Quantity', width: 100, align: "center"},
    { field: 'totalPrice', headerName: 'Total Price', type: 'number', width: 150, align: "center" },
    { field: 'status', headerName: 'Status', width: 100, align: "center"},
  ];


  const rows = orderHistory.reduce((acc, order, index) => {

    const rowElements = order.items.map((item, itemIndex) => ({
      id: `${index}-${itemIndex}`,
      product: item.product,
      price: item.price,
      stocks: item.stocks,
      totalPrice: `${item.price * item.stocks}`,
      status: 'Completed',
    }));

    return acc.concat(rowElements);
    }, [])


  return (
    <>
      <Box sx={{ display: 'flex', width: '50%', marginLeft:'25%'}}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: 'white', height: '75vh' }}>
          {console.log(orderHistory)}
            <DataGrid
              height={500}
              maxWidth={700}
              sx={{backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              sortingOrder={['asc', 'desc']}
            />
        </Box>
      </Box>
    </>
  );
}
