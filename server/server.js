var WebSocketServer = require('websocket').server
var http = require('http')
var { junk } = require('./junk')

var server = http.createServer(function (request, response) {
  console.log((new Date()) + ' Received request for ' + request.url)
  response.writeHead(404)
  response.end()
})
server.listen(8080, function () {
  console.log((new Date()) + ' Server is listening on port 8080')
})

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
  // maxReceivedMessageSize: 17486050, 
  // maxReceivedFrameSize: 17486050,
})

wsServer.on('request', function (request) {

  var connection = request.accept('echo-protocol', request.origin)
  console.log((new Date()) + ' Connection accepted.')
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ' + message.utf8Data)
      connection.sendUTF(message.utf8Data)
      if (message.utf8Data === 'junk') {
        connection.sendUTF(junk)
      }
    }
    else if (message.type === 'binary') {
      console.log('Received Binary Message of ' + message.binaryData.length + ' bytes')
      connection.sendBytes(message.binaryData)
    }
  })
  connection.on('close', function (reasonCode, description) {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
  })
})