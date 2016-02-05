var Nightmare = require('nightmare');
var vo = require('vo');

//tp is used for collect data by kafka, you can ignore it
var test_url = "https://www.etsy.com/", tp = 'test2';
var test_tag = "homepage";
//const RENDER_TIME_MS = 1000;

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
  //set {show: true} option is for debugging purpose, disable it when load test
  var nightmare = Nightmare({'waitTimeout': 15000, show: false});

  var user_time = yield nightmare
    //load landing page
    .goto(test_url)
    //.wait('.event-title')
    //.wait(RENDER_TIME_MS)
    .wait(function(){
      var marks = window.performance.getEntriesByType("mark");
      if (marks.length > 0) {
          for (var m of marks ) {
            if (m.name === "timer_loadend_base") {
              return true;
            } else {
              continue;
            }
          }
          return false;
      } else {
        return false;
      }
    })
    .evaluate(function(){
      var marks = window.performance.getEntriesByType("mark");
        for (var m of marks ) {
          if (m.name === "timer_loadend_base") {
            return m.startTime.toFixed(1);
          }
        }
        return "No such mark..."
    });

    console.log(test_tag + ":" + user_time);
    yield nightmare.end();
}
