import React, { Component } from 'react';

/*
Libraries
*/
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

/*
Material UI
*/
import { MuiThemeProvider, createMuiTheme, lightBaseTheme } from 'material-ui/styles';
import './App.css';

/*
Layouts
*/
import Main from './layouts/main/Main';

/*
Configuration
*/
import config from './config.json';

/*
State management via Redux
*/
import store from './store';

/*
Auth state
*/
import { AUTHENTICATED, UNAUTHENTICATED } from './constants';
let auth = localStorage.getItem('mobdev2_auth');
let authParse = JSON.parse(auth)

console.log('auth message', authParse)

export function checkAuth(){

  let auth = localStorage.getItem('mobdev2_auth');
  console.log(auth)
  const authParse = auth == null ? {message: "User Not Authenticated"} : JSON.parse(auth)
  console.log('auth message', authParse)
  if (authParse.message !== "User Not Authenticated") {
  store.dispatch({ type: AUTHENTICATED, payload: JSON.parse(auth) });
  console.log("user is AUTHENTICATED")
  } else {
    store.dispatch({ type: UNAUTHENTICATED });
    console.log("user is NOT AUTHENTICATED")
  }
}
checkAuth();
/*
Theme
*/
const theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style shee
      root: { // Name of the rule
        color: 'white',
        backgroundColor: '#F4BF19',
        '&:hover': {
          backgroundColor: '#F4B219', // Some CSS
        }          
      }
    }, 
    MuiInput: {
      input: { // Name of the rule
          color: 'black',
          backgroundColor: 'white',
          padding: '20px',
          boxSizing: "border-box",


      },
      inputMultiline: { // Name of the rule
          padding: '20px',
          boxSizing: "border-box",


      },
      fullWidth: {
        position: 'relative',
        left: '15%',
        width: '85%' ,


      }
    },
    

    
    MuiPaper: {
      root: { // Name of the rule
          color: 'white',
          backgroundColor: 'transparant',

      },
      elevation2:{
        boxShadow: 'none'
      },
      rounded: {
       borderRadius: '10px'
      }
    },
    
    MuiTypography: {
      subheading: { // Name of the rule
          color: 'white',
          backgroundColor: 'transparant',

      },
      headline: {
         color: '#151439',
      },
      body1: {
         color: '#151439',
      }
    },
    
    MuiListSubheader: {
      root: { // Name of the rule
          color: 'white',
          backgroundColor: 'transparant',

      },
      sticky:{
        marginTop: '30px',
      }
    },

    MuiListItemIcon: {
      root: { // Name of the rule
          color: 'white',
          backgroundColor: 'transparant',
      },
    },
    MuiListItem: {
      root: {
        color: 'white',
        '&:hover': {
          backgroundColor: '#151439', // Some CSS
          Color: 'white', // Some CSS
        }
      },
      button: { // Name of the rule

        '&:hover': {
          backgroundColor: '#151439', // Some CSS
          Color: 'white', // Some CSS
        }
      },
    },

    MuiIconButton: {
      root: { // Name of the rule
          color: 'white',
          backgroundColor: 'transparant',
      }
    },
    MuiMenuItem: {
      root: { // Name of the rule
          color: '#151439',
          backgroundColor: 'White',
      }
    },

    MuiDialog: {
      paperWidthSm: { // Name of the rule
       
          backgroundColor: 'white',
      }
    },




    MuiCardContent: {
      root: { // Name of the rule
         
          backgroundColor: 'white',
          borderRadius: "0 0 10px 10px"
      }
    },
    MuiDivider: {
      root: { // Name of the rule
          backgroundColor: 'transparent',
          

      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: { // Name of the rule
         borderRightColor: 'white',
          

      }
    },
    MuiTableCell: {
      head: { // Name of the rule
         color: '#F4B219',
      },
      body: { // Name of the rule
         color: 'white',
      },
      numeric: { // Name of the rule
         textAlign: 'left',
      },
    },
    


  },
});
class App extends Component {
  render() {    
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <Main />
          </MuiThemeProvider>
        </Router>
      </Provider>
    );
  }
}

export default App;
