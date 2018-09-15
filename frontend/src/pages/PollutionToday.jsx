import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
var L = window.L;
var d3 = window.d3;

const styles = theme => ({
	map: {
		width: '100%',
		height: '100%',
	},
});

class PollutionToday extends Component {
  state = { mapObj: null, latitude: null, longitude: null };

  generateHexLayer = () => {
  	var center = [28.4880472, 77.0653845];
  	var options = {
    	opacity: 0.5,
	};
  	var hexLayer = L.hexbinLayer(options).addTo(this.state.mapObj);
	hexLayer.colorScale().range(['white', 'red']);

	hexLayer
  		.radiusRange([12, 12])
		.lng(function(d) { return d[0]; })
  		.lat(function(d) { return d[1]; })
  		.colorValue(function(d) { return 1.5; })
  		.radiusValue(function(d) { return d.length; });

	var latFn = d3.randomNormal(center[0], 0.001);
	var longFn = d3.randomNormal(center[1], 0.001);

	var generateData = function(){
    	var data = [];
    	for(let i=0; i<2000; i++){
        	data.push([longFn(),  latFn()]);
    	}
    	hexLayer.data(data);
  	}
  	generateData()
  }

  renderMap = () => {
  	var mymap = L.map('mapid').setView([28.4880472, 77.0653845], 16);
  	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(mymap);
  	mymap.locate({setView: true}).on('locationfound', (e) => {
		this.setState({mapObj: mymap, latitude: e.latitude, longitude: e.longitude}, () => this.generateHexLayer());
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
