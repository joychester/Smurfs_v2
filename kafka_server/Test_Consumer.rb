require './consumer'

KA_consumer.get_from_earliest('test_consumer', '10.131.64.224', 9092, 'test2', 0)
#KA_consumer.get_from_latest('test_consumer', '10.131.64.224', 9092, 'test', 0)
#KA_consumer.get_from_offset('test_consumer', '10.131.64.224', 9092, 'test', 0, 48)