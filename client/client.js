
let ws

function initWb () {
  ws = new WebSocket("ws://localhost:8080/", ["echo-protocol"])
  ws.onopen = () => {
    console.log('connection opened testing connection')
    send('test')
  }
}

initWb()

function send (msg) {
  ws.send(msg);
}

function echoTest () {
  console.log('sending to server')
  send('echo')
}

function receiveJunk () {
  send('junk')
}

ws.onmessage = ({ data }) => {
  console.log('>>>received from server', data)
} 

ws.onerror = console.error
ws.onclose = console.warn

window.send = send
window.echoTest = echoTest
window.receiveJunk = receiveJunk