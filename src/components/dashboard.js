import * as React from 'react';
import { useState } from 'react';
import { useTheme, Box } from '@mui/material';
import { UseApp } from './statnav';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClassIcon from '@mui/icons-material/Class';
import PaidIcon from '@mui/icons-material/Paid';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import InventoryIcon from '@mui/icons-material/Inventory';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Category from '../pages/Category';
import Stocks from '../pages/Stocks';
import Transaction from '../pages/Transaction';
import Report from '../pages/Report';

export default function Dashboard() {
    const theme = useTheme();
    const open = UseApp ((state) => state.Nopen);

    const [value, setValue] = useState('0');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(value)

    const [productlist, setProductList] = useState ([]);
    const [categ, setCateg] = useState([]);        
    const [count, setCount] = useState (1) 
    const [countcateg, setCountCateg] = useState (1) 
    const [transaction, setTransaction] = useState ([]); 
    const [checkeditem, setCheckedItem] = useState ([]) 
    const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(true);
    const [orderHistory, setOrderHistory] = useState([]);


    // -------------CLOSING-------------- //

    return (
    <Box style={{flexDirection: 'column' }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab icon={<HomeIcon />} label="Home" />
                <Tab icon={<ShoppingCartIcon />} label="Product" />
                <Tab icon={<ClassIcon />} label="Category" />
                <Tab icon={<PaidIcon />} label="Transactions" />
                <Tab icon={<LeaderboardIcon />} label="Stocks" />
                <Tab icon={<InventoryIcon />} label="Report" />
            </Tabs>
        <Box component="main" sx={{ flexGrow: 1, p: 3,  }}>
            <TabContext value={value.toString()}>
                <TabPanel value="0">
                    <h1 style={{marginTop: -30}}>DASHBOARD</h1>
                    <Home sx={{width: 100}} categ={categ} productlist = {productlist}/>
                </TabPanel>
                <TabPanel value="1">
                    <h1 style={{marginTop: -25}}>PRODUCT</h1>
                    <Product categ={categ} productlist = {productlist} setProductList = {setProductList} setCount = {setCount} count = {count}/>
                </TabPanel>
                <TabPanel value="2">           
                    <h1 style={{marginTop: -25}}>CATEGORY</h1>
                    <Category setCateg={setCateg} categ={categ} setCountCateg = {setCountCateg} countcateg = {countcateg}/>
                </TabPanel>
                <TabPanel value="3">
                    <h1 style={{marginTop: -25}}>TRANSACTION</h1>
                    <Transaction productlist = {productlist} setProductList = {setProductList} transaction = {transaction} setTransaction = {setTransaction} setCheckedItem={setCheckedItem} checkeditem={checkeditem} setIsCheckoutDisabled={setIsCheckoutDisabled} isCheckoutDisabled={isCheckoutDisabled} orderHistory={orderHistory} setOrderHistory={setOrderHistory}/>
                </TabPanel>
                <TabPanel value="4">
                    <h1 style={{marginTop: -25}}>STOCKS</h1>
                    <Stocks productlist = {productlist} setProductList = {setProductList} setCateg={setCateg} categ={categ} />
                </TabPanel>
                <TabPanel value="5">
                    <h1 style={{marginTop: -25}}>REPORTS</h1>
                    <Report orderHistory={orderHistory} setOrderHistory={setOrderHistory} />
                </TabPanel>
            </TabContext>
        </Box>
    </Box>

     

 

    );
}