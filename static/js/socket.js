const socket=io("http://localhost:3000");
socket.on('update-element',function(data){
    document.querySelector(data.selector).innerHTML=data.value;
});
socket.on('add-element',function(data){
    document.querySelector(data.selector).innerHTML+=data.value;
});    
