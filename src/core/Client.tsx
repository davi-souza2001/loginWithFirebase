export default class Client {
    #id: string;
    #nome: string
    #idade: number;
    #idUnico?: string;

    constructor(nome: string, idade:number, id: string = null, idUnico: string = null){
        this.#nome = nome
        this.#idade = idade
        this.#id = id
        this.#idUnico = idUnico
    }

    static vazio() {
        return new Client('', 0)
    }

    set idUnico(valor: string) {
        this.#idUnico = valor
    }

    get id() {
        return this.#id
    }
    
    get nome() {
        return this.#nome
    }
    
    get idade() {
        return this.#idade
    }

    get idUnico() {
        return this.#idUnico
    }
}

