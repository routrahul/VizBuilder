(function(){
  var graph = raw.models.graph();

	var chart = raw.chart()
		.title('Force Directed Graph')
		.description(
            "Force-directed graph drawing algorithms are a class of algorithms for drawing graphs in an aesthetically pleasing way. Their purpose is to position the nodes of a graph in two-dimensional or three-dimensional space so that all the edges are of more or less equal length and there are as few crossing edges as possible, by assigning forces among the set of edges and the set of nodes, based on their relative positions, and then using these forces either to simulate the motion of the edges and nodes or to minimize their energy, it is inspired by <a href='http://bl.ocks.org/mbostock/4062045'>http://bl.ocks.org/mbostock/4062045</a>")
		.thumbnail("imgs/force.png")
		.category("Correlations")
		.model(graph)

	var width = chart.number()
		.title("Width")
		.defaultValue(1000)
		.fitToWidth(true)

	var height = chart.number()
		.title("Height")
		.defaultValue(500)

	var nodeRadius = chart.number()
		.title("Node Width")
		.defaultValue(5)

	var sortBy = chart.list()
        .title("Sort by")
        .values(['size','name','automatic'])
        .defaultValue('size')

	var colors = chart.color()
		.title("Color scale")

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(30)
      .size([width(), height()]);
  var color = d3.scale.category20();

  chart.draw(function (selection, graph){
    selection
    .attr("width", width)
    .attr("height", height)
    .attr("class","force");

    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = selection.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = selection.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });

  })
})();
