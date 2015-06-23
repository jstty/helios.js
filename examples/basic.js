var Helios = require('../helios.js');

var graph = new Helios.GraphDatabase();
var graphSONData = require('../tests/data/graph-example-1.json').graph;

graph.init()
    .then(function(){
        return graph.loadGraphSON(graphSONData);
    })
    .then(function(g){
        g.V()
            .then(function(result){
                console.log( JSON.stringify(result, null, 2) );
            });
    }, function(err){
        console.error(err);
    });
