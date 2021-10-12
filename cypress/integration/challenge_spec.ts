describe('Login Test', ()=> {
  it('Tests login error message when wrong information is enetered', () => {
    cy
      .visit('https://www.aumni.fund/')
      .wait(5000) //visits website
    cy
      .get('.login')
      .click() //finds and clicks login button
    cy
      .get('button')
      .click() // clicks second login button
    cy
      .get('#1-email')
      .click()
      .type('username@gmail.com', {force: true}) //finds email input box and types email
    cy
      .get('.auth0-lock-input-show-password > .auth0-lock-input-block > .auth0-lock-input-wrap > .auth0-lock-input')
      .click()
      .type('password', {force: true}) // finds password box and types the password
    cy
      .get('.auth0-label-submit')
      .click()
      .wait(1000) // clicks submit button on login form
    cy
      .get('.auth0-lock-content-body-wrapper')
      .children()
      .children()
      .should('be.visible') // detects if error message shows up when given wrong login info
  })
})

describe('Nav Link Test', () => {
  it('Tests links on navbar to make sure each page loads correctly', () => {
    cy
      .visit('https://www.aumni.fund/')
      .wait(1000) //connects to website
    cy
      .get('#menu') //gets navbar
      .children()
      .children('nav') //finds the dropdown lists
      .children()
      .children('a') //finds the links inside each of the dropdown lists
      .then(($hoverLinkList) => { 
        cy
          .wrap($hoverLinkList)
          .each((index : string) => { //for each link this loop will run (loop will run 20 times)
          cy
            .get(index) // gets "index" (the given link inside of the list)
            .should('have.attr', 'href') //identifies the link inside of the HTML element
            .then((href) => {
              cy
                .visit(`https://www.aumni.fund/${href}`) //visits link
            })
          })
      })

    })
})

describe('Demo Registration Test', () => {
  it('Fills out Demo registration form', () => {
    cy
      .visit('https://www.aumni.fund/')
      .wait(2000)

      cy
        .get('.flex > .btn')
        .click({force:true})
        .wait(3000) //clicks "get a demo button"

      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })

      cy
      .get('#PixetoFrame') //gets the forms link
      .should('have.attr', 'src')
      .then((href) => {
        cy.visit(`${href}`) //goes to the forms link 
      })

      //fills out inputs with arbitrary information, but skips the captcha and checks for error message regaurding the captcha
      cy
        .get('.first_name') 
        .click()
        .type('Mike')
      cy
        .get('.last_name')
        .click()
        .type('Wazowski')
      cy
        .get('.email')
        .click()
        .type('PookieBear@Monsters.inc')
      cy
        .get('.company')
        .click()
        .type('Monsters.inc')
      cy
        .get('.select')
        .select('Other Service Provider')
      cy
        .get('.submit')
        .click()
      cy
        .get('.errors')
        .contains('Please correct the errors below:')
        .should('be.visible')
      cy  
        .get('.no-label')
        .should('be.visible')
      
  })
})