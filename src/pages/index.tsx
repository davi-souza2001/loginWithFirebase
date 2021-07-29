import ContentModel from '../components/template/ContentModel'
import Layout from '../components/template/Layout'
import Table from '../components/template/Table'
import Botao from '../components/template/Botao'
import Client from '../core/Client'
import FormularioContent from '../components/template/FormularioContent'
import { useEffect, useState } from 'react'
import ColecaoCliente from '../firebase/db/ColecaoCliente'
import ClienteRepositorio from '../core/ClienteRepositorio'

export default function Home() {

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Client>(Client.vazio())
  const [clientes, setClientes] = useState<Client[]>([])
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  useEffect(obterTodos, [])
  
  function obterTodos() {
    repo.obterTodos().then(clientes => {
      setClientes(clientes)
      setVisivel('tabela')
    })
  }

  function clienteSelecionado(cliente: Client) {
    setCliente(cliente)
    setVisivel('form')
  }

  async function clienteExcluido(cliente: Client) {
    await repo.excluir(cliente)
    obterTodos()
  }

  function novoCliente() {
    setCliente(Client.vazio())
    setVisivel('form')
  }

  async function salvarCliente(cliente: Client) {
  await repo.salvar(cliente)
  obterTodos()
  }


  return (
    <Layout titulo="Suas Notas" subtitulo="Adicione aqui suas notas mais importantes !">
      <div className={`
        flex justify-center items-center h-96 bg-gradient-to-r
        to-purple-500 text-white
      `}>
        
        <ContentModel>
          {visivel === 'tabela' ? (
          <>
          <div className="flex justify-end">
            <Botao cor="green" className="mb-4"
             onClick={novoCliente}>
              Nova Nota</Botao>
          </div>
          <Table clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
          />
          </>
          ) : (
            <FormularioContent 
              cliente={cliente}
              clienteMudou={salvarCliente}
              cancelado={() => setVisivel('tabela')}
            />
          )}
        </ContentModel>
      </div>
    </Layout>
  )
}
