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
    //load landing page
    .goto(test_url)
	  .inject("js","xhr.js")
    .wait('.event-title')
    .evaluate(function(tp){
       //make ajax call to kafka server to save the timing
       var tag = 'artist_page';
       this.send_message(tp,tag);
	     }, tp)

    //load event page
    .click('.event-title')
    .wait('#sell-tickets')
    .evaluate(function(tp){
       var tag = 'event_page';
       this.send_message(tp,tag);
    }, tp)
    .end();
}
