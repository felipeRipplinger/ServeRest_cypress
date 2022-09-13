/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

describe('CFT01 - Fluxo de compra da API Serverest', () => {


    it('Usuário se cadastra com sucesso', () => {
        Serverest.cadastrarUsuarioComSucesso().then( res => {
            expect(res.status).to.be.eq(201)
            cy.contractValidator(res, 'post-usuarios', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Serverest.salvarIdUsuario(res)
        })
    })

    context('Usuário loga com sucesso', () => {
        beforeEach('', () => {
            Serverest.verificarSeExisteUsuario()
            Serverest.buscarUmUsuarioComSucesso()
            Serverest.buscarProdutoParaCarrinho()
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

        it('Usuário olha os produtos disponíveis', () => {
            Serverest.buscarProdutos().then( res => {
                expect(res.status).to.be.eq(200)
                ValidaServerest.validarBuscaDeProdutos(res)
            })
        })

        it('Usuário adiciona o produto que desejar no carrinho', () => {
            Serverest.cadastrarCarrinhoComSucesso().then( res => {
                expect(res.status).to.be.eq(201)
                cy.contractValidator(res, 'post-carrinhos', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            })
        })

        it('Usuário conclui a compra com sucesso', () => {
            Serverest.concluirCarrinho().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-carrinhos-concluir-compra', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro excluído com sucesso')
            })
        })

    })
})