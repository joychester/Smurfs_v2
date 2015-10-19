require 'sinatra'
require './producer'

configure do
	set :bind, '0.0.0.0'
	set :port, '8887'
end

#var postBody = "client_id=aaa&topic=test&msg=#{load_timing}";
post '/postkf' do
	@client_id = params[:client_id]
	@topic = params[:topic]
	@messages = params[:msg]

	result = KA_producer.send_sync('10.131.64.224', 9092, @client_id, @topic, @messages)
	if result
		p 'message sent to kafka server successful' 
	else
		p 'please check your kafka server...'
	end
	
end

