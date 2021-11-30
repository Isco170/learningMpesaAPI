var axios = require('axios').default;
const config = require('../config');

async function b2c(request, response){
    const { numero, valor } = request.body;

    if (!numero)
        return response.status(400).send({
            message: 'Digite o número'
        })
    if (!valor)
        return response.status(400).send({
            message: 'Digite o valor'
        })

    const api = axios.create({
        baseURL: config.urlB2C
    });

    const data = {
        input_TransactionReference: config.input_TransactionReference,
        input_CustomerMSISDN: numero,
        input_Amount: valor,
        input_ThirdPartyReference: config.input_ThirdPartyReference,
        input_serviceProviderCode: config.input_serviceProviderCode
    }

    api.post("/ipg/v1x/b2cPayment/", {

        input_TransactionReference: data.input_TransactionReference,
        input_CustomerMSISDN: data.input_CustomerMSISDN,
        input_Amount: data.input_Amount,
        input_ThirdPartyReference: data.input_ThirdPartyReference,
        input_serviceProviderCode: data.input_serviceProviderCode

    }, {
        headers: {
            Authorization: config.auth,
            Origin: config.origin,

        }
    }).then((resp) => {
        return response.status(202).send({
            resposta: "Enviado"
        });
    }).catch((error) => {
        return response.status(404).send({
            resposta: error
        });
    })

}

module.exports = {
    b2c
}