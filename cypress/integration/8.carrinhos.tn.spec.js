import ServerestNegative from '../services/serverestNegative.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /carrinhos da API Serverest', () => {

    it('CTN14 - Não deve tentar cadastrar um carrinho caso o token esteja ausente', () => {
        ServerestNegative.cadastrarCarrinhoSemSucessoToken().then( res => {
            expect(res.status).to.be.eq(401)
            cy.contractValidator(res, 'post-carrinhos', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('CTN15 - Não deve tentar excluir um carrinho e concluir a compra com sucesso caso o token esteja ausente', () => {
        ServerestNegative.concluirCarrinhoSemSucesso().then( res => {
            expect(res.status).to.be.eq(401)
            cy.contractValidator(res, 'delete-carrinhos-concluir-compra', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    it('CTN16 - Não deve tentar excluir um carrinho e cancelar a compra com sucesso caso o token esteja ausente', () => {
        ServerestNegative.cancelarCarrinhoSemSucesso().then( res => {
            cy.contractValidator(res, 'delete-carrinhos-cancelar-compra', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    })

    
    it('CTN17 - Não deve buscar um carrinho com um ID não existente', () => {
        ServerestNegative.buscarUmCarrinhoSemSucesso().then( res => {
            expect(res.status).to.be.eq(400)
            cy.contractValidator(res, 'get-carrinhos-id', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
        })
    })

    context('Logar com sucesso', () => {
        beforeEach('', () => {
            ServerestNegative.verificarSeExisteUsuario()
            ServerestNegative.buscarCarrinhoAleatorio()
            ServerestNegative.buscarProdutoParaCarrinho()
            ServerestNegative.buscarUsuarioParaLogin()
            cy.get('@usuarioLogin').then( usuario => {
                ServerestNegative.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    ServerestNegative.salvarBearer(res)
                })
            })
        })

        it('Deve excluir o carrinho do usuário logado, se existir', () => {
            ServerestNegative.cancelarCarrinho().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-carrinhos-cancelar-compra', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            })
        })

        it('CTN18 - Não deve cadastrar um carrinho com produtos duplicados', () => {
            ServerestNegative.cadastrarCarrinhoSemSucesso().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'post-carrinhos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Não é permitido possuir produto duplicado')
            })
        })

        
        it('CTN19 - Não deve cadastrar um carrinho com produtos não cadastrados', () => {
            ServerestNegative.cadastrarCarrinhoSemSucessoInex().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'post-carrinhos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Produto não encontrado')
            })
        })

        it('CTN20 - Não deve cadastrar um carrinho com um produto sem quantidade o suficiente', () => {
            ServerestNegative.cadastrarCarrinhoSemSucessoQuantidade().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'post-carrinhos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Produto não possui quantidade suficiente')
            })
        })

        it('CTN21 - Não deve cadastrar um carrinho para um usuário que já tenha um carrinho', () => {
            ServerestNegative.cadastrarCarrinhoComSucesso()
            ServerestNegative.cadastrarCarrinhoSemSucessoDuplicado().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'post-carrinhos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Não é permitido ter mais de 1 carrinho')
            })
        })

    })
})