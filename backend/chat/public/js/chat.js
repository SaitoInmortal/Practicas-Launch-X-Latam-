$(function(){
    const socket = io()
    let room = window.location.pathname;
    room = room.slice(1, room.length);
    let nick = '';
    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');
    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');
    const userNames = $('#usernames');
    const password = $('#password');
    const passForm = $('#password-form');

    messageForm.submit( e =>{
        e.preventDefault();
        socket.emit('enviar mensaje', {nameRoom : room, msg : messageBox.val(), nick : nick});
        messageBox.val('');
    });

    socket.on(`${room} mensaje`, function(datos){
        let color = '#f5f4f4';
        if(nick == datos.nick){
            color = '#9ff4c5';
        }
        
        chat.append(`
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg"><b>${datos.nick} :</b> ${datos.msg}</p>
        </div>
        `);

    });

    passForm.submit( e =>{
        e.preventDefault();
        socket.emit('password', [password.val(), room], result => {
            if(result){
                $('#password-wrap').hide();
                $('#nick-wrap').show();
                password.val('');
            }else{
                window.location.href = "/";
            }
        });
    });

    nickForm.submit( e =>{
        e.preventDefault();
        socket.emit('nuevo usuario', {name : nickName.val(), nameRoom : room}, datos =>{
            if(datos){
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            }else{
                nickError.html(`
                <div class="alert alert-danger">
                El usuario ya existe
                </div>
                `); 
            }
            nickName.val('');
        });

    });

    socket.on(`usernames ${room}`, datos =>{
        let html = '';
        let color = '#000';
        let salir = '';
        for(let item of datos){
            if(item.nick == nick){
                color = '#027f43';
                salir = `<a class="enlace-salir" href="/"><i class="fas fa-sign-out-alt"> &times;</i></a>`;
            }else{
                color = '#000';
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${item.nick} ${salir}</p>`;

        }

        userNames.html(html);
    });

});