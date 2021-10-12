//@ts-check
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
          .get('#menu') //gets parent navbar div
          .children()
          .children('nav') //finds the dropdown lists
          .children()
          .children('a') //finds the links inside each of the dropdown lists
          .within(($hoverLinkList) => { 
          cy
            .wrap($hoverLinkList)
            .each((index : string) => { //for each link this loop will run (loop will run 20 times)
            cy
              .get(index) // gets "index" (the given link inside of the list)
              .parent()
              .parent() // finds the hidden dropdown list
              .invoke('show') // makes dropdown list visible in order to click link
              .should('be.visible')
            cy
              .get(index) // finds the link inside of the list again
              .should('be.visible')
              .click() // clicks that link and loads new page
              .wait(2000) //waits for page to reload before trying to rerun the loop

              // this is where i encountered the following error:

              //"Timed out retrying after 4050ms: cy.click() failed because this element is detached from the DOM."

              //I have done my best to understand this error and have not come up 
              //with a conclusive answer as to why the element "detaches from the DOM."
              //I feel that with more time, studying, and mentorship. The reason behind this error will make sense.
          })
        })

    })
})

