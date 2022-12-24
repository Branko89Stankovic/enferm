import { manager } from '../../../fixtures/fakes'
import { regionID } from './APIsettingsCommands'

let managerID

Cypress.Commands.add('APICreateUser', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'POST',
      url: `https://devapi.enferm.io/api/v1/users/invite?include=role`,
      body: {
         email: `${manager.email}`,
         two_way_enabled: false,
         first_name: `${manager.managerFirstName}`,
         last_name: `${manager.managerLastName}`,
         mobile_phone: `${manager.phoneNumber}`,
         role_id: 7,
         is_phone_verified: false,
         notification_methods: [],
         user_status: 0,
         agencies: [
            {
               id: `${regionID}`
            }
         ],
         pin: '',
         clients: [],
         role: {
            id: 7,
            name: 'manager',
            label: 'Manager'
         }
      },
      headers: {
         authorization
      }
   }
   cy.request(options).then((response) => {
      managerID = response.body.data.id
   })
})

Cypress.Commands.add('APIDeleteUser', (token) => {
   let authorization = `bearer ${token}`
   let options = {
      method: 'DELETE',
      url: `https://devapi.enferm.io/api/v1/users/${managerID}`,
      headers: {
         authorization
      }
   }
   cy.request(options)
})

export { managerID, regionID }