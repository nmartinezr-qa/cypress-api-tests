import { expect } from "chai"

describe("CRUD Methods", function(){

    it.skip("POST Method", function(){
        cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
                "name": "Learn Appium Automation with Java",
                "isbn": "test589",
                "aisle": "98474",
                "author": "nmartinez"
            }
        ).then(function(response){
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property("Msg", "successfully added")
            cy.log(JSON.stringify(response.body))
        })
    })

    it("GET Method", function(){
        cy.request("GET", "http://216.10.245.166//Library/GetBook.php?AuthorName=nmartinez")
        .then(function(response){
            expect(response.status).to.equal(200)
            expect(response.body[0]).to.have.property('isbn', 'test963') // verify the first element of the array
        })
        
    })

 

})