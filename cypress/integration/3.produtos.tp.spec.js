import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste positivos sobre a rota /produtos da API Serverest', () => {

    it('CTP10 - Deve buscar todos os produtos cadastrados', () => {
        Serverest.buscarProdutos().then( res => {
            expect(res.status).to.be.eq(200)
            ValidaServerest.validarBuscaDeProdutos(res)
        })
    })

    context('Logar com sucesso em usuário administrador', () => {
        beforeEach('', () => {
            Serverest.verificarSeExisteUsuarioAdm()
            Serverest.buscarUsuarioParaLoginAdm()
            cy.get('@usuarioLogin').then( usuario => {
                Serverest.logar(usuario).then( res => {
                    expect(res.status).to.be.eq(200)
                    cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                    ValidaServerest.validarLoginComSucesso(res)
                    Serverest.salvarBearer(res)
                })
            })
        })
        
        it('CTP11 - Deve cadastrar um novo produto com sucesso', () => {
            Serverest.cadastrarProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(201)
                cy.contractValidator(res, 'post-produtos', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
                ValidaServerest.validarCadastroDeProdutosComSucesso(res)
                Serverest.salvarIdProduto(res)
            })
        })

        it('CTP12 - Deve buscar um produto com sucesso', () => {
            Serverest.buscarUmProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'get-produtos-id', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body._id).to.be.eq(`${Cypress.env("idPro")}`)
            })
        })

        it('CTP13 - Deve editar um produto com sucesso', () => {
            Serverest.editarProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'put-produtos', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro alterado com sucesso')
            })
        })

        it('CTP14 - Deve excluir um produto com sucesso', () => {
            Serverest.excluirProdutoComSucesso().then( res => {
                expect(res.status).to.be.eq(200)
                cy.contractValidator(res, 'delete-produtos', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.body.message).to.be.eq('Registro excluído com sucesso')
            })
        })
    })

})