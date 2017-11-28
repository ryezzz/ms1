var margin = {top: 10, right: 0, bottom: 0, left: 0},
    width = window.innerWidth/3 - margin.left - margin.right,
    height = window.innerHeight/3.5- margin.top - margin.bottom;
    
var unParsedData =[];
        
//Positive and Negative Bar Chart          
var x = d3.scaleLinear()
          .range([0,width]);
          
var y = d3.scaleBand()
          .rangeRound([height,0])
          .padding(0.3);
          
var colorArray = ["#b6212d", "#7f171f", "#21b6a8", "#ef951a", "#177575", "3#b67721", "#21b6a8"]

var z = d3.scaleOrdinal()
        // .range(d3.schemePaired);
          .range(["#21b6a8", "#177575", "#b6212d", "#7f171f", "#ef951a", "#ef951a"]); 
          
//Stacked Area Chart
var parseDate = d3.timeParse("%Y");

// d3.timeYears(1990, 2014[ 2]);

var classArrayForInteraction = [];
          
//This is an array of all the different income categories     
var objectKeys = [];

// Where I put my key value pairs of colors
var objectColors = []

    
//This is an array of ALL countries combined with their change listed              
    
        
function render(data, i){
        // console.log(data);
        
        //   data.Time = parseDate(data.Time);

    var allChangeArr = [];

        // Sort single country change from most cange to least change (postive and negative combined)
    objectKeys = objectKeys.sort(); // ['apples', 'bananas', 'cherries']
     
    // console.log(objectColors[0].Category[0]);
     
    //   objectColors.sort(function (a, b) {
    //     var nameA = a.Category; // ignore upper and lowercase
    //     var nameB = b.Category; // ignore upper and lowercase
    //     if (nameA < nameB) {
    //     return -1;
    //      }
    //     if (nameA > nameB) {
    //     return 1;
    //      }
    //       return 0;
    //     });
        
 
        
        
        
    var countryName = data[0]
                    .Country_Name;
        
    // var divStackedArea = d3.select('body')
    //                     .append('div')
    //                     .attr('class', countryName + "AreaChart")
    
    var chartDiv = d3.select('body')
                 .append('div')
                 .attr('id', 'chartDiv'+ countryName)
                 .attr('class', 'chartDiv');;
    
     var titleDiv =  chartDiv
                    .append('svg').attr('class', 'title')
                    .attr("width", window.innerWidth)
                    .attr('height', 30)  
                    
    var svgTogglingTitle =  chartDiv
                    .append('svg').attr('class', countryName + 'togglingTitle')
                    .attr("width", window.innerWidth/3)
                    .attr('height', window.innerWidth/6)
        

    var svgStacked = chartDiv
                    .append('svg')
                    .attr('id', "svg" + countryName + "AreaChart")
                    .attr('width', window.innerWidth/3.5).attr('height', window.innerHeight/3.5),
                    
        marginStacked = {top: 30, right: 20, bottom: 30, left: 50},
        
        widthStacked = svgStacked.attr("width") - marginStacked.left - marginStacked.right,
        
        heightStacked = svgStacked.attr("height") - marginStacked.top - marginStacked.bottom;


    var xStacked = d3.scaleTime().range([0, widthStacked]),
        yStacked = d3.scaleLinear().range([heightStacked, 0]);
    // zStacked = d3.scaleOrdinal(d3.schemeCategory10);

    var stack = d3.stack();

    var area = d3.area()
        .x(function(d, i) { return xStacked(d.data.Time); })
        .y0(function(d) { return yStacked(d[1]); })
        .y1(function(d) { return yStacked(d[0]); });

    var gStacked = d3.select("#svg"+countryName+ "AreaChart")
                .append("g")
                .attr("transform", "translate(" + marginStacked.left + "," + marginStacked.top + ")");
    
    
    xStacked.domain(d3.extent(data, function(d) { return d.Time; }));
    z.domain(objectKeys);
    stack.keys(objectKeys);

    var layer = gStacked.selectAll(".layer")
              .data(stack(data))
              .enter().append("g")
              .attr("class", "layer");

    layer.append("path")
      .attr("class", function(d,i){
                    // return countryName + '_' + objectKeys[i] change to target a single country income

          return objectKeys[i]
      })
      .style("fill", function(d) { return z(d); })
      .style("stroke",function(d) { return z(d); })
      .attr("d", area);

    layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
      .append("text")
      .attr("x", widthStacked - 6)
      .attr("y", function(d) { return yStacked((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
      .attr("dy", ".35em")
    
      .style("font", "10px sans-serif")
      .style("text-anchor", "end")
      
      
            
            
    // .on("mouseout", function(d) {		
    //             tooltip.style("opacity", 0);	
    //     });
    
    //   .text(function(d,i) { return objectKeys[i]; });

// Make min and max of years
    var years = []

    for(var i=0; i<data.length; i++){
        years.push(data[i].Time)
    }
    


// //every year for every piece of data with value gets a tick
// console.log(years)

    gStacked.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + heightStacked + ")")
    //   .call(d3.axisBottom(xStacked).ticks(data.length).tickValues(years));
          .call(d3.axisBottom(xStacked).ticks(data.length).tickValues([years[0], d3.max(years)]));
    gStacked.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yStacked).ticks(5, "%"));
  


                    // .attr('height', window.innerWidth/6)
                    

///////////////END STACKED AREA CHART SVG CREATE///////////////////
        
    var svg = d3.select('#chartDiv'+ countryName)
              .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("class", 'barChartSVG')
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
                    
    var singleCountryChange = [];
        
    var countryClass = data[0].Country_Name
    
        
    ////takes year value of data and tests if it's greater than or less than previous year. 
    function posOrNegChange (input){
         if (data[0][input] <= data[data.length-1][input]){
         return 100-data[0][input]/data[data.length-1][input]*100
         } else { return (100-data[data.length-1][input]/data[0][input]*100)*-1
         }
    }
        
        
        //making an object for cange in each category of income for each country between two Pushing to 1. country array 2. complete array
    objectKeys.forEach(function(d){
         
        var changeObj = new Object();
        changeObj.Country = data[0].Country_Name;
        changeObj.Category = d;
        changeObj.startYear = d3.min(years);
        changeObj.endYear = d3.max(years);
        changeObj.Change = posOrNegChange(d)
        singleCountryChange.push(changeObj)
        allChangeArr.push(changeObj)
    });


    //REDEFINE DATA FOR BAR CHART
    // data = allChangeArr; 
    // console.log(data)
        
// /////////////////////data cleaned, create Pos NEG Bar Chart///////////////////////////////////////
        
    x.domain([-50, 50]);
    y.domain(allChangeArr.map(function(d) { return d.Category; }));
    
    
     var tooltip = d3.select("body")
                            .append("div")
                            .style("position", "absolute")
                            .style("z-index", "10")
                            .style("visibility", "hidden")
                            .style("background", "#000")
                            .text("a simple tooltip");
                            
      
    svg.selectAll(".bar")
                .data(allChangeArr)
                .enter()
                .append("rect")
                .attr("class", function(d,i){
                    //This is where I target a specific country: classArrayForInteraction.push(countryName + '_' + objectKeys[i])
                    //return countryName + '_' + objectKeys[i]

                    classArrayForInteraction.push(objectKeys[i])
                    return objectKeys[i]
                    })                    
                .attr("x", function(d){
                    return d.Change < 0 ? x(d.Change) : x(0); 
                    })
    				.attr("width", function(d){
    				return d.Change < 0 ? x(d.Change * -1) - x(0) : x(d.Change) - x(0);
    				})
                .attr("y", function(d){ 
                    return y(d.Category); 
                    })
    			.attr("height", y.bandwidth())
    			.attr("fill", function(d) {  
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}    
    		    	})
				        

// console.log(classArrayForInteraction);

console.log(classArrayForInteraction);

  	svg.selectAll(".change")
					.data(allChangeArr)
					.enter().append("text")
					.attr("class", "change")
					.attr("x", function(d){
							if (d.Change < 0){
								return (x(d.Change * -1) - x(0)) > 20 ? x(d.Change) + 2 : x(d.Change) - 1;
							} else {
								return (x(d.Change) - x(0)) > 20 ? x(d.Change) - 2 : x(d.Change) + 1;
							}
						 })
						
					 .attr("y", function(d){ return y(d.Category); })
					 .attr("dy", y.bandwidth() - 2.55)
					 .attr("text-anchor", function(d){
							if (d.Change < 0){
								return (x(d.Change * -1) - x(0)) > 20 ? "start" : "end";
							} else {
								return (x(d.Change) - x(0)) > 20 ? "end" : "start";
							}
					    })
					  .style("fill", function(d){
							if (d.Change < 0){
								return (x(d.Change * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
							} else {
								return (x(d.Change) - x(0)) > 20 ? "#fff" : "#3a403d";
							}
						})
						
				// 	  .text(function(d){ return d.Change; });
                       
    
    
                    svg.selectAll(".category")
						.data(allChangeArr)
					    .enter()
					    .append("text")
						.attr("class", "category")
						.attr("x", function(d){ return d.Change < 0 ? x(0) + 2.55 : x(0) - 2.55 })
						.attr("y", function(d){ return y(d.Category); })
						.attr("dy", y.bandwidth() - 2.55)
						.attr("text-anchor", function(d){ return d.Change < 0 ? "start" : "end"; })
				        .text(function(d){ return d.Category; });
						
						
					svg.append("line")
						.attr("x1", x(0))
						.attr("x2", x(0))
						.attr("y1", 0 + margin.top)
						.attr("y2", height - margin.top)
						.attr("stroke", "#c4c4c4")
						.attr("stroke-width", "1px");
///////////////////////Interactivity/////////////////////////////////////
// console.log(unParsedData)
///create main title content

        titleDiv
        .append('text')
        .text(function(){return "Income quintile distribution in " + countryName.replace('_', ' ') + " from " + d3.min(years) + " to " + d3.max(years)})
        .attr('alignment-baseline','hanging');


        // svgTogglingTitle 
        // .append('text')
        // // .text(function(){return years})
        // .attr('alignment-baseline','hanging');
//   var tooltip = d3.select('body').append("div")	
//     .attr("class", "tooltip")				
//     .style("opacity", 0);
    
    
//     d3.selectAll('rect').on("mouseover", function(d) {		
//             tooltip.text("rect")
//             .style("opacity", .9);
//                 // .style("left", (d3.event.pageX) + "px")		
//                 // .style("top", (d3.event.pageY - 28) + "px");	


console.log (data)
console.log(allChangeArr)
//             })
var togglingTitleClass = '.' + countryName + 'togglingTitle';

    function useClassForInteraction (){
        
       for(var i = 0; i < classArrayForInteraction.length; i++){
           
           
           
                 d3.selectAll('.'+ classArrayForInteraction[i])
                 
                 .on("mouseover", function(){
                  //this returns change info for tanzania  
                     for(var i =0; i<allChangeArr.length; i++){
                         if(allChangeArr[i].Category==this.className.baseVal){
  
                             console.log(allChangeArr[i].Change)
                         }
                     }

                     d3.select( "." + countryName + 'togglingTitle')
                     
                     .append('text')
                     
                     .text(this.className.baseVal
                            .replace('aIncome', "Income")
                            .replace('bIncome', "Income")
                            .replace('cIncome', "Income")
                            .replace('dIncome', "Income")
                            .replace('eIncome', "Income")
                            .replace(/_/g, ' ')
                            + data[0].dIncome_share_held_by_fourth_twenty*100
                            +" " + allChangeArr[0].Change
                     
                              
                    
                            )
                     .attr('alignment-baseline','hanging')
                    //  .append('text')
                    //  .text(data[0].dIncome_share_held_by_fourth_twenty);
                     

                     
                    for(var j = 0; j < classArrayForInteraction.length; j++){
                            if(classArrayForInteraction[j] != this.className.baseVal){
                            d3.selectAll('.'+classArrayForInteraction[j]).transition()
                            .duration(300).style('opacity', 0.1 )
                            }
                     }
                     
                     
                     
        })
                .on("mouseout", function(){ 
                    d3.select( "." + countryName + 'togglingTitle')
                    .selectAll("text").remove();
                    for(var j = 0; j < classArrayForInteraction.length; j++){
                         d3.selectAll('.'+classArrayForInteraction[j]).transition()
                            .duration(300).style('opacity', 1)
                     }

                 })
                     


        }

    };
    
    useClassForInteraction()
    
        
    }
    
    

    //LAYER INTERACTIVITY
    d3.csv ("data/wdidata.csv", type, function(error, data){
            // if (error) console.log(error);
        data.forEach(function(d){
            
        d.Time = +d.Time
           
    
        });
            
            
        var country1 = []
        var country2 = []
        var country3 = []
         

         //Create object Keys so I can send each numeric key through program
         
         function loopthroghObjectKeys(){
            var keys = Object.keys(data[0])
    
            for(var i=0; i<keys.length; i++){
            if(keys[i]!="Country_Name"&& keys[i]!="Time"&& keys[i]!="Country_Code"){

                    objectKeys.push(keys[i]);
                }
            } 
         }
         
        loopthroghObjectKeys();
        
        function createColorPairs (){ 
        for(var i = 0; i<colorArray.length; i++){
        var colorObject = new Object;
        colorObject.color = colorArray[i];
        colorObject.Category = objectKeys[i];
        objectColors.push(colorObject)
        }
        }
        
        createColorPairs ()
        
 
         // End Create Object Keys
         
         
        data.forEach(function(d){
            
        if (d.Country_Name == "Ghana" && d[objectKeys[3]]*1){
                country1.push(d)
                } else if (d.Country_Name == "Burkina_Faso"  && d[objectKeys[3]]*1){
                country2.push(d)
                } else if (d.Country_Name == "Tanzania"  && d[objectKeys[3]]*1){
                country3.push(d)
                }
            });  
            
        // d3.select('body')
        //     .data(objectKeys)
        //     .append('div')
        //     .attr('class', 'key')
        //     .append('rect')
            // .attr('color', function(d) { return z(d.length)})
        render(country1)
        render(country2)
        render(country3)
       
       
    
    
    
    /// make a different d3 select all for each item in array of classes
    /// when that thing is selected turn all instances of it black
    
    
    // var selectorOne = d3.selectAll(body)
    //       .on("mouseover", function(d,i){classArrayForInteraction[i].style("fill", "#000000");})
    });
    
    function type(d, i, columns) {
                     unParsedData.push(d)

  //This turns the year and stuff into integers
//   d.Time = parseDate(d.Time);
  for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]]/100;
  return d;
}    
    
    

    

/// If I hover over THIS class, return THIS paragraph associated with this class


