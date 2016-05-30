(function(){

  var model = raw.models.line();
  // var x = model.dimension()
  //   .title('X Axis')
  //   // .types(Number);
  // var y = model.dimension()
  //   .title("Y Axis")
  //   // .types(Number);
  // model.map(function(data) {
  //   return data.map(function(d) {
  //       return {
  //           x : +x(d),
  //           y : +y(d)
  //       }
  //   })
  // });
  var chart = raw.chart();
  chart.model(model);
  chart.title("Simple Line Chart")
    .description("A simple Line chart to visualize two dimensional data")
  .thumbnail("imgs/line.png")
  .category("Basic");

  // define dimensions of graph
	var m = [20, 20, 20, 20]; // margins
	var w = 900 - m[1] - m[3]; // width
	var h = 600 - m[0] - m[2]; // height

  var xScaling = d3.scale.ordinal()
      .rangeRoundBands([0, w], .1);

  var yScaling = d3.scale.linear()
      .range([h, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScaling)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(yScaling)
      .orient("left")
      .ticks(10, "%");

  chart.draw(function (selection, data){
    // X scale will fit all values from data[] within pixels 0-w
    xScaling.domain(data.map(function(d) { return d.x; }));
    yScaling.domain([0, d3.max(data, function(d) { return d.y; })]);
			// automatically determining max range can work something like this
			// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);
		// create a line function that can convert data[] into x and y points
		var line = d3.svg.line()
			// assign the X function to plot our line as we wish
			.x(function(d) {
				// verbose logging to show what's actually being done
				// console.log('Plotting X value for data point: ' + d.x + ' to be at: ' + xScale(d.x) + ' using our xScale.');
				// return the X coordinate where we want to plot this datapoint
				return xScaling(d.x);
			})
			.y(function(d) {
				// verbose logging to show what's actually being done
				// console.log('Plotting Y value for data point: ' + d.y + ' to be at: ' + yScale(d.y) + " using our yScale.");
				// return the Y coordinate where we want to plot this datapoint
				return yScaling(d.y);
			})
			// Add an SVG element with the desired dimensions and margin.
			var graph = selection
			      .attr("width", w + m[1] + m[3])
			      .attr("height", h + m[0] + m[2])
            .attr("class","line")
			    .append("svg:g")
			      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
			// create yAxis
			// var xAxis = d3.svg.axis().scale(xScale).tickSize(-h).tickSubdivide(true);
			// Add the x-axis.
			graph.append("svg:g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + h + ")")
			      .call(xAxis);
			// create left yAxis
			// var yAxisLeft = d3.svg.axis().scale(yScale).ticks(10).orient("left");
			// Add the y-axis to the left
			graph.append("svg:g")
			      .attr("class", "y axis")
			      .attr("transform", "translate(-25,0)")
			      .call(yAxis);

  			// Add the line by appending an svg:path element with the data line we created above
			// do this AFTER the axes above so that the line is above the tick-lines
  			graph.append("svg:path").attr("d", line(data));
  })

})();
