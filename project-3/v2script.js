//Creating lines to connnect the dots
// https://www.dashingd3js.com/svg-paths-and-d3js


var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = window.innerWidth - 100,
    height = window.innerHeight/2 - 100;


var xValue = function(d) { return d.Year;}, // data -> value
    xScale = d3.scaleLinear().range([0, width]), // value -> display
    xMap = function(d) { return xScale(xValue(d));}, // data -> display
    xAxis = d3.axisBottom()
              .tickFormat(d3.format("d"))
              .scale(xScale);

// setup y
var yValue = function(d) { return d.Gini}, // data -> value
    yScale = d3.scaleLinear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.axisLeft()
            .tickValues([30, 35, 40, 45, 50, 55])
            .scale(yScale);
            
    var mapLine = d.country;
   
 // setup fill color
var cValue = function(d) { return d.Country;},
    color = d3.scaleOrdinal(d3.schemeAccent);

    
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// var country = data.Country;

var lineFunction = d3.line()
                //   mapLine.forEach(function(dat){
                   .y(function(d) {return yMap(d) })
                   .x(function(d) {return xMap(d) })
                   .curve(d3.curveLinear);
                //   });
                   
// .style("fill", function(d) { return color(cValue(d));}) 

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("color", "white");

// var line = d3.line()
//     .x(function(d) { return xAxis(d.Year); })
//     .y(function(d) { return yAxis(d.Gini); });

d3.csv('/project-3/data/ginifrompg316ssa.csv', function(error, data) {
    
  //sets the paramaters for filtering: There were values of 0 which wern't accurate  
  data = data.filter(function(d) { return d.Year*1 > 1986 && +d.Year < 2015 && d.Gini*1 != 0 && d.Gini*1<60; });
    //using nest method to take average of each year of values
    // http://learnjsdata.com/group_data.html
    var databyYear = d3.nest()
        .key(function(d) { return d.Year; })
        .key(function(d) { return d.Country; })
        .rollup(function(v) { return d3.mean(v, function(d) { return d.Gini; }); })
        .entries(data);
        console.log(JSON.stringify(databyYear));

  // change string (from CSV) into number format
//   yScale.domain([0, d3.max(data, function(d) { return d.Gini*1; })]);
      
//   data = data.filter(function(d) { if(d.Year.count>1){return d.Gini/d.Year.Count});
        
  data.forEach(function(d) {
    // function year (d) { 
    // d.Year = d.filter(function(d) { if (d.Year*1>1990){return +d.Year}})
    //http://learnjsdata.com/group_data.html
    d.Year = +d.Year;
    d.Gini = +d.Gini;
//    console.log(d);
    //if there's more than one value for each year, add those values and divide by n
    console.log(d.Year==d.Year);
  });
  
  // don't want dots overlapping axis, so add in buffer to data domain
  // this is where I can manipulate my axies in order to start something at 0 etc.
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([30, 55]); 
  
  // x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Year");
      

      
    // y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    //   .style("fill", "black")
      
      

    // .append("text")
    //   .attr("class", "label")
    //   .attr("transform", "rotate(-90)")
    //   .attr("y", 10)
    //   .attr("dy", ".71em")
    //   .style("text-anchor", "end")
    //   .text("Gini");
   //draw lines
   
//   svg.append("path")
//       .attr("class", "line")
//       .attr("d", lineFunction(data));
  var g = svg.append('g');
   
  var lineGraph =     g.append("path")
                      .attr("d", lineFunction(data))
                      .attr("transform", "translate(0,0)")
                      .attr("stroke", "white")
                      .attr("stroke-width", .1)
                      .attr("fill", "none");
      
// draw dots
  svg.selectAll(".dot")
      .data(data)
      .enter().append("circle")
    //   .filter(function(d) { if (d.Year>1990){return d}})
      .attr("class", "dot")
      .attr("r", 5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", function(d) { return color(cValue(d));}) 
      .on("mouseover", function(d) {
          tooltip.transition()
               .duration(200)
               .style("opacity", .9)
               //This changed fill of tooltip text
               .style("fill", "white");
          tooltip.html(d["Country"] + "<br/> (" + xValue(d) 
	        + ", " + yValue(d) + ")")
              .style("left", (d3.event.pageX + 5) + "px")
              .style("top", (d3.event.pageY+ 20) + "px");
      })
      
     .on("mouseout", function(d) {
          tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      });
      
// draw legend
  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // draw legend colored rectangles
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  // draw legend text
  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d;})      
  
});