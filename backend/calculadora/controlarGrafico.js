class Pantalla {
    constructor(pantallaValorAnterior, pantallaValorActual) {
        this.pantallaValorActual = pantallaValorActual;
        this.pantallaValorAnterior = pantallaValorAnterior;
        this.Calcular = new Calcular();
        this.tipoOperacion = undefined;
        this.valorActual = '';
        this.valorAnterior = '';
       this.signos = {
            sumar: '+',
            dividir: '/',
            multiplicar: 'x',
            restar: '-',
            resto: '%',
            potencia: '^',
            raiz: '√',

        }
    }

    imprimirValores() {
        this.pantallaValorActual.textContent = this.valorActual;
        this.pantallaValorAnterior.textContent = `${this.valorAnterior} ${this.signos[this.tipoOperacion] || ''}`;
    }

    agregarNumero(numero) {
        if(numero === '.' && this.valorActual.includes('.')) return;
        if(numero === 'π' && this.valorActual.includes('π')) return;
        if(numero === 'π'){ this.valorActual = 3.14;}else{
            this.valorActual = this.valorActual.toString() + numero.toString();

        }
        this.imprimirValores();
    }
    
    borrar() {
        this.valorActual = this.valorActual.toString().slice(0,-1);
        this.imprimirValores();
    }

    borrarTodo() {
        this.valorActual = '';
        this.valorAnterior = '';
        this.tipoOperacion = undefined;
        this.imprimirValores();
    }

    calcular() {
        const valorAnterior = parseFloat(this.valorAnterior);
        const valorActual = parseFloat(this.valorActual);
        if(this.tipoOperacion === "raiz"){
            if(!isNaN(valorAnterior) ){
                this.valorActual = this.Calcular[this.tipoOperacion](valorAnterior);
            }else{
                if(isNaN(valorActual)) return;
                this.valorActual = this.Calcular[this.tipoOperacion](valorActual);
            }
        }else{
            if( isNaN(valorActual)  || isNaN(valorAnterior) ) return;
            this.valorActual = this.Calcular[this.tipoOperacion](valorAnterior, valorActual);
        }
    }

    computar(tipo) {
        if(tipo === "raiz"){
            this.tipoOperacion = tipo;
            this.calcular()
            this.valorAnterior = this.valorActual;
        }else{
            if( tipo == 'igual'){
                this.calcular();
                if (this.valorActual === 0) {
                this.valorAnterior = this.valorActual;
                }else{
                this.valorAnterior = this.valorActual || this.valorAnterior;
                }
            }else{
                this.valorAnterior = this.valorActual || this.valorAnterior;
            }
        }
        this.tipoOperacion = tipo;
        this.valorActual = '';
        this.imprimirValores();
    }
}