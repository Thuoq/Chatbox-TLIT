var express = require("express");
var app = express();
app.use(express.static("./public")); // file public client can access or request of client sent go to public make search
app.set("view engine","ejs");
app.set("views","./views");  // create one founder is views //  mission of views is contain

var server = require("http").Server(app); // create variables server
var io = require("socket.io")(server);
server.listen(3000);
var arrUser = ["jhon"];
io.on("connection", function(socket) {
	 console.log("Co nguoi ket noi"+ socket.id);
	 socket.on("client-send-Username",function(data) {
	 	if(arrUser.indexOf(data) >=0) {
	 		//fail
	 		socket.emit("server-send-sign-up-fail");
	 	}else {
	 		// success
	 		arrUser.push(data);
	 		//add username manager ezer
	 		socket.nameUser=data;
	 		socket.emit("server-send-succes-sign-up",data);
	 		//send arr for user
	 		io.sockets.emit("server-send-all-user-activies",arrUser);
	 	}
	 })
	socket.on("log-out",function () {
		arrUser.splice(
			// Who does want delete ? 
			arrUser.indexOf(socket.nameUser),1
			//arrUser.indexOf  seeking where are u ? then delete it ->1
		); 
		socket.broadcast.emit("server-send-all-user-activies",arrUser);

	});
	socket.on("user-send-messages",function (data){
		//io.sockets.emit("server-send-mesage",data)// how work don't not who chat ?
		io.sockets.emit("server-send-mesage",{un:socket.nameUser,nd:data});
	});
});
	 

	// io.on("connection",function(socket) {
	// 	console.log("have persons connect");
	// 	socket.on("disconnect",function(){
	// 		console.log(socket.id + "dis connect ")
	// 	});

	// 	socket.on("Client-send-data" , function(data) { 
	// 		console.log(data);
	// 		//io.sockets.emit("server-send-data", data +"8888" ); // server emit for  all of client
	//         //socket.emit("server-send-data", data +"8888") // server emit for only client
	//         socket.broadcast.emit(""server-send-data", data +"8888"")// server emit for all of client expect it
	//         // io.to("socket.id").emit();  this create array roi cho vo 

	// 	});
	// });


app.get("/",function (req, res) {
	res.render("trangchu") // Make render active , becasue must  declare
});