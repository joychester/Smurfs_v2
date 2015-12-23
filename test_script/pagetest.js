var Nightmare = require('nightmare');
var vo = require('vo');


var test_url = "http://www.slce002.com/performer/136034/", tp = 'test2';
const RENDER_TIME_MS = 200;

var freeport = process.argv[2];

vo(run)(function(err, result) {
  //if (err) throw err;
});

function *run() {

  var nightmare = Nightmare({'port': freeport, 'waitTimeout': 15000, 'interval': 200});
  yield nightmare
    //load landing page
    .goto(test_url)
    .wait('.event-title')
    //for page render
    .wait(RENDER_TIME_MS)
    .screenshot("shot1.png")
    .inject("js","xhr.js")
    .evaluate(function(tp){
       //make ajax call to kafka server to save the timing
       var tag = 'artist_page';
       this.send_message(tp,tag);
	     }, tp)

    //load event page
    .click('.event-title')
    .wait('.sectioncell')
    .wait(RENDER_TIME_MS)
    .screenshot("shot2.png")
    .inject("js","xhr.js")
    .evaluate(function(tp){
       var tag = 'event_page';
       this.send_message(tp,tag);
    }, tp)
    .end();
}
