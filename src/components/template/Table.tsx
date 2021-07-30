import Client from "../../core/Client";
import useAuth from "../../data/hook/useAuth";
import { IconeEdicao, IconeLixo } from "../icons";

interface TableProps {
    clientes: Client[]
    clienteSelecionado?: (cliente: Client) => void
    clienteExcluido?: (cliente: Client) => void
}

export default function Table(props: TableProps) {

    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado

    function renderizarCabecalho() {
        return (
            <tr>
                <th className="text-left p-4">Nota</th>
                <th className="text-left p-4">Data</th>
                {exibirAcoes ? <th className=" p-4">Ações</th> : false}
            </tr>
        )
    }
    
     const user = useAuth().usuario.uid

    function renderizarDados() {
        return props.clientes?.map((cliente, i) =>{
            cliente.idUnico = "123"
            console.log(cliente)
            if (cliente){
                return (
                    <tr key={cliente.id}
                    className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                        <td className="text-left p-4">{cliente.nome}</td>
                        <td className="text-left p-4">{cliente.idade}</td>
                        {exibirAcoes ? renderizarAcoes(cliente) : false}
                    </tr>
                )
            } else {
                return false
            }
        })
    }

    function renderizarAcoes(cliente: Client) {
        return (
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                <button onClick={() => props.clienteSelecionado?.(cliente)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full p-2 m-1
                    hover:bg-purple-50
                `}>
                    {IconeEdicao}
                </button>
                ) : false}
                {props.clienteExcluido ? (
                <button onClick={() => props.clienteExcluido?.(cliente)} className={`
                    flex justify-center items-center
                    text-red-500 rounded-full p-2 m-1
                    hover:bg-purple-50
                `}>
                    {IconeLixo}
                </button>
                ) : false}
            </td>
        )
    }
    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={` text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800`}>
            {renderizarCabecalho()}
            </thead>
            <tbody>
                {renderizarDados()}
            </tbody>
        </table>
    )
}
