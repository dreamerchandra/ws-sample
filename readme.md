# Problem

Browser enforces safe limit on messages sending messages and is limited to 64Kb as [per here](http://answers.neotys.com/questions/917651-increase-size-websocket-response#:~:text=These%20messages%20can%20be%20of,the%20system%20returns%20a%20org.) and is exiting with an error usually (1009 [twilio's case](https://connect-feedback-logs.storage.googleapis.com/twiliolog-ad443b86-80c8-4647-ac58-7cb1a9a5fa2a.log) )


# Commands available
From testing from browser console do 
`echoTest()` for checking the connectivity
`receiveJunk()` for receiving huge messages (1.6mb) from server
`send(junk)` for sending huge message from client terminates the websocket... 

Note: 
uncomment 

    maxReceivedMessageSize: 17486050, 
    maxReceivedFrameSize: 17486050,

these lines in server.js and run `send(junk)`

