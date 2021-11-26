var axios = require('axios').default;
const jwt = require('jsonwebtoken');
const config = require('../config');


async function token(){
    const token = jwt.sign({ apiKey: config.apiKey, publicKey: config.publicKey}, (config.apiKey+config.publicKey) , {
        expiresIn: 180
    });
    console.log(token);
    return token
}

async function c2b(request, response){
    const tok = await token();

    const api = axios.create({
        baseURL: config.url
    });

    const data = {
        input_TransactionReference: 'T12344C',
        input_CustomerMSISDN: '258846461323',
        input_Amount: '10',
        input_ThirdPartyReference: '0AG64V',
        input_serviceProviderCode: '171717'
    }

    api.post("/ipg/v1x/c2bPayment/singleStage/ HTTP/1.1", data,{
        headers: {
            Authorization: tok,
            Origin: config.origin
        }
    }).then( (resp) =>{
        return response.status(202).send({
            resposta: resp
        });
    }).catch((error) =>{
        return response.send({
            resposta: error
        });
    })
}

module.exports = {
    c2b
}