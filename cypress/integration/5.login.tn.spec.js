/// <reference types="cypress" />

import ServerestNegative from '../services/serverestNegative.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste negativos sobre a rota /login da API Serverest', () => {

    it('CTN01 - Não deve realizar login utilizando credenciais não registradas', () => {
        ServerestNegative.logarSemSucesso().then( res => {
            cy.contractValidator(res, 'post-login', 401).then( res => expect(res).to.be.eq('Contrato válido!'))
            expect(res.status).to.be.eq(401)
            ValidaServerest.validarLoginSemSucesso(res)
            })
        })
    })
