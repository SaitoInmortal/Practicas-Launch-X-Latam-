var socket = io();
let unirse = document.getElementById('unirse');
let nameRoom = document.getElementById('nameRoom');
let NameRoom = document.getElementById('NameRoom');
let crear = document.getElementById('crear');
let password = document.getElementById('password');
let contenedor = document.getElementsByClassName('crear')[0];
let contenedor2 = document.getElementsByClassName('unir')[0];
let display = document.getElementsByClassName('requisitos')[0];
let display2 = document.getElementsByClassName('requisitos2')[0];
let userName = document.getElementById('userName');
let info = document.getElementById('textInfo');

contenedor.addEventListener('click', ()=>{
    display.style.display = "block"; 
    display2.style.display = "none"; 
});

contenedor2.addEventListener('click', ()=>{
    display2.style.display = "initial"; 
    display.style.display = "none"; 
});

unirse.addEventListener('click', function(e) { 
    e.preventDefault();
    socket.emit ('unirse', nameRoom.value);
    nameRoom.value = '';
});

crear.addEventListener('click', function(e) { 
    e.preventDefault();
    socket.emit ('createRoom', [NameRoom.value, password.value]);
    NameRoom = '';
    password.value = '';

});

socket.on('noEncontrado', (mse)=>{
    info.innerHTML = mse;
    info.style.padding = "10px";
    info.style.color = "#FFFFFF";
    info.style.backgroundColor = "#ED1C24";
});

socket.on("redirect", (rt)=>{
    window.location.href = rt
});
