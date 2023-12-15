import React from "react";
import Dashboard from "./components/dashboard";
import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Open Sans',
      'sans serif'
    ].join(','),
  },});


function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
      <div style={{height: "100vh", backgroundColor: "#eeee"}}>
        <Dashboard/>  

      </div>
    </ThemeProvider>
    </>
  );
}

export default App;
