# Smurfs_v2
Smurfs using Nightmare_v2 which is Atom/Electron  

##Why use Atom/Electron instead of Phantomjs:  
1. nightmare v1 wrappers phantomjs to make user friendly API to make synchronous instead of using callbacks  
2. nightmare v2 use atom/electron to improve the speed and footprint with the same APIs: [V2 Proposal](https://github.com/segmentio/nightmare)  

##Precondition:  
npm install --save nightmare  
npm install --save vo  

##How to use:  
ruby smurfs.rb -u 3 -l 10 -d 20 -g homepage -f ./test_script/pagetest.js  
node --harmony test_script/pagetest.js  

##If you still want to use Phantomjs to test your single pages:  
Checkout my Smurfs_v1, it uses native phantomjs scripts to load tests your website: [Smurfs V1 Project](https://github.com/joychester/Smurfs)    
