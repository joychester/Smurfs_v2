require 'concurrent'
require 'concurrent/actor'


#Actor Class to handle the currency mode
class ElectronActor < Concurrent::Actor::Context
  @@semaphore = Mutex.new
   
	def initialize()
    	@init_time = Time.now.to_f
      $port.increment
  	end

  	 # override on_message to define actor's behaviour
  	def on_message(message)
  		if String === message 
  			LOOP_CNT.times do 
          system("node --harmony #{message}")
        end
  		else 
  			raise TypeError, 'need to pass your test file name'
  		end
  	end
end