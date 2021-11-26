var axios = require('axios').default;
const jwt = require('jsonwebtoken');
const config = require('../config');


async function token() {
    const token = jwt.sign({ apiKey: config.apiKey, publicKey: config.publicKey }, (config.apiKey + config.publicKey), {
        expiresIn: 180
    });
    return token
}

async function c2b(request, response) {
    const tok = await token();

    const api = axios.create({
        baseURL: config.url
    });

    const data = {
        input_TransactionReference: 'T12344C',
        input_CustomerMSISDN: '258846461323',
        input_Amount: '10',
        input_ThirdPartyReference: '11114',
        input_serviceProviderCode: '171717'
    }

    api.post("/ipg/v1x/c2bPayment/singleStage/ HTTP/1.1", {

        input_TransactionReference: data.input_TransactionReference,
        input_CustomerMSISDN: data.input_CustomerMSISDN,
        input_Amount: data.input_Amount,
        input_ThirdPartyReference: data.input_ThirdPartyReference,
        input_serviceProviderCode: data.input_serviceProviderCode

    }, {
        headers: {
            Authorization: 'Bearer ' + tok,
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