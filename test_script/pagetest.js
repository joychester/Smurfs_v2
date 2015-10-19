var Nightmare = require('nightmare');
var vo = require('vo');


var test_url = "http://www.slce002.com/performer/136034/", tp = 'test2';

var freeport = process.argv[2];

vo(run)(function(err, result) {
  //if (err) throw err;
});

function *run() {

  var nightmare = Nightmare({'port': freeport, 'timeout': 15000, 'interval': 200});
  yield nightmare
    .goto(test_url)
	  // .inject("js","xhr.js") 
    .wait('.event-title')
    .evaluate(function(tp){
       var tag = 'artist_page';
		   var loadtiming =  new Date().getTime()-window.performance.timing.navigationStart;	
	     var xhr = new XMLHttpRequest();
	     xhr.open( "post", "http://localhost:8887/postkf", false);
		   xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
	     xhr.send('client_id='+tag+'&topic='+tp+'&msg='+loadtiming);	    
	     }, tp) // end of evaluate

    //load event page
    .click('.event-title')
    .wait('#sell-tickets')
    .evaluate(function(tp){
       var tag = 'event_page';
       var loadtiming =  new Date().getTime()-window.performance.timing.navigationStart;	
       var xhr = new XMLHttpRequest();
       xhr.open( "post", "http://localhost:8887/postkf", false);
       xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");  
       xhr.send('client_id='+tag+'&topic='+tp+'&msg='+loadtiming);
    }, tp) // end of evaluate
  //yield nightmare.end();
    .end();
}

