var Nightmare = require('nightmare');
var vo = require('vo');

//tp is used for collect data by kafka, you can ignore it
var url = "http://www.slce003.com/", tp = 'test2';
var tag = "UN_Homepage";
var user_mark = "mark-user-ready";
var env_name  = "slce003";
var date = (Date.now()/1000).toFixed(0);

const RENDER_TIME_MS = 2000;

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
  var user_timing = 0;
  var nightmare = Nightmare({waitTimeout: 10000, openDevTools: false, show: true});

  yield nightmare
    //load landing page
    .useragent('nightmare_API')
    .goto(url)
    .wait(RENDER_TIME_MS)
    .wait(function(){
      var marks = window.performance.getEntriesByType("mark");
      if (marks.length > 0) {
          for (var m of marks ) {
            if (m.name == "mark-user-ready") {
              return true;
            } else {
              continue;
            }
          }
          return false;
      } else {
        return false;
      }
    });
    console.log("find the mark on the page: " + user_mark);
  var user_timings = yield nightmare
    .evaluate(function(){
      var timings_obj = {};
      var marks = window.performance.getEntriesByType("mark");
      var nav_time = window.performance.timing;
        for (var m of marks ) {
          if (m.name == "mark-user-ready") {
            timings_obj.dom_complete = nav_time.domComplete - nav_time.navigationStart;
            timings_obj.event_loaded = nav_time.loadEventEnd - nav_time.navigationStart;
            timings_obj.user_time = m.startTime.toFixed(1);
            return timings_obj;
          }
        }
        return "No such mark...";
    });

    console.log(tag + ":" + user_timings["user_time"]);
    yield nightmare
      .goto("http://localhost:9292/rest/beacon")
      .evaluate(function(env, date, url, tag, ut){
        //send beacon to save user timing
        if (window.navigator.sendBeacon) {
          var data = `{"env_name": "${env}", "date": "${date}", "url": "${url}", "tag": "${tag}", "user_timing": "${ut}"}`
          window.navigator.sendBeacon('/rest/perftiming', data);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open( "get", `http://localhost:9292/rest/perftiming?env_name=${env}&date=${date}&url=${url}&tag=${tag}&user_timing=${ut}`, true);
          xhr.send();
        }
      }, env_name, date, url, tag, user_timings["user_time"])
      .wait(1000)
      .end();
}
