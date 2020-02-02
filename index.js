const express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app),
io = require('socket.io').listen(server);
port = 3000;
app.get('/', (req, res) => {

res.send('Chat Server is running on port 3000')
});

io.on('connection', (socket) => {

    console.log('user connected')
    
    socket.on('join', function(userNickname) {
    
            console.log(userNickname +" : has joined the chat "  )
    
            socket.broadcast.emit('userjoinedthechat',userNickname +" : has joined the chat ")
        });

    socket.on('messagedetection', (senderNickname,messageContent) => {

        //log the message in console 
    
        console.log(senderNickname+" :" +messageContent)
            //create a message object
    
        let  message = {"message":messageContent, "senderNickname":senderNickname}
    
    // send the message to the client side  
    
        socket.broadcast.emit('message', message )
    
        });

        socket.on('disconnect', function() {
        console.log( 'user has left ')
        socket.broadcast.emit( "userdisconnect" ,' user has left')
    
    
    });
    
});


server.listen(process.env.PORT||port, () => {
    console.log("Server listening on port " + port);
   });