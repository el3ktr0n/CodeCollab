var editor = ace.edit("editor");
var otherPerson;
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/c_cpp");
$("#editor").keyup(function(){
	console.log(editor.getSession().getValue());
	emitCode(editor.getSession().getValue());
})
io.on('updateCode', function(data){
	console.log('updateCode event received: ', data);
	editor.getSession().setValue(data.code);
});

$('#cpp_c').click(function(){
	editor.getSession().setMode("ace/mode/c_cpp");
	emitLanguagePreference("c_cpp");
});
$('#javascript').click(function(){
	editor.getSession().setMode("ace/mode/javascript");
	emitLanguagePreference("javascript");
});
$('#java').click(function(){
	editor.getSession().setMode("ace/mode/java");
	emitLanguagePreference("java");
});
$('#python').click(function(){
	editor.getSession().setMode("ace/mode/python");
	emitLanguagePreference("python");
});
$('#haskell').click(function(){
	editor.getSession().setMode("ace/mode/haskell");
	emitLanguagePreference("haskell");
});
$('#css').click(function(){
	editor.getSession().setMode("ace/mode/css");
	emitLanguagePreference("css");
});
$('#html').click(function(){
	editor.getSession().setMode("ace/mode/html");
	emitLanguagePreference("html");
});
$('#csharp').click(function(){
	editor.getSession().setMode("ace/mode/csharp");
	emitLanguagePreference("csharp");
});
$('#perl').click(function(){
	editor.getSession().setMode("ace/mode/perl");
	emitLanguagePreference("perl");
});
$('#ruby').click(function(){
	editor.getSession().setMode("ace/mode/ruby");
	emitLanguagePreference("ruby");
});
io.on('changeLanguage', function(data){
	console.log(data.lang);
	editor.getSession().setMode("ace/mode/"+data.lang);
});

$('#ambiance').click(function(){
	editor.setTheme("ace/theme/ambiance");
	emitThemePreference("ambiance");
});
$('#chaos').click(function(){
	editor.setTheme("ace/theme/chaos");
	emitThemePreference("chaos");
});
$('#chrome').click(function(){
	editor.setTheme("ace/theme/chrome");
	emitThemePreference("chrome");
});
$('#clouds').click(function(){
	editor.setTheme("ace/theme/clouds");
	emitThemePreference("clouds");
});
$('#cobalt').click(function(){
	editor.setTheme("ace/theme/cobalt");
	emitThemePreference("cobalt");
});
$('#crimson_editor').click(function(){
	editor.setTheme("ace/theme/crimson_editor");
	emitThemePreference("crimson_editor");
});
$('#dawn').click(function(){
	editor.setTheme("ace/theme/dawn");
	emitThemePreference("dawn");
});
$('#dreamweaver').click(function(){
	editor.setTheme("ace/theme/dreamweaver");
	emitThemePreference("dreamweaver");
});
$('#eclipse').click(function(){
	editor.setTheme("ace/theme/eclipse");
	emitThemePreference("eclipse");
});
$('#github').click(function(){
	editor.setTheme("ace/theme/github");
	emitThemePreference("github");
});
$('#kr').click(function(){
	editor.setTheme("ace/theme/kr");
	emitThemePreference("kr");
});
$('#merbivore').click(function(){
	editor.setTheme("ace/theme/merbivore");
	emitThemePreference("merbivore");
});
$('#mono_industrial').click(function(){
	editor.setTheme("ace/theme/mono_industrial");
	emitThemePreference("mono_industrial");
});
$('#monokai').click(function(){
	editor.setTheme("ace/theme/monokai");
	emitThemePreference("monokai");
});
$('#twilight').click(function(){
	editor.setTheme("ace/theme/twilight");
	emitThemePreference("twilight");
});
$('#terminal').click(function(){
	editor.setTheme("ace/theme/terminal");
	emitThemePreference("terminal");
});
io.on('changeTheme', function(data){
	console.log(data.theme);
	editor.setTheme("ace/theme/"+data.theme);
});


$("#add").click(function(){
	emitUserInfo($("#handle").val());
	var temp=$("#handle").val();
	$("#handle").val("Welcome "+temp);
});
$("#connect").click(function(){
	connectToUser($("#othershandle").val());
	var temp=$("#othershandle").val();
	$("#othershandle").val("Connected to "+temp);
});

io.on('usernameAlreadyRegistered', function(msg){
	console.log(msg);
	alert(msg);
});

function emitCode(code){
	var sessionId = io.socket.sessionid;
	var data = {
		code: code
	};
	console.log(sessionId);
	io.emit('updateCode', data, sessionId, otherPerson);
	console.log(data);
}

function emitLanguagePreference(lang){
	var sessionId = io.socket.sessionid;
	var data = {
		lang: lang
	};
	console.log(lang);
	io.emit('changeLanguage', data, sessionId, otherPerson);
}

function emitThemePreference(theme){
	var sessionId = io.socket.sessionid;
	var data = {
		theme: theme
	};
	console.log(theme);
	io.emit('changeTheme', data, sessionId, otherPerson);
}

function emitUserInfo(handle){
	var sessionId = io.socket.sessionid;
	var data = {
		handle: handle
	};
	console.log(handle);
	io.emit('addUser', data, sessionId);
}

function connectToUser(othershandle){
	otherPerson=othershandle;
	console.log(otherPerson);
}