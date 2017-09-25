// create an svg within my lineChart div
    
    var svg = d3.select("#lineChart")
            .append("svg")
            .attr("height", "100%")
            .attr("width", "100%");
            
    // var countryOne = [];
    // var countryOneYear = [];
    // var countryOneGini = [];
    // var countryTwoYear = [];
    // var countryTwoGini = [];
    
    
    //  svg.selectAll("circle")
    // .data(countryOneYear)
    // .enter().append("circle")
    // .attr("cx", function(d) { return d.x; })
    // .attr("cy", function(d) { return d.y; }) 
    // .attr("r", 2.5);

            
// load data and parse it down to Thailand rows



    // d3.csv('/project-1/data/wiid.csv', function(error, data) {
    //         if (error) throw error;
    //         // svg(data);
    //         data.forEach(function(d, i) {
                
    //             if (d.Country == "Thailand" && d.Year>= 1991){
    //                 i=i-7825;
    //                 console.log (i);
    //                 svg.append('text')
    //                     .text (d.Year)
    //                     .attr('x', i * 40)
    //                     .attr('y', innerHeight/1.1)
    //                     .style('text-anchor', 'float: left')
    //                     .style('fill', 'black')
    //                     .style("font", "9px times");
    //             }
                            
                 
    //             });
            
      
    // });
    
    
     
    var countryOne = [];
    var countryTwo = [];   
            
// load data and parse it down to Thailand rows

    d3.csv('/project-1/data/wiid.csv', function(d) {
            return {
                // make sure numbers are read as numbers and not as strings
                Country : d.Country,
                Year : +d.Year,
                Gini : +d.Gini
            };
            // provide accessor function to d3.sv to return individual objects in data array
    }, function (data) {    
        for (var i = 0; i<data.length; i++){
            var allData = data[i];
            if (allData.Country == "Thailand" && allData.Year >= 1991){
            countryOne.push(allData);
            }
        }
      
    });
 
    console.log (countryOne);


    // console.log(countryOne);
    
    // console.log()
    
    
    
    // console.log(allData);
    
    
    // console.log (countryOne);
    // console.log(countryOne.get())

// create a simple scatterplot step 1: make SVG Circle element

// function draw(countryOne) {
//     console.log(countryOne); // this is your data
// }



// plan of action:
// -------------------------------------------------------
// -------------------------------------------------------
//  1. make an array of rows for a single country. Add ability to add second country
// -------------------------------------------------------
// -------------------------------------------------------
// the following code logs an object where property names are associated with the data object
// the numbers load as strings so I have to deal with that
//      d3.csv('/project-1/data/wiid.csv', function(data) {
//                 console.log(data[300]);
//       });
// _______________________________________________________
// in order to deal with the numbers being strings I added this:
//   d3.csv('/project-1/data/wiid.csv', function(data) {
//             data.forEach(function(d){
//                 d.Year = +d.Year;
//                 d.Gini = +d.Gini;
//             });
//         console.log(data[300]);
//     });
// _______________________________________________________
// make an accessor function to only access certain rows
//  d3.csv('/project-1/data/wiid.csv', function(d) {
//             return {
//                 // make sure numbers are read as numbers and not as strings
//                 Country : d.Country,
//                 Year : +d.Year,
//                 Gini : +d.Gini
//             };
//     }, function (data) {    console.log(data[300]);
//     });
// -------------------------------------------------------
// -------------------------------------------------------
//  2. Create a scatterplot of single country (Thailand)
// -------------------------------------------------------
// -------------------------------------------------------
// make SVG Circle element

    // svg
    // .append("circle")
    // .attr("cx", 300)
    // .attr("cy", 300)
    // .attr("r", 2)
    // .attr("fill", "black");
// -------------------------------------------------------
// -------------------------------------------------------
//  3. Connect points in scaterplot by lines
// -------------------------------------------------------
// -------------------------------------------------------

// -------------------------------------------------------
// -------------------------------------------------------
//  4. Add text lables
// -------------------------------------------------------
// -------------------------------------------------------




// RESOURCES

// loading and parsing data from a csv file: http://learnjsdata.com/read_data.html
// making a scatterplot: http://alignedleft.com/tutorials/d3/making-a-scatterplot
// D3 Request documentation: https://github.com/d3/d3-request/blob/master/README.md#csv
            
    // d3.csv("/project-1/data/wiid.csv", function (error, data){
    //         if (error) throw error
    //         for(var i in data){
    //         console.log(data.year);
    //         }
    // })            
            
            






// // create an svg within my lineChart div
    
//     var svg = d3.select("#lineChart")
//             .append("svg")
//             .attr("height", "100%")
//             .attr("width", "100%");
            
//     var countryOne = [];
//     // var countryOneYear = [];
//     // var countryOneGini = [];
//     // var countryTwoYear = [];
//     // var countryTwoGini = [];
    
    
//     //  svg.selectAll("circle")
//     // .data(countryOneYear)
//     // .enter().append("circle")
//     // .attr("cx", function(d) { return d.x; })
//     // .attr("cy", function(d) { return d.y; }) 
//     // .attr("r", 2.5);

            
// // load data and parse it down to Thailand rows

//     d3.csv('/project-1/data/wiid.csv', function(error, d) {
//             // svg(data);
//             return {
//             // make sure numbers are read as numbers and not as strings
//                 Country : d.Country,
//                 Year : +d.Year,
//                 Gini : +d.Gini
//             };
//     // provide accessor function to d3.sv to return individual objects in data array
//     }, function (data) {    
//         for (var i = 0; i<data.length; i++){
//             var allData = data[i];
//             if (allData.Country == "Thailand" && allData.Year>= 1993){
//              countryOne.push(allData);
//             }
//         }
      
//     });



//     console.log(countryOne);
    
//     console.log()
    
    
    
//     // console.log(allData);
    
    
//     // console.log (countryOne);
//     // console.log(countryOne.get())

// // create a simple scatterplot step 1: make SVG Circle element

// // function draw(countryOne) {
// //     console.log(countryOne); // this is your data
// // }



// // plan of action:
// // -------------------------------------------------------
// // -------------------------------------------------------
// //  1. make an array of rows for a single country. Add ability to add second country
// // -------------------------------------------------------
// // -------------------------------------------------------
// // the following code logs an object where property names are associated with the data object
// // the numbers load as strings so I have to deal with that
// //      d3.csv('/project-1/data/wiid.csv', function(data) {
// //                 console.log(data[300]);
// //       });
// // _______________________________________________________
// // in order to deal with the numbers being strings I added this:
// //   d3.csv('/project-1/data/wiid.csv', function(data) {
// //             data.forEach(function(d){
// //                 d.Year = +d.Year;
// //                 d.Gini = +d.Gini;
// //             });
// //         console.log(data[300]);
// //     });
// // _______________________________________________________
// // make an accessor function to only access certain rows
// //  d3.csv('/project-1/data/wiid.csv', function(d) {
// //             return {
// //                 // make sure numbers are read as numbers and not as strings
// //                 Country : d.Country,
// //                 Year : +d.Year,
// //                 Gini : +d.Gini
// //             };
// //     }, function (data) {    console.log(data[300]);
// //     });
// // -------------------------------------------------------
// // -------------------------------------------------------
// //  2. Create a scatterplot of single country (Thailand)
// // -------------------------------------------------------
// // -------------------------------------------------------
// // make SVG Circle element

//     // svg
//     // .append("circle")
//     // .attr("cx", 300)
//     // .attr("cy", 300)
//     // .attr("r", 2)
//     // .attr("fill", "black");
// // -------------------------------------------------------
// // -------------------------------------------------------
// //  3. Connect points in scaterplot by lines
// // -------------------------------------------------------
// // -------------------------------------------------------

// // -------------------------------------------------------
// // -------------------------------------------------------
// //  4. Add text lables
// // -------------------------------------------------------
// // -------------------------------------------------------




// // RESOURCES

// // loading and parsing data from a csv file: http://learnjsdata.com/read_data.html
// // making a scatterplot: http://alignedleft.com/tutorials/d3/making-a-scatterplot
// // D3 Request documentation: https://github.com/d3/d3-request/blob/master/README.md#csv
            
//     // d3.csv("/project-1/data/wiid.csv", function (error, data){
//     //         if (error) throw error
//     //         for(var i in data){
//     //         console.log(data.year);
//     //         }
//     // })            
            
            
