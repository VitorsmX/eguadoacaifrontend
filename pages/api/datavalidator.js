import {validate} from 'deep-email-validator'
export default async function handler(req, res) {

    if(req.method !== 'POST') {
      return res.status(405).send({
        error: 'Method not allowed',
      })
    }

  const {data} = req.body

  const {email, tel} = data

  if (!email || !tel) {
    return res.status(200).send({
      error: 'Número de Telefone e Email são necessários',
    })
  }

  let responseEmail = await validate({
    email: email,
    sender: email,
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
  })

  if(!responseEmail.valid) {
    return res.status(200).send({
      error: 'Email inválido',
      email: responseEmail,
      tel,
    })
  }

  return res.status(200).send({
    error: "Seus Dados foram Enviados!",
    email: responseEmail,
    tel,
  })
}
