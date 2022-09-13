import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste positivos sobre a rota /carrinhos da API Serverest', () => {

    it('CTP15 - Deve buscar todos os carrinhos cadastrados', () => {
        Serverest.buscarCarrinhos().then( res => {
            cy.contractValidator(res, 'get-carrinhos', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
        })
    })


    context('Logar com sucesso', () => {
        beforeEach('', () => {
            Serverest.verificarSeExisteUsuario()
            Serverest.buscarProdutoParaCarrinho()
            Serverest.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
            })
        })

        it('Deve excluir o carrinho do usuário logado, se existir', () => {
            Serverest.cancelarCarrinho().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-carrinhos-cancelar-compra', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            })
        })

        it('CTP16 - Deve cadastrar um carrinho com sucesso', () => {
            Serverest.cadastrarCarrinhoComSucesso().then( res => {
                Serverest.salvarIdCarrinho(res)
                expect(res.status).to.be.eq(201)
                cy.contractValidator(res, 'post-carrinhos', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            })
        })

        it('CTP17 - Deve buscar um carrinho com sucesso', () => {
            Serverest.buscarUmCarrinhoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'get-carrinhos-id', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body._id).to.be.eq(`${Cypress.env("idCarrinho")}`)
            })
        })

        it('CTP18 - Deve excluir outro carrinho e cancelar a compra com sucesso', () => {
            Serverest.cancelarCarrinho().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-carrinhos-cancelar-compra', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro excluído com sucesso. Estoque dos produtos reabastecido')
            })
        })

        it('Deve cadastrar outro carrinho com sucesso', () => {
            Serverest.cadastrarCarrinhoComSucesso().then( res => {
                expect(res.status).to.be.eq(201)
                cy.contractValidator(res, 'post-carrinhos', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            })
        })

        it('CTP19 - Deve excluir um carrinho e concluir a compra com sucesso', () => {
            Serverest.concluirCarrinho().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-carrinhos-concluir-compra', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro excluído com sucesso')
            })
        })

    })
})