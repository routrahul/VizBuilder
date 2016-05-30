(function(){

  var model = raw.model();
  var x = model.dimension()
    .title('X Axis')
    .types(Number);
  var y = model.dimension()
    .title("Y Axis")
    .types(Number);
  model.map(function(data) {
    return data.map(function(d) {
        return {
            x : +x(d),
            y : +y(d)
        }
    })
  });
  var chart = raw.chart();
  chart.model(model);
  chart.title("Simple Bar Chart")
    .description("A simple bar chart to visualize two dimensional data")
  .thumbnail("imgs/bar.png")
  .category("Basic");

    // Width

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
	// var width = chart.number()
	// 	.title('Width')
	// 	.defaultValue(900)
  //
	// // Height
	// var height = chart.number()
	// 	.title('Height')
	// 	.defaultValue(600)

	// A simple margin
	// var margin = chart.number()
	// 	.title('margin')
	// 	.defaultValue(50)

  var xScaling = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

  var yScaling = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(xScaling)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(yScaling)
      .orient("left")
      .ticks(10, "%");

    // Drawing function
  	// selection represents the d3 selection (svg)
  	// data is not the original set of records
  	// but the result of the model map function
  	chart.draw(function (selection, data){
      xScaling.domain(data.map(function(d) { return d.x; }));
      yScaling.domain([0, d3.max(data, function(d) { return d.y; })]);
  		// svg size

  		selection.attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
      selection.append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  		selection.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

      selection.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end");

      selection.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return xScaling(d.x); })
          .attr("width", xScaling.rangeBand())
          .attr("y", function(d) { return yScaling(d.y); })
          .attr("height", function(d) { return height - yScaling(d.y); });

  	})

})();
