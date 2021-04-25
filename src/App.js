import './App.css';
import { Typography, Container, TextField, Button, Box, Card, CardContent, makeStyles, CssBaseline } from '@material-ui/core';
import {useState} from "react";
import Axios from 'axios'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/';
import { Fragment } from 'react';

const usestyles = makeStyles((_theme) => ({
  hero: {
    backgroundImage: `url('https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  }
}));

function App() {

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] =useState("");

  const [recipes, setRecipes] = useState([]);


  const addRecipe = () => {
    Axios.post("http://localhost:3001/create", {
      name: name, 
      ingredients: ingredients,
      instructions: instructions
    }).then(() => {
      console.log("success");
    });
  };

  const getRecipes = () => {
    Axios.get("http://localhost:3001/recipes").then((response) => {
      setRecipes(response.data);
    });
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#c6ff00',
      },
    },
  });

  

  const classes = usestyles();

  return (
    <Fragment>
     <Box className={classes.hero}>
      <Box>
        <CssBaseline/>
        <Typography variant="h1">Jouni's recipes</Typography>
      </Box>
    </Box>
    
    <ThemeProvider theme={theme}>
    <Container maxWidth="sm">
      <form noValidate autoComplete="off"> 
        <TextField id="outlined-basic" label="Recipe name" variant="outlined" fullWidth margin='normal'onChange={(event) => {
          setName(event.target.value);
        }}/>
        <TextField id="outlined-multiline-static" label="Ingredients" multiline rows={5} variant="outlined" fullWidth margin='normal'onChange={(event) => {
          setIngredients(event.target.value);
        }}/>
        <TextField id="outlined-multiline-static" label="Instructions" multiline rows={5} variant="outlined" fullWidth margin='normal'onChange={(event) => {
          setInstructions(event.target.value);
        }}/>
        
        <Button color="secondary" onClick={addRecipe} variant="contained">Add recipe</Button>
      </form>
      <div>
        <Box mt={10} mb={1}>
          <Button color="secondary" onClick={getRecipes} mt={2} variant="contained">Show recipes</Button>
        </Box>

        {recipes.map ((val, key) => {
          return <Box mt={2}>
            <Card variant="outlined">
            <CardContent>
              <div className="recipe">
              <Typography variant="h4">{val.name}</Typography><br></br>
              <Typography variant="h5">Ingredients:</Typography> 
              <Typography variant="body1">{val.ingredients}</Typography><br></br>
              <Typography variant="h5">Instructions:</Typography> 
              <Typography variant="body1">{val.instructions}</Typography>
              </div>
            </CardContent>
            </Card>
            </Box>
        })}
      </div>
      <Box mb={20}></Box> 
    </Container>
    </ThemeProvider>
    </Fragment>
  );
}

export default App;
