var bootstrapClass = 'col-12'

var container = d3.select("#countryContainer")
            //   .append("div")
            //   .attr('class', 'container')
            //   .attr('id', 'countryContainer')
               
var key = container
          .append('div')
          
var togglingTitleFontSize = '2vw';

var allcountries = []

var countriescheckforrepeat = [];
        var countriesNotRepeated = [];
        
        
var togglingTitleFontSize = '1.5vw';

var margin = {top: 40, right: 0, bottom: 14, left: 0},
    width = window.innerWidth/1.2- margin.left - margin.right,
    height = window.innerHeight+1000- margin.top - margin.bottom;
    

// if(window.innerWidth<500){
//     width = window.innerWidth/1.2
// }  

var unParsedData =[];
        
//Positive and Negative Bar Chart          
var x = d3.scaleLinear()
          .range([0,width]);
          
var y = d3.scaleBand()
          .rangeRound([height,0])
          .padding(0.3);
          
var colorArray = ["#0a97d9", "#6254a8", "#2f9969", "#fcc30b", "#a21942"]

var z = d3.scaleOrdinal()
        // .range(d3.schemePaired);26bde2
          .range(["#2f9969", "#a21942", "#0a97d9", "#6254a8", "#fd9d24", "#fcc30b"]); 
          
//Stacked Area Chart
var parseDate = d3.timeParse("%Y");

// d3.timeYears(1990, 2014[ 2]);

var classArrayForInteraction = [];
          
//This is an array of all the different income categories     
var objectKeys = [];

// Where I put my key value pairs of colors
var objectColors = []

function myFunction(){
    console.log('change')
}
//Start overlay

//End overlay


    
//This is an array of ALL countries combined with their change listed              
    
        
function render(data, i){
    
    objectKeys = objectKeys.sort();
      
      
    var chartDiv = d3.select('body')
     .append('div')
     .attr('id', 'FullCountryChart')
     .attr('class', 'chartDiv');;
     
     
     function parseClass(objectkey){
     return objectkey.replace('aIncome', "Income")
                 .replace('bIncome', "Income")
                 .replace('cIncome', "Income")
                 .replace('dIncome', "Income")
                 .replace('eIncome', "Income")
                 .replace('twenty', "quintile of the population ")
                 .replace('by', "by the")
                 .replace(/_/g, ' ')}


         var chartsRow = d3.select("#countryRow")
                    // .append('div')
                    // .attr('class', 'row')


        // var togglingTitle =  chartsRow
        //                     .append('div')
        //                     .attr('class', bootstrapClass)
        //                     .attr('id', "togglingTitle")


            var div = d3.selectAll(".tool")
                // .attr("class", "tooltip")				
                // .style("opacity", 0);
              
//one overall svg for everything    
        var svg = chartsRow
              .append('div')
              .attr('class',bootstrapClass)
              .append("svg")
              .attr("width", width )
              .attr("height", height)
              .attr("class", 'barChartSVG')
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .attr("width", width/2)


//adding mini chart titles
         svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitles")
        .attr("x", width/2 )
        .attr("y", -10)
        .style("text-anchor", "middle")
        .html("Neg. Change  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  Pos. Change" );
        
      var lineTopText = svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitlesSide")
        .attr("x", width/10 )
        .attr("y", 5)
        .style("text-anchor", "middle")
        .html("More Change" )
       
      var line =  svg
        .append("line")
        .attr("id", "lineSide")
        .attr("fill", "#000000")
        .attr("x1", width/10 )
        .attr("y1", window.innerHeight/1.5)
        .attr("x2", width/10 )
        .attr("y2", 10)
        
        
        var lineBottomText =  svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitlesSide")
        .attr("id", "lineBottomText")
        .attr("x", width/10 )
        .attr("y", window.innerHeight/1.45)
        .style("text-anchor", "middle")
        .html("Less Change" );

    
    
    

        // console.log(data[0]);
        // console.log(allcountries)
var countriesFullObject = [];
        
        ///Yey! This javascript method prevents repetition
                var listofuniquecountries = Array.from(new Set(countriesNotRepeated))
                console.log(listofuniquecountries)
                
                //start adding elements to my single country objects. I want Country, Start year/end year, change.
                
                objectKeys.forEach(function(overallLoop) {
                    
                       
                        listofuniquecountries.forEach(function(d){
                            var singleCountryObject = new Object();
                            singleCountryObject.Country = d;
                            singleCountryObject.Category = overallLoop;
        
                            
                            // {quintile change array:  country, quintile, max year, min year, change;; [years]},{[years]},{[years]}
                            
                                            //gather the years of each country and stick the min and max in object
                                                    var eachCountryYears = []
                            
                                             data.forEach(function(alldata){
                                                if(alldata.Country_Name == d){  
                                                    eachCountryYears.push(alldata.Time)
                                                }
                                             });
                                            singleCountryObject.StartingYear = d3.min(eachCountryYears)
                                            singleCountryObject.MiddleYear = d3.median(eachCountryYears)
                                            singleCountryObject.EndingYear = d3.max(eachCountryYears)
                                            
                                            
                                            
                                            
                                            data.forEach(function(alldata){
                                                var valuesChange = [];
                                                
                                                
                                                if(alldata.Time == singleCountryObject.EndingYear && singleCountryObject.Country == alldata.Country_Name){  
                                                    
                                                    singleCountryObject.EndingYearValue = alldata[overallLoop]
                                                    
                                                    valuesChange.push(alldata[overallLoop])
                                                    
                                                    
                                                    
                                                } else if (alldata.Time == singleCountryObject.StartingYear && singleCountryObject.Country == alldata.Country_Name){  
        
                                                    singleCountryObject.StartingYearValue = alldata[overallLoop]
                                                    valuesChange.push(alldata[overallLoop])
            
                                                }
                                                
                                            //  console.log(valuesChange)
                                             });
                                             
                                             
                                             
                                               function posOrNegChange (startyearvalueinput,endyearvalueinput){
                                                if (startyearvalueinput <= endyearvalueinput){
                                                  return 100-startyearvalueinput/endyearvalueinput*100
                                                  } else { return (100-endyearvalueinput/startyearvalueinput*100)*-1
                                                  }
                                                }
                
                                             
                                             
                                            //  console.log(singleCountryObject.EndingYearValue)
                                            //  console.log(singleCountryObject.StartingYearValue)
                                             singleCountryObject.Change = posOrNegChange(singleCountryObject.StartingYearValue, singleCountryObject.EndingYearValue);
                                            //  var startValue = 0
                                            //  singleCountryObject.StartValue = startValue
        
                                            
                                            //find all the values for all quintiles 
                            
                            //pushes object into array
                            
                            if(singleCountryObject.Change){
                           countriesFullObject.push(singleCountryObject)
                            }
                        });
                        
                        
                })

countriesFullObject.sort(function(obj2, obj1) {
	// Ascending: first age less than the previous
	return Math.abs(obj1.Change) - Math.abs(obj2.Change);
});
                console.log(countriesFullObject)
                
             x.domain([-100, 100]);
             y.domain(countriesFullObject.map(function(d) { return d.Category; }));
///This is where I start building my chart with modified data                
//  countriesFullObject.forEach(function(allChangeInnerLoop){
     
         var format = d3.format(".1f");
         
        var rect = svg.selectAll(".anything")
                .data(countriesFullObject)
                .enter()
                .append("rect")
                .attr("class", "singleBar")
                .attr("id", function(d){return d.Category+d.Country+d.StartingYear})
                .attr("x", function(d){
                    return d.Change < 0 ? x(d.Change) : x(0);
                    })
    //             .transition().duration(300)
    			.attr("width", function(d){
    				return d.Change < 0 ? x(d.Change * -1) - x(0) : x(d.Change) - x(0);
    				})


                .attr("y", function(d, i){
                    return i*(height/700);
                    })
    			.attr("height", 1)
    			.attr("fill", function(d) {
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}
    		    	})
    		    
    		    	
    		    	
    		   .on("mouseover", function(d) {
    		       
    		       d3.select( "#"+ d.Category+d.Country+d.StartingYear)
    		                    .attr("fill", "#000000")
    		                    
    		                    .attr("font-size", 30)

                    div.transition()		
                        .duration(200)		
                        .style("opacity", .9);		
                    div	.html(function() {
                         var thisText =  d.Country.replace('_', ' ') + " from " + d.StartingYear + " to " + d.EndingYear +":"+ parseClass(d.Category) + increasedDecreased(d.Change) + "&nbspfrom " + format(d.StartingYearValue) + " to " + format(d.EndingYearValue) + " percent" + ", a " + format(d.Change) + " percent" +" change."
                        return thisText;	

                      })	
                        .style("left", (d3.event.pageX) + "px")		
                        .style("top", (d3.event.pageY - 28) + "px");	
                        
                        
                        
    //                       svg.selectAll(".change")
				// 	.data(countriesFullObject)
				// 	.enter().append("text")
				// 	.attr("class", "change")
				// 	.attr("x", function(d){
				// 			if (d.Change < 0){
				// 				return (x(d.Change * -1) - x(0)) > 20 ? x(d.Change) + 2 : x(d.Change) - 1;
				// 			} else {
				// 				return (x(d.Change) - x(0)) > 20 ? x(d.Change) - 2 : x(d.Change) + 1;
				// 			}
				// 		 })
						
				// 	 .attr("y", function(d){ return y(d.Category); })
				// 	 //change space inbetween bars
				// 	 .attr("dy", function(d,i){                        return 0;})
				// 	 .attr("text-anchor", function(d){
				// 			if (d.Change < 0){
				// 				return (x(d.Change * -1) - x(0)) > 20 ? "start" : "end";
				// 			} else {
				// 				return (x(d.Change) - x(0)) > 20 ? "end" : "start";
				// 			}
				// 	    })
				// 	  .style("fill", function(d){
				// 			if (d.Change < 0){
				// 				return (x(d.Change * -1) - x(0)) > 20 ? "#fff" : "#3a403d";
				// 			} else {
				// 				return (x(d.Change) - x(0)) > 20 ? "#fff" : "#3a403d";
				// 			}
				// 		})
				// 		.attr("text-anchor", function(d){ if (d.Change<-3){return "beginning"}else{return "end"}})
				//         // .text(function(d){ return format(d.Change)+"%"; });
				// 	  .text(function(d){ return format(d.Change) + "%"; })
				// 	  .attr('class', 'innerText')
				// 	  .style("opacity", ".7")	        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        //END MOUSEOUT
                    })					
                
                .on("mouseout", function(d, i) {
                d3.select( "#"+ d.Category+d.Country+d.StartingYear)
                    		.attr("fill", function(d) {
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}
    		    	})

                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                })
    		    	
    		    	
    
      

      svg.on('mousemove', function(d){
            d3.selectAll('.singleBar')
                    .transition()
                     .attr("y", function(d, i){
                        return i*(height/150);
                        }) 
                        .transition()
                        .attr('height', 10)
                        
            d3.select("#lineSide")
                    .attr("x1", width/10 )
                    .attr("y1", height-50)
                   .attr("x2", width/10 )
                    .attr("y2", 10)
                    
            d3.select("#lineBottomText")
                 .attr("y", height-20)


        
                        
                        // .duration(100)
                        // .transition()		
                        // .duration(50).attr("y", function(d, i){
                        // return i*40;
                    // })
})



//  svg.on('mouseout', function(d){
//             d3.selectAll('.singleBar')
//                     .transition()
//                      .attr("y", function(d, i){
//                         return i*3;
//                         }) 
//                         .transition()
//                         .attr('height', 2)
//                         // .duration(100)
//                         // .transition()		
//                         // .duration(50).attr("y", function(d, i){
//                         // return i*40;
//                     // })
// })


function increasedDecreased(positiveneg){
     if(positiveneg<0){
         return "decreased"
     } else {return "increased"};
 }


// togglingTitle
//       .selectAll ('text')
//       .data(countriesFullObject)
//       .enter()
//       .append("text")
//       .attr('class', function(d, i){return classArrayForInteraction[i]+"text"})
//       .text(function(d){
//          return  d.Country.replace('_', ' ') + " from " + d.StartingYear + " to " + d.EndingYear 
//       })
//       .html(function(d, i) {
//           var thisText = parseClass(objectKeys[i]) + increasedDecreased(d.Change) + "&nbspfrom " + format(d.StartingYearValue) + " to " + format(d.EndingYearValue) + " percent" + ", a " + format(d.Change) + " percent" +" change."
//           return thisText;


                        // var thisText = "<span class = 'staticTitle'>" + countryName.replace('_', ' ') + " from " + d3.min(years) + " to " + d3.max(years) + "</span>" + "<span class ="+ "'" +classArrayForInteraction[i]+"text" + "'>"+ parseClass(objectKeys[i]) + increasedDecreased(allChangeArr[i].Change*1) + " from " + format(data[0][objectKeys[i]]*100) + " to " + format(data[years.length-1][objectKeys[i]]*100) + " percent" + ", a " + format(allChangeArr[i].Change) + " percent" +" change." + "</span>"



                    //   + " representing" + increaseDecreaseEquality(increasedDecreased(allChangeArr[i].Change*1) , objectKeys[i]);


     
     
     
    console.log(objectColors)    
console.log("hello")        
//  });    
        
    }
    
    
    
    
    
    

    //LAYER INTERACTIVITY
    d3.csv ("data/wdialldata.csv", type, function(error, data){
        
            // if (error) console.log(error);
        data.forEach(function(d){
        d.Country_Name = d.Country_Name.replace(" ", "_")    
        d.Time = +d.Time
            // console.log(d.Country_Name)
           
        // console.log(d.Time)
    
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
         
                   console.log(objectKeys)

         
         var cleaned = [];
         
        data.forEach(function(d){
            
            
            
        // var countriescheckforrepeat = [];
        // var countriesNotRepeated = [];
        
        
        
        

      for( var i = 0; i<objectKeys.length; i++){ 
    
    //I'm only analyzing data with full year values for all quintiles
    //I'm putting all country names in one place
          if (d[objectKeys[i]]*1){
            cleaned.push(d);
            countriesNotRepeated.push(d.Country_Name)
          }
          
          
        //   d.Country_Name[i]
          
          
            }

        countriescheckforrepeat.push(cleaned.Country_Name)
        

     
            });  
            
            // console.log(cleaned)
            
         var keyContainer = d3.select('body')
                            .append('div')
                            .append('svg')
                            .append('g')
                            .attr('class', 'container')
                            .attr('width', 100)
          .attr('height', 50)
            
            var keys = keyContainer.selectAll('rect')
                    .data(objectColors)
                    .enter()
                    .append('rect')
                    .attr("x", function(d,i){return i*20})
                    .attr("y", 3)
                    .attr('width', 10)
                    .attr('height', 10)
                    .attr('class', 'key')
            // .append('rect')
            .attr('fill', function(d) { return d.color})
         
         
                
         
         
         
            

        render(cleaned)
        // render(country1)
        // render(country3)
       
       
    
    
    
    /// make a different d3 select all for each item in array of classes
    /// when that thing is selected turn all instances of it black
    
    
    // var selectorOne = d3.selectAll(body)
    //       .on("mouseover", function(d,i){classArrayForInteraction[i].style("fill", "#000000");})
    });
    
    
    // console.log(countriescheckforrepeat)

    
    
    function type(d, i, columns) {
                    //  unParsedData.push(d)

  //This turns the year and stuff into integers
//   d.Time = parseDate(d.Time);
//   for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]]/100;
  return d;
}    
    
    
     






    

/// If I hover over THIS class, return THIS paragraph associated with this class


