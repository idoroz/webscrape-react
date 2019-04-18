import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import liked from './likedHeart.png';
import heart from './outlineHeart.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginLeft: 'auto',
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});


export class ApartmentBox extends Component {

constructor(props) {
  super(props);
  this.state = {
    details : []
  }

}


  render() {

  // console.log(this.props)
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}  justify="center"
  alignContent="center">
          <Grid item>
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs container direction="row" alignContent= "center" >
                    <Grid item xs>
                <Typography style={{ cursor: 'pointer', margin: '10%' }}>
<img alt="complex" src={this.props.liked ? liked : heart}  onClick = {() => this.props.onLike(this.props)} />
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography color="textSecondary">גודל: {this.props.size + ' מ"ר'}</Typography>
                 <Typography color="textSecondary">חדרים: {this.props.rooms}</Typography>
                  <Typography color="textSecondary">קומה: {this.props.floor}</Typography>
              </Grid>
                  <Grid item xs>
                <Typography direction="rtl" style={{letterSpacing: '0', marginRight: '5%', }} gutterBottom variant="subtitle1">
                 {this.props.title}
                </Typography>
                          <Typography gutterBottom variant="subtitle2" style={{letterSpacing: '0', marginRight: '5%' }}>
                 {'₪ '+this.props.price}
                </Typography>
              </Grid>
      
            </Grid>
            <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={this.props.thumbImg} />
            </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  }
}


ApartmentBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApartmentBox);