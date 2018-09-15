import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class PollutionToday extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
      	Pollution Today
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PollutionToday);
