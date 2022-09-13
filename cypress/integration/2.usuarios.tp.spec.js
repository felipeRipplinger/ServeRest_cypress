/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'
import Factory from '../fixtures/factory'

describe('Casos de teste positivos sobre a rota /usuarios da API Serverest', () => {

    it('CTP02 - Deve buscar todos os usuários cadastrados', () => {
        Serverest.buscarUsuarios().then( res => {
            expect(res.status).to.be.eq(200)
            cy.contractValidator(res, 'get-usuarios', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('CTP03 - Deve cadastrar um novo usuário com sucesso', () => {
        Serverest.cadastrarUsuarioComSucesso().then( res => {
            expect(res.status).to.be.eq(201)
            cy.contractValidator(res, 'post-usuarios', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Serverest.salvarIdUsuario(res)
        })
    })

    it('CTP04 - Deve cadastrar um novo usuário administrador com sucesso', () => {
        Serverest.cadastrarUsuarioAdmComSucesso().then( res => {
            expect(res.status).to.be.eq(201)
            cy.contractValidator(res, 'post-usuarios', 201).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
            Serverest.salvarIdUsuarioAdm(res)
        })
    })

    it('CTP05 - Deve buscar um usuário com sucesso', () => {
        Serverest.buscarUmUsuarioComSucesso().then( res => {
            expect(res.status).to.be.eq(200)
            cy.contractValidator(res, 'get-usuarios-id', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body._id).to.be.eq(`${Cypress.env("idUser")}`)
        })
    })

    it('CTP06 - Deve editar um usuário com sucesso', () => {
        Serverest.editarUsuarioComSucesso().then( res => {
            expect(res.status).to.be.eq(200)
            cy.contractValidator(res, 'put-usuarios', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Registro alterado com sucesso')
        })
    })

    it('CTP07 - Deve excluir um usuário com sucesso', () => {
        Serverest.excluirUsuarioComSucesso().then( res => {
            expect(res.status).to.be.eq(200)
            cy.contractValidator(res, 'delete-usuarios', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Registro excluído com sucesso')
        })
    })

    it('Deve excluir um usuário administrador com sucesso', () => {
        Serverest.excluirUsuarioAdmComSucesso().then( res => {
            expect(res.status).to.be.eq(200)
            cy.contractValidator(res, 'delete-usuarios', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.body.message).to.be.eq('Registro excluído com sucesso')
        })
    })

    it('CTP08 - Deve buscar e salvar um usuário em um arquivo JSON', () => {
        //let inteiro = Factory.gerarInteiroAleatorio()
        Serverest.verificarSeExisteUsuario()
        Serverest.buscarUsuarios().then( res => {
            cy.writeFile('./cypress/fixtures/usuario.json', res.body.usuarios[0])
            ValidaServerest.validarBuscaDeUsuarios(res)
        })
    })

    it('CTP09 - Deve logar com um usuário de um arquivo JSON',() => {
        cy.fixture('usuario.json').then( json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            Serverest.logar(usuario).then( res => {
                ValidaServerest.validarLoginComSucesso(res)
                expect(res.status).to.be.eq(200)
                Serverest.salvarBearer(res)
            })
        })
    })

})