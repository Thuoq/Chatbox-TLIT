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
 });
