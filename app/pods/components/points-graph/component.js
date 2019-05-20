import Component from '@ember/component';
import $ from 'jquery';

/**
 * You can use any Browserify compatible NPM module you wish.
 *
 * Example:
 * ember install lodash moment
 *
 * import _ from 'npm:lodash';
 * import moment from 'npm:moment';
 **/



/**
 * Component to plot user data.
 *
 * @module Component
 * @class PointsGraphComponent
 * @extends Ember.Component
 **/

export default Component.extend({
	classNames: ['points-graph'], // Class styling in /app/styles/components/points-graph.scss

	/**
	 * Ember component hook
	 *  
	 **/

	didReceiveAttrs() {
		this._super(...arguments);

		let sets = this.userData.sets;
		let points = this.userData.points;
		let options = this.createChartOptions(sets);

		this.datasets = this.addDataAttribute(options, points);
	},

	/**
	 * Ember hook called when the component is inserted into the DOM
	 **/

	didInsertElement() {
		this.draw(this.datasets);
	},

	/**
	 * Returns an array of chart options for each dataSet
	 * 
	 * @method createChartOptions
	 * @param {Array} dataSets A collection of data sets
	 * @returns {Array} A collection of Chart.js dataset objects
	 **/

	createChartOptions(dataSets) {
		let results = new Array();
	
		dataSets.forEach((item, index) => {
		let options = new Object();
	
		options.backgroundColor = item.color;
		options.borderColor     = item.color;
		options.fill            = false;
		options.label           = item.name;

		results.push(options);
	});

	return results;
},

	/**
	 * Add filtered and sorted dataPoints to the associated dataset
	 *
	 * @method addDataAttribute
	 * @param {Array} chartOptions A collection of Chart.js dataset objects
	 * @param {Array} dataPoints A collection of data points for multiple users
	 * @returns {Array} The mutated collection of Chart.js dataset objects
	 **/

	addDataAttribute(chartOptions, dataPoints) {
		chartOptions.forEach((item, index) => {
			item.data = dataPoints.filterBy('name', item.label).sortBy('x');
		});

		return chartOptions;
	},

	/**
	 * Draw data on canvas
	 *
	 * @method draw
	 * @param {Array} datasets A collection of Chart.js dataset objects
	 **/

	draw(datasets) {
		let $canvas = this.$('canvas'); // jQuery reference to the canvas element in template.hbs

		/**
		 * TODO:
		 *
		 * You may break the code into as many or few functions as you wish.
		 * Fetch data from "http://localhost:4200/data/user-data.json".
		 * Plot data on the canvas. See /public/images/graph.png for an example
		 *   - Each point should have a solid circle of the corresponding set color defined in user-data.json.
		 *   - Points in the same set should be connected sequentially by lines of the corresponding set color.
		 *   - You may use any library to draw on the canvas or call the canvas functions directly.
		 **/

		// Setup Chart.js configuration
		let config = {
			type: 'line',
			data: {
				datasets: datasets
			},
			options: {
				scales: {
					xAxes: [{
						type: 'linear',
						position: 'bottom'
					}]
				}
			}
		};
    
		// Render the chart
		new Chart($canvas, config);
	}


});
