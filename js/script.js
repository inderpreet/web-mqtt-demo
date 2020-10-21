var mqtt;
var reconnectTimeout = 2000;
var host = "mqtt.eclipse.org"
var port = 80


onConnect = () => {
        console.log("Connected");
        mqtt.subscribe("ipv1-topic");
        mess = new Paho.MQTT.Message("Test Message")
        mess.destinationName = "ipv1-topic";
        mqtt.send(mess);
}

connect = () => {
        console.log('Trying...' + host + ' at ' + port);
        mqtt = new Paho.MQTT.Client(host,port,'ipv1-client1-random');
        var options = {
                timeout: 3,
                onSuccess: onConnect,
                // onMessageArrived: onMessage
        };
        mqtt.onMessageArrived = onMessage;
        mqtt.connect(options);
}

onConnectionLost = (rO) => {
        if(rO.errorCode !==0){
                console.log("Disconnected");
        }
}

onMessage = (mess) =>{
        console.log("received: " + mess.payloadString)
}

connect();

// 'use strict'

// var mqtt = require('./MQTT.js/')
// var client = mqtt.connect('mqtt://test.mosquitto.org')

// client.subscribe('ipv1')
// client.publish('ipv1', 'Hello World')

// client.on('message', function (topic, message){
//         console.log(message.toString())
// })

// client.end()
