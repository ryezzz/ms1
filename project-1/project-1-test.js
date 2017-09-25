var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var xValue = function(d) { 
    if (d.Country == "Thailand" && d.Year>= 1993){
                  return d.Year
    }
    ;}, // data -> value
    xScale = d3.scaleLinear().range([0, width]), // value -> display
    xMap = function(d) { 
        
        if (d.Country == "Thailand" && d.Year>= 1993){
        return xScale(xValue(d));    
        }
    }, // data -> display
    xAxis = d3.axisBottom().scale(xScale);
    
var yValue = function(d) { 
    if (d.Country == "Thailand" && d.Year>= 1993){
                  return d.Gini;
    }
    }, // data -> value
    yScale = d3.scaleLinear().range([height, 0]), // value -> display
    yMap = function(d) { return yScale(yValue(d));}, // data -> display
    yAxis = d3.axisLeft().scale(yScale);
    
// setup fill color
var cValue = 'red';
    
// add the graph canvas to the body of the webpage
var svg = d3.select("#lineChart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// add the tooltip area to the webpage
var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);



    d3.csv('/project-1/data/wiid.csv', function(error, data) {
            if (error) throw error;
            // svg(data);
            data.forEach(function(d, i) {
                
                if (d.Country == "Thailand" && d.Year>= 1993){
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
                      .text("hello");
                
                // y-axis
                  svg.append("g")
                      .attr("class", "y axis")
                      .call(yAxis)
                    .append("text")
                      .attr("class", "label")
                      .attr("transform", "rotate(-90)")
                      .attr("y", 6)
                      .attr("dy", ".71em")
                      .style("text-anchor", "end")
                      .text(d.Gini);

                  
                }
                            
                 
                });

// console.log(d);
//   data.forEach(function(d) {
      
      
      
//     d.Year = +d.Year;
//     d.Gini = +d.Gini;
// //    console.log(d);
//   });
  
   // don't want dots overlapping axis, so add in buffer to data domain
  xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
  yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);


// draw dots
  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", xMap)
      .attr("cy", yMap)
      .style("fill", "red") 
     
});