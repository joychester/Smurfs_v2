require 'poseidon'

module KA_producer

	def KA_producer.send_sync(host, port=9092, client_id, topic_name, msg)

			producer = Poseidon::Producer.new(["#{host}:#{port}"], client_id,:type => :sync)

			messages = []
			messages << Poseidon::MessageToSend.new(topic_name, client_id + '|' + msg)

			producer.send_messages(messages)
			producer.close
	end
	
end
