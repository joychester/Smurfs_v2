require 'poseidon'

module KA_consumer

	def KA_consumer.get_from_earliest(client_id, host, port=9092, topic_name, partition)

			consumer = Poseidon::PartitionConsumer.new(client_id, host, port, topic_name, partition, :earliest_offset)
			#:max_wait_ms => 100ms
			loop do
			  messages = consumer.fetch
			  messages.each do |m|
			    puts m.value
			  end
			end
	end
	
	def KA_consumer.get_from_latest(client_id, host, port=9092, topic_name, partition)

			consumer = Poseidon::PartitionConsumer.new(client_id, host, port, topic_name, partition, :latest_offset)
			#:max_wait_ms => 100ms
			loop do
			  messages = consumer.fetch
			  messages.each do |m|
			    puts m.value
			  end
			end
	end

	def KA_consumer.get_from_offset(client_id, host, port=9092, topic_name, partition, offset)

			consumer = Poseidon::PartitionConsumer.new(client_id, host, port, topic_name, partition, offset)
			#:max_wait_ms => 100ms
			loop do
			  messages = consumer.fetch
			  messages.each do |m|
			    puts m.value
			  end
			end
	end
end
