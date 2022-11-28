const pantallaValorAnterior = document.getElementById('valor-anterior');
const pantallaValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const borrar = document.getElementById("borrar");
const borrarTodo = document.getElementById("borrarTodo");

const controlarGraficos = new Pantalla(pantallaValorAnterior, pantallaValorActual);


botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {controlarGraficos.agregarNumero(boton.innerHTML);});
});

borrar.addEventListener('click', function(){
    controlarGraficos.borrar();
});

borrarTodo.addEventListener('click', () => {controlarGraficos.borrarTodo();});

botonesOperadores.forEach(boton => {
    boton.addEventListener('click', () => controlarGraficos.computar(boton.value))
});