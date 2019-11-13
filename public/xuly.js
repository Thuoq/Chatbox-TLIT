 var socket = io("http://localhost:3000");// connect server
 socket.on("server-send-sign-up-fail",function() {
 	alert("OOPS :( :< Please choose another Nick name :(");
 });
 socket.on("server-send-succes-sign-up",function(data){
 	$("#currentUser").html(data);
 	$("#loginForm").hide(2000);
	$("#chatForm").show(1000);

 });
 socket.on("server-send-all-user-activies",function(data) {
 	$("#boxContent").html("");
 	data.forEach(function(i) { // 
 		$("#boxContent").append("<div class='userOnline'>"+ i+"</div>")


 	})
 });
 $(document).ready(function () {
	 $("#loginForm").show();
	 $("#chatForm").hide();

	 $("#bthRegister").click(function() {
	 	 socket.emit("client-send-Username",$("#txtUsername").val());
	 });
	 $("#btnLogout").click(function() {
	 	socket.emit("log-out");
	 	$("#chatForm").hide(2000);
	 	$("#loginForm").show(1000);
	 });
	 $("#btnMessegaes").click(function(){
	 	socket.emit("user-send-messages",$("#txtMessage").val());
	 });
 });
socket.on("server-send-mesage",function(data){
	$("#listMessages").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>");
});