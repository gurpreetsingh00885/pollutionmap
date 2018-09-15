import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
var L = window.L;

const styles = theme => ({
	map: {
		width: '100%',
		height: '100%',
	},
});

class PollutionToday extends Component {
  state = { mapObj: null, latitude: null, longitude: null }
  renderMap = () => {
  	var mymap = L.map('mapid').setView([28.4880472, 77.0653845], 19);
  	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(mymap);
  	mymap.locate({setView: true, minZoom: 19}).on('locationfound', (e) => {
		this.setState({mapObj: mymap, latitude: e.latitude, longitude: e.longitude});
		var marker = L.marker([e.latitude, e.longitude]).bindPopup('Your are here :)');
		mymap.addLayer(marker);
	});
  }

  componentDidMount() {
  	this.renderMap();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.map}>
      	<div id="mapid" className={classes.map}></div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PollutionToday);
