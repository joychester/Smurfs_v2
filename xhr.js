function send_message(tp,tag){
       var loadtiming = window.performance.now().toFixed(1);
       //make ajax call to kafka server to save the timing
       var xhr = new XMLHttpRequest();
       xhr.open( "post", "http://localhost:8887/postkf", false);
       xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
       xhr.send('client_id='+tag+'&topic='+tp+'&msg='+loadtiming);
}

this.send_message = send_message;
