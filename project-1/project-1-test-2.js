

// svg.append(circle)

var svgContainer = d3.select("body")
                .append("svg")
                .attr("width", window.innerWidth)
                .attr("height", window.innerHeight);
  

var backGround = svgContainer.append("rect")
                .attr("width", window.innerWidth)
                .attr("height",window.innerHeight);

var circle = svgContainer.append("circle")
                .attr("cx", 30)
                .attr("cy", 30)
                .attr("r", 2);
                circle.style("fill", "red");
                
var leftBound = svgContainer.append("line")
                .attr("x1", window.innerWidth/8)
                .attr("y1", window.innerHeight - 100)
                .attr("x2", window.innerWidth/8)
                .attr("y2", window.innerHeight/14)
                .attr("stroke", "white")
                .attr("stroke-width", .5);

var bottomBound = svgContainer.append("line")
                .attr("x1", window.innerWidth-50)
                .attr("y1", window.innerHeight -100)
                .attr("x2", window.innerWidth/8)
                .attr("y2", window.innerHeight-100)
                .attr("stroke", "white")
                .attr("stroke-width", .5);

var countryOne = [];
var countryOneYear = [];
var countryOneGini = []; 
        


  
            
// load data and parse it down to Thailand rows

    // d3.csv('/project-1/data/wiid.csv', function(data) {
        
  
    //     for (var i = 0; i<data.length; i++){
    //         var allData = data[i];
    //         if (allData.Country == "Thailand" && allData.Year >= 1993){
    //         countryOneYear.push(allData.Year);
    //         countryOneGini.push(allData.Gini);

    //         }
    //     }
      
    // });
 
 d3.request("/project-1/data/wiid.csv")
  .mimeType("text/csv")
  .response(function (xhr) { return d3.csvParse(xhr.responseText); })
  .get(function(data) {
      for (var i = 0; i<data.length; i++){
            var allData = data[i];
            if (allData.Country == "Thailand" && allData.Year >= 1993){
                 var text = svgContainer.append('text')
                        .text (allData.Year)
                        .attr('x', window.innerWidth/8+i*.0013)
                        .attr('y', window.innerHeight -90*i*.00013)
                        .style('text-anchor', 'float: left')
                        .style('fill', 'white')
                        .style("font", "9px times");
                        
                        
            var circleData = svgContainer.selectAll("circle")
                        .data(allData.Gini)
                        .enter().append("circle")
                        .attr("cx", function(d) { return allData.Gini; })
                        .attr("cy", 500)
                        .attr("r", 2);
                        circle.style("fill", "red");

            }
      }
  });


        // console.log(countryOneYear);
        // console.log(countryOneGini);
        //   svg.append('text')
        //   .text (d.Year)
        //   .attr('x', 4)
        //   .attr('y', 4)
        //   .style('text-anchor', 'float: left')
        //   .style('fill', 'white')
        //   .style("font", "9px times");

// console.log (data1);

    
    //     d3.csv('/project-1/data/wiid.csv', function(error, d) {
    //         // svg(data);
    //         return {
    //         // make sure numbers are read as numbers and not as strings
    //             Country : d.Country,
    //             Year : +d.Year,
    //             Gini : +d.Gini
    //         };
    // // provide accessor function to d3.sv to return individual objects in data array
    // }, function (data) {    
    //     for (var i = 0; i<data.length; i++){
    //         var allData = data[i];
    //         if (allData.Country == "Thailand" && allData.Year>= 1993){
    //          data1.push(allData);
    //         }
    //       console.log(allData);

    //     }
      
    // });



    
// var rightBound = ;
