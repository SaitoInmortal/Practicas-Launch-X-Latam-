var op = true;
var inicio=false;
const pokeNameInput = document.getElementById("pokeName");
const pokeNumeroInput = document.getElementById("pokeNum");
const pokeTipo=document.getElementById("tipo");
const Ma=document.getElementsByClassName("ap");
const estadisticas =document.getElementsByClassName("progeso");
const PName=document.getElementById("nombret");
const PNumero=document.getElementById("numerot");
const Inicio=document.getElementsByClassName("pokedexF");

const inicia = () => {
    if(inicio===false){
        Inicio[0].style.display="flex";
        inicio=true;
    }else{
        Inicio[0].style.display="none";
        inicio=false;
    }
}

const op1 = () => {
    pokeNameInput.style.display="initial";
    pokeNumeroInput.style.display="none";
    PNumero.style.display="inline";
    PName.style.display="none";
    op=true;
}
const op2 = () => {
    pokeNameInput.style.display="none";
    pokeNumeroInput.style.display="initial";
    PName.style.display="inline";
    PNumero.style.display="none";
    op=false;
}
const fetchPokemon = async () => {
    let url;
    if (op ===true) {
        let pokeName = pokeNameInput.value;
        pokeName = pokeName.toLowerCase();
        url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    }else{
        let pokeNumero = pokeNumeroInput.value;
        url = `https://pokeapi.co/api/v2/pokemon/${pokeNumero}`;
    }
    let data = await fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("https://cdn-icons-png.flaticon.com/512/3814/3814210.png")
        }
        else {
            return res.json();
        }
    });
    if(data){
        console.log(data)
        let pokeImg = data.sprites.front_default;
        pokeImage(pokeImg)
        if(op ===true){
            let numero = data.id;
            PNumero.innerHTML = numero;
        }else{
            let nombre = data.name;
            PName.innerHTML = nombre;
        }
        let tipo = data.types[0].type.name;
        pokeTipo.innerHTML = tipo;
        let habilidad1 = data.abilities[0].ability.name;
        let habilidad2 = data.abilities[1].ability.name;
        Ma[0].innerHTML = habilidad1;
        Ma[1].innerHTML = habilidad2;
        let i = 0
        for (i ; i < 6 ; i += 1) {
            let f = data.stats[i].base_stat;
            estadisticas[i].style.width = f/2 + "%";
        }
    }
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}