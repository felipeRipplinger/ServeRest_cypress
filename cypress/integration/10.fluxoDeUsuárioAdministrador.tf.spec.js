/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

describe('CFT02 - Fluxo de atividades de um usuário administrador da API Serverest', () => {


    it('Usuário administrador se cadastra com sucesso', () => {
        Serverest.cadastrarUsuarioAdmComSucesso().then( res => {
            expect(res.status).to.be.eq(201)
            cy.contractValidator(res, 'post-usuarios', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Serverest.salvarIdUsuario(res)
        })
    })

    context('Usuário administrador loga com sucesso', () => {
        beforeEach('', () => {
            Serverest.verificarSeExisteUsuarioAdm()
            Serverest.buscarUmUsuarioComSucesso()
            Serverest.buscarUsuarioCadastradoParaLoginEmFluxo()
            cy.get('@usuarioLoginn').then( usuario => {
                Serverest.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
            })
        })
        
        it('Usuário administrador olha os produtos cadastrados', () => {
            Serverest.buscarProdutos().then( res => {
                expect(res.status).to.be.eq(200)
                ValidaServerest.validarBuscaDeProdutos(res)
            })
        })

        it('Usuário administrador cadastra um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(201)
                cy.contractValidator(res, 'post-produtos', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
                ValidaServerest.validarCadastroDeProdutosComSucesso(res)
                Serverest.salvarIdProduto(res)
            })
        })

        it('Usuário administrador edita um produto com sucesso', () => {
            Serverest.editarProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'put-produtos', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro alterado com sucesso')
            })
        })

        it('Usuário administrador exclui um produto com sucesso', () => {
            Serverest.excluirProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-produtos', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro excluído com sucesso')
            })
        })

    })
})