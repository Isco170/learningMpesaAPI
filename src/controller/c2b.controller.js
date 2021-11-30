var axios = require('axios').default;
const config = require('../config');

async function c2b(request, response) {
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
        baseURL: config.urlC2B
    });

    const data = {
        input_TransactionReference: config.input_TransactionReference,
        input_CustomerMSISDN: numero,
        input_Amount: valor,
        input_ThirdPartyReference: config.input_ThirdPartyReference,
        input_serviceProviderCode: config.input_serviceProviderCode
    }

    api.post("/ipg/v1x/c2bPayment/singleStage/", {

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
            resposta: resp
        });
    }).catch((error) => {
        return response.status(404).send({
            resposta: error
        });
    })
}

module.exports = {
    c2b
}