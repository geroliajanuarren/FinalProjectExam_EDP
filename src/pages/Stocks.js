import {React, useState}  from "react";
import Dashboard from "../components/dashboard";
import {Box, Button, TextField, Grid, styled, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Paper, MenuItem, Modal, Alert, Snackbar,}from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { SnackbarProvider, useSnackbar,} from 'notistack';


export default function Stocks({productlist, setProductList,  categ, setCateg}){
    const [updateSnackbarOpen, setUpdateSnackbarOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editProductValue, setEditProductValue] = useState("");

    const handleCloseUpdateSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setUpdateSnackbarOpen(false);
    };

    const UpdateSnackbar = () => {
        setUpdateSnackbarOpen(true);
    };


    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setEditProductValue({
            id: product.id,
            product: product.product,
            price: product.price,
            stocks: product.stocks,
            category: product.category
            
        });
    };

    const handleUpdateProduct = () => {
        const updatedProduct = productlist.map((product) =>
        product === selectedProduct
            ? { ...product, 
                id: editProductValue.id,
                product: editProductValue.product, 
                price: editProductValue.price,
                stocks: editProductValue.stocks,
                category: editProductValue.category,
            }
            : product
        );

        setProductList(updatedProduct);
        handleCloseModal(); // Close the modal after updating
        UpdateSnackbar();
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
        setEditProductValue("");
    };
          
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
        //  border: "2px black",
        },
    }));
    return(
        <>  

            <SnackbarProvider maxSnack={1}>
                <Box sx={{ display: 'flex',  justifyContent: 'center', width: '70%'}}>
                    <Box component="main" sx={{ flexGrow: 1, p: 2, backgroundColor: 'white', height: '77vh'}}>
                        <Box height={530} overflow="auto">
                            <Grid container />
                            <TableContainer component={Paper}>
                        
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>                            
                                        <StyledTableCell align="center">ID</StyledTableCell>
                                        <StyledTableCell align="center">PRODUCT</StyledTableCell>
                                        <StyledTableCell align="center">PRICE</StyledTableCell>
                                        <StyledTableCell align="center">STOCKS</StyledTableCell>
                                        <StyledTableCell align="center">CATEGORY</StyledTableCell>
                                        <StyledTableCell align="center">ACTION</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { productlist.map((product, index) => (
                                        <StyledTableRow key={index}>
                                        <StyledTableCell align="center">{product.id}</StyledTableCell>
                                        <StyledTableCell align="center">{product.product}</StyledTableCell>
                                        <StyledTableCell align="center">₱ {product.price}.00</StyledTableCell>
                                        <StyledTableCell align="center">{product.stocks}</StyledTableCell>
                                        <StyledTableCell align="center">{product.category}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Stack direction="row" spacing={1}  style={{width: "85%", alignItems: "center", height: 49, justifyContent: 'end', marginLeft: '-32px' }}>
                                                <Button variant="contained" size="small" color="success" sx={{p: 1, width: "50%", }} type="submit" onClick={() => handleEditProduct (product)}><ModeEditOutlineOutlinedIcon sx={{marginLeft: '-10px', marginRight: '2px  '}}/>Edit</Button>
                                            </Stack>
                                        </StyledTableCell>
                                        
                                        </StyledTableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Grid/>
                        </Box>

                            <Modal
                                open={Boolean(selectedProduct)}
                                onClose={handleCloseModal}
                                aria-labelledby="modal-title"
                                aria-describedby="modal-description"
                            >
                                <div
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    background: "white",
                                    padding: "20px",
                                    outline: "none",
                                    width: "22%"
                                    
                                }}
                                >
                                <h2 id="modal-title">Edit Product</h2>
                                <Grid item xs={12} sm={6}>
                                <TextField
                                    disabled
                                    label="ID"
                                    variant="outlined"
                                    fullWidth
                                    sx={{marginBottom: 1, color: 'primary'}}
                                    value={editProductValue.id}
                                    onChange={(e) => setEditProductValue({...editProductValue, id: e.target.value})}
                                />
                                <TextField
                                    disabled
                                    label="Product"
                                    variant="outlined"
                                    fullWidth
                                    sx={{marginBottom: 1}}
                                    value={editProductValue.product}
                                    onChange={(e) => setEditProductValue({...editProductValue, product: e.target.value})}
                                />
                                <TextField
                                    disabled
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    sx={{marginBottom: 1}}
                                    value={editProductValue.price}
                                    onChange={(e) => setEditProductValue({...editProductValue, price: e.target.value})}
                                />
                                <TextField
                                    label="Stocks"
                                    variant="outlined"
                                    fullWidth
                                    sx={{marginBottom: 1}}
                                    value={editProductValue.stocks}
                                    onChange={(e) => setEditProductValue({...editProductValue, stocks: e.target.value})}
                                />
                                <TextField
                                    disabled
                                    required
                                    id="Select Categoty"
                                    select
                                    sx={{width:"100%"}}
                                    value={editProductValue.category}
                                    onChange={(e) => setEditProductValue({...editProductValue, category: e.target.value})}
                                >
                                    {categ.map((item) => (
                                        <MenuItem key={item.id} value={item.categories}>
                                            {item.categories}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                </Grid>
                                <br/>
                                <Button variant="contained" color="primary" sx={{marginTop: 1, marginBottom: 1,}} onClick={handleUpdateProduct}>
                                    Update
                                </Button>
                                </div>
                            </Modal>
                      
                        <Snackbar
                            open={updateSnackbarOpen}
                            autoHideDuration={1000}
                            onClose={handleCloseUpdateSnackbar}
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }} 
                            
                            >
                            <Alert onClose={handleCloseUpdateSnackbar} sx={{ width: '100%', backgroundColor: 'green', color: 'white'}}  
                            iconMapping={{ success: <CheckCircleOutlineIcon style={{ color: 'white' }} /> }}
                            >
                            Product updated successfully!
                            </Alert> 
                        </Snackbar> 
                    </Box>
                </Box>
            </SnackbarProvider>
        </>
    );
}