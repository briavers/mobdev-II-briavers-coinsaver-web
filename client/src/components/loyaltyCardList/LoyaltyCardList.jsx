import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Material UI
*/
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

/*
Styles
*/
const styles = {
  card: {
    borderRadius: 10,
    boxShadow: 'none'
  },
  media: {
    height: 270,
    borderRadius: 10,
  },
};
let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
let admin = false;
let logginInUser = undefined;

if (auth === null) {
  window.href = './home'
} else if (auth.user === null) {

} else if (auth.user === undefined) {
  admin = auth.isAdmin;
  logginInUser = auth.id
} else {
  admin = auth.user.isAdmin;
  logginInUser = auth.user.id;
}
class LoyaltyCardsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      loyaltyCards: [],
      tempLoyaltyCards: []
    }
  }

  componentDidMount() {
    fetch('/api/v1/loyaltyCards')
      .then( response => response.json())
      .then(item => this.setState({ tempLoyaltyCards: item })); 
  }
  
  render() {
    this.state.loyaltyCards = []
    if (this.state.tempLoyaltyCards.length !== 0) {


      this.state.tempLoyaltyCards.forEach(element => {
        //console.log(element);
        if (element.user === logginInUser) {
          this.state.loyaltyCards.push(element);
        }
        //console.log("this.state.loyaltyCards", this.state.loyaltyCards)
      });
    }
  
  
    let prefix = "./uploads/loyaltyCards/"
    const { classes } = this.props;
    if (this.state.loyaltyCards.length !== 0) {
      //console.log(this.state.loyaltyCards, "this are the loyaltyCard accounts")
      return (
        <div className="row">
          {this.state.loyaltyCards.map((element, i) => (
            
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
              <Card className={classes.card} key={ element._id }>
                <CardMedia
                  className={classes.media}
                  image={prefix + element.storeImg}
                  title="Contemplative Reptile"
                />
                <CardActions>
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className='sorryDiv'>
          <h2>sorry but you don't have any loyalty cards yet, </h2>
          <h3> <a href="/loyaltyCard-create"> go make them at create loyaltyCard </a>  </h3>
        </div>
      )
    }   
  }
}

LoyaltyCardsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoyaltyCardsList);