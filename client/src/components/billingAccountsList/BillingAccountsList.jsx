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
  },
  media: {
    height: 220,
  },
};
let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
if(auth === null){
  window.href = './billingAccounts'
}

class BillingAccountsList extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      billingAccounts: [],
      tempBillingAccounts: [],
     
    }
  }

  componentDidMount() {
    fetch('/api/v1/billingAccounts')
      .then( response => response.json())
      .then( item => this.setState({ tempBillingAccounts: item })
    ); 
  }


  
  render() {
    let auth = JSON.parse(localStorage.getItem('mobdev2_auth'));
    let logginInUser = auth.user.id
    let prefix = "./billingAccounts/"
    const { classes } = this.props;
    if (this.state.tempBillingAccounts.length !== 0) {
      
       
      this.state.tempBillingAccounts.forEach(element => {
        console.log(element);
        if(element.user === logginInUser){
          this.state.billingAccounts.push(element);
        }
        console.log(this.state.billingAccounts)
      });

      return (
        <div className="row">
          {this.state.billingAccounts.map((element, i) => (
            
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3" key={i}>
              
        
              
              <Card className={classes.card} key={ element._id }>
                <CardMedia
                  className={classes.media}
                  image= {element._type.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2">
                    { element.title }
                  </Typography>
                  <Typography component="p">
                    € { element.savings }
                  </Typography>
                  <Typography component="p">
                    <a href=  {prefix + element._id }> test </a> 
                  </Typography>
                </CardContent>
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
          <h2>sorry but you don't have any cards yet, </h2>
          <h3> <a href="/billingAccount-create"> go make them at create billingAccount </a>  </h3>
        </div>
      )
    }   
  }
}

BillingAccountsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillingAccountsList);