/// <reference types="cypress" />

import Serverest from '../services/serverest.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste positivos sobre a rota /login da API Serverest', () => {

    it('CTP01 - Deve realizar um login com sucesso', () => {
        Serverest.verificarSeExisteUsuario()
        Serverest.buscarUsuarioParaLogin()
        cy.get('@usuarioLogin').then( usuario => {
            Serverest.logar(usuario).then( res => {
                cy.contractValidator(res, 'post-login', 200).then( res => expect(res).to.be.eq('Contrato válido!'))
                expect(res.status).to.be.eq(200)
                ValidaServerest.validarLoginComSucesso(res)
                Serverest.salvarBearer(res)
            })
        })
    })

})