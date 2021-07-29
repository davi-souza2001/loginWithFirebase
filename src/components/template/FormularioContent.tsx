import { useState } from "react";
import Client from "../../core/Client";
import Botao from "./Botao";
import Entrada from "./Entrada";

interface FormularioContentProps {
    cliente: Client
    clienteMudou?: (cliente: Client) => void
    cancelado?: () => void
}

export default function FormularioContent(props: FormularioContentProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.nome ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)
    return (
        <div>
            {id ? ( 
                <Entrada 
                    somenteLeitura
                    texto="Código" 
                    valor={id} 
                    className="mb-5"
                />
            ) : false}
            <Entrada 
                texto="Nome" 
                valor={nome} 
                valorMudou={setNome}
                className="mb-5" 
            />
            <Entrada 
                texto="Data" 
                tipo="text"
                valor={idade}
                valorMudou={setIdade}
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2"
                    onClick={() => props.clienteMudou?.(new Client(nome, idade, id))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}
