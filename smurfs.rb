require 'rufus-scheduler'
require 'concurrent/atomics'

CURR_DIR = File.expand_path(__dir__)

require CURR_DIR+'/cmdParser'
require CURR_DIR+'/electronActor'


include CmdParser

if ARGV.empty?
  p 'empty option, type -h option for help, exit now...'
  exit
else
  @options = CmdParser.getoptions(ARGV)

  ACTOR_CNT = @options[:users].to_i #should be mandatory
  START_PORT = (@options[:port] == nil) ? 10000 : @options[:port].to_i
  $port = Concurrent::AtomicFixnum.new(START_PORT)
  if @options[:loops] != nil
    LOOP_CNT = @options[:loops].to_i 
  elsif @options[:duration] !=nil
    LOOP_CNT = 99999 #set to max loop counts until test duration reached
  else
    p 'incorrect options, type -h option for help, exit now...'
    exit
  end
end

@scheduler = Rufus::Scheduler.new

#looking for *.js as its test script and distribute to each actor message
@exec_js = (@options[:file] == nil) ? Dir["./*_script/*.js"][0] : @options[:file]
#set timeout value for the test duration, default=5 mins
@timeout = (@options[:duration] == nil) ? 300 : @options[:duration].to_i

@test_started = Time.now.to_i

actor_arr = []

ACTOR_CNT.times do |i|
  actor_name = (@options[:group] != nil) ? "#{@options[:group]}_electron_actor_#{i}" : "electron_actor_#{i}"
	actor_arr[i] = ElectronActor.spawn(actor_name)
end

actor_arr.each { |actor|
  p "#{actor.name} starting running"
  #add port argument
  $port.increment 
  # electron version (need to tell free port)
  m = @exec_js+" "+$port.value.to_s
  
  #phantom version
  #m = @exec_js
  #async call to launch phantomjs test
  actor.tell(m)
}

#check testing results until timed out
@scheduler.every '3s' do

  @test_duration = Time.now.to_i - @test_started

  #test timeout default value set to 5 mins
  if @test_duration <= @timeout
    p 'grabbing some results'
  else
    p "===Test Timed Out after #{@test_duration} seconds, exiting==="
    @scheduler.shutdown
  end
end

@scheduler.join