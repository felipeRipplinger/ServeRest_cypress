import { faker } from '@faker-js/faker';

export default class Factory {

    static gerarProduto(){
        return {
            "nome": faker.commerce.productName(),
            "preco": faker.commerce.price(),
            "descricao": faker.commerce.productDescription(),
            "quantidade": faker.datatype.number()
        }
    }

    static gerarUsuario(){
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'false'
        }
    }

    static gerarUsuarioAdm(){
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
            "administrador": 'true'
        }
    }

    static gerarInteiroAleatorio(){
        return faker.datatype.number(5)
    }

    static gerarUsuarioParaLogin(){
        return {
            "email": faker.internet.email(),
            "password": faker.internet.password()
        }
    }

    static gerarIdAleatorio(){
        return faker.random.numeric(16)
    }
}