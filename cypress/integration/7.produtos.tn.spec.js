import ServerestNegative from '../services/serverestNegative.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /produtos da API Serverest', () => {

    it('CTN05 - Não deve tentar cadastrar um produto caso o token esteja ausente', () => {
        ServerestNegative.cadastrarProdutoSemSucessoToken().then( res => {
            expect(res.status).to.be.eq(401)
            cy.contractValidator(res, 'post-produtos', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
            ValidaServerest.validarCadastroDeProdutosSemSucessoToken(res)
        })
    })

    it('CTN06 - Não deve tentar excluir um produto caso o token esteja ausente', () => {
        ServerestNegative.buscarProdutoParaAlterar()
        cy.get('@idProdutoAlt').then( res => {
            ServerestNegative.excluirProdutoSemSucessoToken(res).then( res => {
                expect(res.status).to.be.eq(401)
                cy.contractValidator(res, 'delete-produtos', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
        })
    })

    it('CTN07 - Não deve tentar editar um produto caso o token esteja ausente', () => {
        ServerestNegative.buscarProdutoParaAlterar()
        cy.get('@idProdutoAlt').then( res => {
            ServerestNegative.editarProdutoSemSucessoToken(res).then( res => {
                expect(res.status).to.be.eq(401)
                cy.contractValidator(res, 'put-produtos', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
        })
    })

    context('Logar com sucesso em usuário administrador', () => {
        beforeEach('', () => {
            ServerestNegative.verificarSeExisteUsuarioAdm()
            ServerestNegative.buscarUsuarioParaLoginAdm()
            cy.get('@usuarioLogin').then( usuario => {
                ServerestNegative.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    ServerestNegative.salvarBearer(res)
                })
            })
        })
        
        it('CTN08 - Não deve cadastrar um produto caso o nome já esteja cadastrado', () => {
            ServerestNegative.buscarProdutoParaCadastroNegativo()
            cy.get('@produtoCadastro').then( res => {
                ServerestNegative.cadastrarProdutoSemSucesso(res).then( res => {
                    expect(res.status).to.be.eq(400)
                    cy.contractValidator(res, 'post-produtos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarCadastroDeProdutosSemSucesso(res)
                })
            })
        })

        it('CTN09 - Não deve buscar um produto com um ID não existente', () => {
            ServerestNegative.buscarUmProdutoSemSucesso().then( res => {
                expect(res.status).to.be.eq(400)
                cy.contractValidator(res, 'get-produtos-id', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Produto não encontrado') 
            })
        })

        it('CTN10 - Não deve excluir um produto que esteja em um carrinho', () => {
            ServerestNegative.buscarProdutoEmCarrinho()
            cy.get('@idProduto').then( res => {
                ServerestNegative.excluirProdutoSemSucesso(res).then( res => {
                    expect(res.status).to.be.eq(400)
                    cy.contractValidator(res, 'delete-produtos', 400).then( res => expect(res).to.be.eq('Contrato válido!'))
                    expect(res.body.message).to.be.eq('Não é permitido excluir produto que faz parte de carrinho')
                })
            })
        })
        
    })

    context('Logar com sucesso em usuário não administrador', () => {
        beforeEach('', () => {
            ServerestNegative.verificarSeExisteUsuarioBase()
            ServerestNegative.buscarUsuarioParaLoginBase()
            cy.get('@usuarioLoginBase').then( usuario => {
                ServerestNegative.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    ServerestNegative.salvarBearer(res)
                })
            })
        })

        it('CTN11 - Não deve cadastrar um produto caso o usuário não seja administrador', () => {
            ServerestNegative.cadastrarProdutoSemSucessoAdm().then( res => {
                expect(res.status).to.be.eq(403)
                cy.contractValidator(res, 'post-produtos', 403).then( res => expect(res).to.be.eq('Contrato válido!'))
                ValidaServerest.validarCadastroDeProdutosSemSucessoAdm(res)
            })
        })

        it('CTN12 - Não deve excluir um produto caso o usuário não seja administrador', () => {
            ServerestNegative.buscarProdutoParaAlterar()
            cy.get('@idProdutoAlt').then( res => {
                ServerestNegative.excluirProdutoSemSucessoAdm(res).then( res => {
                    expect(res.status).to.be.eq(403)
                    cy.contractValidator(res, 'delete-produtos', 403).then( res => expect(res).to.be.eq('Contrato válido!'))
                    expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
                })
            })
        })

        it('CTN13 - Não deve editar um produto caso o usuário não seja administrador', () => {
            ServerestNegative.buscarProdutoParaAlterar()
            cy.get('@idProdutoAlt').then( res => {
                ServerestNegative.editarProdutoSemSucessoAdm(res).then( res => {
                    expect(res.status).to.be.eq(403)
                    cy.contractValidator(res, 'put-produtos', 403).then( res => expect(res).to.be.eq('Contrato válido!'))
                    expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
                })
            })
        })


    })
})