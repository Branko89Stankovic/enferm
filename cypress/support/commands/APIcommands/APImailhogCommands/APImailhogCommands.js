import { newPassword, candidate1, manager } from '../../../../fixtures/fakes'

const baseAPI = Cypress.env('BASE_API')
let invitationLink
let invitationToken

Cypress.Commands.add('APIMailHogLogin', () => {
  cy.request({
    method: 'GET',
    url: 'https://mail-dev.enferm.io/api/v2/messages?limit=50',
    headers: {
      authorization: 'Basic ZW5mZXJtOmRldmVsb3AzUg=='
    }
  }).then((response) => {
    invitationLink = response.body.items[0].MIME.Parts[0].Body.split(/[()]/)[3]
      .replaceAll('3D', '')
      .replace(/[\r\n]/gm, '')
      .replaceAll('=', '')
      .replace('email', 'email=')
      .replace('&s', '&s=')

    invitationToken = invitationLink.split('/')[4].split('?')[0]
    console.log(invitationLink)
    console.log(invitationToken)
    console.log(candidate1.email)
    console.log(manager.email)
  })
})

Cypress.Commands.add('APIGoOnTheSetUpPasswordPage', () => {
  cy.visit(invitationLink)
})

Cypress.Commands.add('APIManagerVerification', () => {
  let options = {
    method: 'POST',
    url: `${baseAPI}/invite/accept`,
    body: {
      token: invitationToken,
      email: manager.email,
      password: newPassword,
      password_confirmation: newPassword
    }
  }
  cy.request(options)
})

Cypress.Commands.add('APICandidateVerification', () => {
  let options = {
    method: 'POST',
    url: `${baseAPI}/invite/accept`,
    body: {
      token: invitationToken,
      email: candidate1.email,
      password: newPassword,
      password_confirmation: newPassword
    }
  }
  cy.request(options)
})
