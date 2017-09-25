
            var graph = d3.select('#target')
            // 
                .append('svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);
            
            d3.json('/project-1/thailand.JSON', function(error, data){
                if (error) throw error;
                
                svg(data);
                
            });
            // general purpose that can handle any type of data source
            // # d3.max(array[, accessor]) <>
            
                function svg(data) {
                    var tmp = [];
                    for (var i in data) {
                         tmp.push(data[i].Gini);
                    }
                    var max = d3.max(tmp);
                    console.log(max);
                    console.log(tmp);
                    // make sure everything is full screen
                    // operating expenses
                    // we're going to space them out with scallinear
                    
                    var x = d3.scaleLinear()
                        .domain([0, data.length])
                        .range([0, window.innerWidth])
                    
                    var y = d3.scaleLinear()
                        .domain([0, max])
                        // range is from 0 to innner height of browser window
                        .range([0, window.innerHeight]);
                        
                    // svg group
                    
                    graph.append('g')
                        .attr('id', 'group');
                        
                var group = graph.select('#group')
                    .selectAll('g')
                    .data(data)
                    .enter()
                    .append('g')
                        // first elment is an x
                        // i refers to the variable x in space on window
                        // returns x position based on var x function from above
                        .attr('x', function(d, i) { return x(i); })
                        // for bar graphs, all on same verticle axis, but y changes
                        // transformation - axis
                        .attr('transform', function (d, i) {
                            return 'translate(' + x(i) + ', ' + '0' + ')';
                        });
                        //  the following groups are subgroups
                group.append('rect')
                    .attr('class', 'bar')
                    .attr('y', function(d, i) { return window.innerHeight-y(d.Gini); })
                    .attr('width', function(d,i) { return x(20); })
                    .attr('height', function(d,i) {return y(d.Gini); });
                
                group.append('text')
                // we're looking at operating expenses of what? d.name
                    .text(function(d) { return d.Year; })
                // every time I want to add something to group, use group append
                // grab an element and do something with it
                // based on research question
                // calculations based on D3 averages etc
                
                    .attr('transform', function(d, i) { return 'translate(10, '  + (window.innerHeight-y(d.operatingExpenses)) + ')rotate(-90)'; });
                }    

