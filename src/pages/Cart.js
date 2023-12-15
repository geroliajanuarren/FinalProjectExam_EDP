import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';


function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => {
        console.log('Descending Comparator:', a, b);
        return descendingComparator(a, b, orderBy);
      }
    : (a, b) => {
        console.log('Ascending Comparator:', a, b);
        return -descendingComparator(a, b, orderBy);
      };
}


function descendingComparator(a, b, orderBy) {
  const propA = a.items[0][orderBy];
  const propB = b.items[0][orderBy];

  console.log('Comparing:', propA, propB);

  if (propB < propA) {
    return -1;
  }
  if (propB > propA) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const headCells = [
  { id: 'product', numeric: false, disablePadding: true, label: 'Product' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price (₱)' },
  { id: 'stocks', numeric: true, disablePadding: false, label: 'Quantity (e)' },
  { id: 'totalPrice', numeric: true, disablePadding: false, label: 'Total Price (+)' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
];
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ textAlign: 'center', justifyContent: 'center' }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

  
export default function EnhancedTable({ orderHistory, setOrderHistory }) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('product');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    console.log('Sorting:', property, isAsc ? 'asc' : 'desc');
    setOrderBy(property);
    setOrder(isAsc ? 'desc' : 'asc');
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderHistory.length) : 0;

  const visibleRows = React.useMemo( () =>
    stableSort(orderHistory, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage, orderHistory],
  );
 
  
  
  
  return (
    <Box sx={{ maxWidth: '100', }}>
      <Paper sx={{ width: '80%',  margin: '0 auto'}}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750,}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
            {
              visibleRows.reduce((acc, row, index) => {
              // const isItemSelected = isSelected(row.id);
              // const labelId = `enhanced-table-checkbox-${index}`;

              const rowElements = row.items.map((item) => (
                <TableRow
                  hover
                  // onClick={(event) => handleClick(event, row.id)}
                  // aria-checked={isItemSelected}
                  // tabIndex={-1}
                  key={item.id} // Use item.id as the key for TableRow
                  // selected={isItemSelected}
                >
                  <TableCell component="th" scope="row" padding="none" align="center">
                    {item.product}
                  </TableCell>
                  <TableCell align="center">{item.price}</TableCell>
                  <TableCell align="center">{item.stocks}</TableCell>
                  <TableCell align="center">{item.price * item.stocks}</TableCell>
                  <TableCell align="center" sx={{ color: 'green' }}>
                    Completed
                  </TableCell>
                </TableRow>
              ));

              return acc.concat(rowElements);
              }, [])
            }

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: 2 }}>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
            sx={{ marginLeft: 2 }}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}

            count={orderHistory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
}



