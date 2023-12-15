import React from 'react';
import { Box } from "@mui/system";
import { Card, Grid, CardContent, Typography, CardActionArea, ListItemIcon } from '@mui/material';
import { BarChart} from '@mui/x-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import orderHistory from './Report';
import 'core-js/features/array/flat-map';



export default function Home({ categ, productlist }) {
  const totalProducts = productlist;
  const numberOfReports = orderHistory.length;
  

  const uniqueCategories = [...new Set(productlist.map(p => p.category))];

  

  const hasStocks = uniqueCategories.some(category => {
    const stocksData = productlist.filter(p => p.category === category).map(p => p.stocks);
    return stocksData.some(stock => stock > 0);
  });

  const options = {
    chart: {
      id: "basic-bar"
    },
    animate: {
      duration: 1000, // Animation duration in milliseconds
      easing: 'easeInOut', // Easing function for the animation
    },
    annotations: {
      annotations: {
          yaxis: [
            {
              y: 50, // Adjust this value based on where you want the first line
              borderColor: '#FF0000', // Color of the first line
              label: {
                borderWidth: 0,
                style: {
                  color: '#fff', // Color of the label text for the first line
                },
              },
            },
            {
              y: 75, // Adjust this value based on where you want the second line
              borderColor: '#00FF00', // Color of the second line
              label: {
                borderWidth: 0,
                style: {
                  color: '#fff', // Color of the label text for the second line
                },
              },
            },
            // Add more objects for additional lines as needed
          ],
        }
    }
  };
  const series = uniqueCategories.map(category => ({
    name: category,
    data: productlist
      .filter(p => p.category === category)
      .map(p => p.stocks),
    area: true,
  label:  `${category}`,
  }));
  

  return (
    <>
      <Box display={"flex"}>
        <Box component="main" height={230}  sx={{ flexGrow: 1, p: 2, }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Card sx={{ maxWidth: 340, height: 150, marginTop: '20px', justifyContent: "center", alignItems: "center",  }}>
                <CardActionArea sx={{ backgroundColor: "black",}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" sx={{color: 'white', marginLeft: 2 }}>
                       Products
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                <CardActionArea>
                  <CardContent>
                    <CardContent>
                        <ListItemIcon
                          sx={{
                          minWidth: 0,
                          justifyContent: 'center',
                          marginTop: '-6px'
                          }}
                        >
                          
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px',}}>
                              {/* Total Products: {categoryProducts.length} */}
                              Total Products: {totalProducts.length}
                          </Typography>
                        </ListItemIcon> 
                         
                    </CardContent>
                  </CardContent>
                      
                </CardActionArea>
              </Card>
            </Grid>           

            <Grid item xs={12} sm={3}>
              <Card sx={{ maxWidth: 340, height: 150, marginTop: '20px', justifyContent: "center", alignItems: "center" }}>
                <CardActionArea sx={{ backgroundColor: "black",}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" ccomponent="div" sx={{color: 'white', marginLeft: 2 }}>
                          {/* {category.categories} */}
                          Categories
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActionArea>
                  <CardContent>
                    <CardContent>
                      <ListItemIcon
                        sx={{
                        minWidth: 0,
                        justifyContent: 'center',
                        marginTop: '-6px'
                      }}
                      >
                        
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px'}}>
                          Total Categories: {categ.length}
                            
                        </Typography>
                      </ListItemIcon> 
                    </CardContent>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Card sx={{ maxWidth: 340, height: 150, marginTop: '20px', justifyContent: "center", alignItems: "center" }}>
                <CardActionArea sx={{ backgroundColor: "black",}}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" ccomponent="div" sx={{color: 'white', marginLeft: 2 }}>
                          {/* {category.categories} */}
                          Reports
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActionArea>
                  <CardContent>
                    <CardContent>
                      <ListItemIcon
                              sx={{
                                minWidth: 0,
                                justifyContent: 'center',
                                marginTop: '-6px'
                              }}
                              >
                          
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px',}}>
                              Total Reports: {numberOfReports}
                          
                          </Typography>
                      </ListItemIcon> 
                    </CardContent>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>


          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
            <Card height={450} width={500}  sx={{  marginTop: '20px',  justifyContent: "center", alignItems: "center", width:'90%'}}>
                <BarChart
                      xAxis={[{ scaleType: 'band', data: ['Item 1', 'Item 2', 'Item 3']}]}
                      series={[{ data: [4, 3, 1] }]}
                      width={900}
                      height={400}
                    />
              </Card>
            </Grid>

            <Grid item xs={12} sm={5}>
            <Card height={450} width={100}  sx={{  marginTop: '20px',  justifyContent: "center", alignItems: "center", marginRight: "30px" }}>
            {hasStocks ? (
                 <LineChart
                 options={options}
                 series={series}
                 MaxWidth={620}
                 height={474}
               />
              ):(
                <Typography variant="body2" color="text.secondary"  sx={{height: '470px', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5px',}}>
                No stocks available.
              </Typography>
              )}
              </Card>
            </Grid>
          </Grid>

        </Box>  
      </Box>
    </>
  );
}
