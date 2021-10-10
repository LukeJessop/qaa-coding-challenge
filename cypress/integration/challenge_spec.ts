describe('Login Test', ()=> {
  it('Tests login error message when wrong information is enetered', () => {
    cy
      .visit('https://www.aumni.fund/')
      .wait(5000)
    cy
      .get('.login')
      .click()
    cy
      .get('button')
      .click()
    cy
      .get('#1-email')
      .click()
      .type('username@gmail.com', {force: true})
    cy
      .get('.auth0-lock-input-show-password > .auth0-lock-input-block > .auth0-lock-input-wrap > .auth0-lock-input')
      .click()
      .type('password', {force: true})
    cy
      .get('.auth0-label-submit').click().wait(1000)
    cy
      .get('.auth0-lock-content-body-wrapper').children().children().should('be.visible')
  })
})

describe('Nav Link Test', () => {
  it('Tests links on navbar to make sure each page loads correctly', () => {
    cy
      .visit('https://www.aumni.fund/')
      .wait(1000)
        cy
          .get('#menu')
          .children()
          .children('nav')
          .children()
          .children('a')
          .within(($hoverLinkList) => {
          cy
            .wrap($hoverLinkList).each((index : string) => {
            cy
              .get(index)
              .parent()
              .parent()
              .invoke('show').should('be.visible')
            cy
              .get(index).should('be.visible')
              .click()
          })
        })

    })
})

