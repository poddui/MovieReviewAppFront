import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Button from '@mui/material/Button';


const themeTh = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: '#171717',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '18px',
          color: '#b3b3b3'          
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#FFFFFF'          
        },
      },
    },
  },
});

const theme = createTheme({
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          backgroundColor: '#7F7F7F'
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '25px',
          fontWeight: 'bold',
        },
      },
    },
  },
});


function Row(props) {
  const { review } = props;
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={themeTh}>
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, '&:hover':{cursor:'pointer'} }} onClick={() => setOpen(!open)}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {review.name}
        </TableCell>
        <TableCell align="left">{review.release_year}</TableCell>
        <TableCell align="left">{review.director}</TableCell>
        <TableCell align="left">{review.category.name}</TableCell>
        <TableCell align="left">{review.user.username}</TableCell>
        <TableCell align="left">{review.rating} / 10</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor: '#D7D7D7', color: 'black', fontWeight: 'bold'}} colSpan={30}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography  gutterBottom component="div">
                <b>Arvostelu:</b> {review.user_review}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
    </ThemeProvider>
  );
}

function App() {
  const [reviews, setReviews] = useState([]); 
  useEffect(() => {
    fetch("http://localhost:8080/jsonmovies").then(
      (response) => {return response.json()}
    ).then((jsonreviews) => {
      console.log(jsonreviews);
      setReviews(jsonreviews)
    })
  },[]);

  return (
    <div id="bar">
      <h1 id="h1" >Movie reviews</h1>
      <div id="buttondiv">
        <Button variant="contained" color="success" onClick={() => {window.location.replace('https://moviereviewapp-7rje.onrender.com/');}}>Log in</Button>
      </div>
        <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Release Year</TableCell>
                <TableCell align="left">Director</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Reviewer</TableCell>
                <TableCell align="left">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews.map((review) => (
                <Row key={review.name} review={review} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </ThemeProvider>
    </div>
  );
}

export default App;
