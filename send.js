#!/usr/bin/env node
const uuid = require('uuid');
var amqp = require('amqplib/callback_api');
var host = "amqp://134.209.17.228"
amqp.connect(host, function(error0, connection) {
    var transaction  ={
    transactionId: uuid.v4(),
    sender_profile: "PDV",
    sender_msisdn: "+221761234567",
    amount: 3000,
    type: "c2s",
    subtype: "AIRTIME",
    created_at: Date.new
  }


    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'transaction_queue';
        var msg = JSON.stringify(transaction);

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg), {
          persistent: true

        });

        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
