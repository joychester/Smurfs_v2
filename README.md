# Smurfs_v2
Smurfs v2 using [Nightmare_v2 API](https://github.com/segmentio/nightmare) to load test your webpages

##Why use Atom/Electron instead of Phantomjs:  
1. nightmare v1 wrappers phantomjs to make user friendly API to make synchronous instead of using callbacks  
2. nightmare v2 use atom/electron to improve the speed and footprint with the same APIs: [V2 Proposal](https://github.com/segmentio/nightmare)  

##Precondition:  
> * install node on your test machine  
> * npm install --save nightmare  
> * npm install --save vo  
> * install ruby(v2.2.3 from my side tested), add them to PATH
> * gem install concurrent-ruby
> * gem install concurrent-ruby-edge
> * gem install concurrent-ruby-ext (optional, for perf improvement on MRI)
> * gem install rufus-scheduler (optional)
> * gem install poseidon (optional, for kafka client)
> * gem install sinatra (optional, create web server to forward kafka messages)  

##How to use (Tested on Mac OS X 10.10):  
> * ruby smurfs.rb -u 3 -l 10 -d 20 -g homepage -f ./test_script/pagetest.js  

####Notice:  
> * First option [-u 3]: 3 Concurrent users  
> * Second option [-l 10 optional]: Execute 10 loops by each user  
> * Third option [-d 20 optional]: Test duration timed out value
> * Fouth option [-g group optional]: Test Group Name
> * Fifth option [-f ./xxx/x.js]: Test script you want to exec  

or you can test your script by using node cmd:  
> * node --harmony test_script/pagetest.js  

##If you still want to use Phantomjs to test your single pages:  
Checkout my Smurfs_v1, it uses native phantomjs scripts to load tests your website: [Smurfs V1 Project](https://github.com/joychester/Smurfs)    
