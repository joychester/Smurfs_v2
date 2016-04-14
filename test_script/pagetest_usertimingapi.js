var Nightmare = require('nightmare');
var vo = require('vo');

//tp is used for collect data by kafka, you can ignore it
var test_url = "https://www.etsy.com/", tp = 'test2';
var test_tag = "homepage";
const RENDER_TIME_MS = 1000;

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
  var randSleep = Math.floor((Math.random() * 500) + 500);
  //set {show: true} option is for debugging purpose, disable it when load test
  var nightmare = Nightmare({waitTimeout: 15000, openDevTools: false, show: true});

  var user_time = yield nightmare
    .useragent("nightmare;Electron")
    //load landing page
    .goto(test_url)
    //.wait('.event-title')
    .wait(RENDER_TIME_MS)
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
    //Reminder:this part needs you to setup influxdb and Chronograf
    yield nightmare
      .goto("http://127.0.0.1:10000/visualizations")
      .evaluate(function(tag, ut){
        //make ajax call to influxdb to save user timing
        var xhr = new XMLHttpRequest();
        xhr.open( "post", "http://127.0.0.1:8086/write?db=mydb", false);
        //xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        //sample data: "PROD_homepage user_time=1293"
        xhr.send(tag + " user_time=" + ut);
      }, test_tag, user_time)
      .wait(randSleep)
      .end();
}
