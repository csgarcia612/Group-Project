const sinon = require('sinon'),
    UsersData = require('./user'),
    testDB = require('../../test/testInit'),
    axios = require('axios');

    //unit test
    describe("Unit Test", () => {
        describe('getUsers functon', () => { 
           it('should return user of 1', ()=>{
               const fakeDB = {
                query: sinon.mock().withArgs( 
                   sinon.match.string
               )}
           return UsersData.getUsers(fakeDB)
            })
        }),

        describe('update User', () => {
            it('Should update user', ()=>{
                const fakeDB = {
                    query: sinon.mock().withArgs( 
                    sinon.match.string
                )}
                const user = {
                    name: "Tom",
                    email: "4567@dev.com",
                    age: 23,
                    favColor: "yellow",
                    picture: "none",
                }
                return UsersData.updateUser(fakeDB, user)
             })
         }),
 
     describe('getInternetData', () => {
         it('should retun an array of people', () => {
             sinon.stub(axios, "get").returns(Promise.resolve({
                 data: {
                     results: [1,2,3,4,5,6,7,8]
                 }
             }))
             return UsersData.getInternetData().then(city => {
                 expect(city.length).toEqual(8)
             })
         })
        })

        describe('Create User', () => {
            it('Should send user data to the server', ()=>{
               const fakeDB = {
                   query: sinon.mock().withArgs( 
                   sinon.match.string
               )}
               const user = {
                   name: "T",
                   email: "123@dev.com",
                   age: 32,
                   favColor: "blue",
                   picture: "none",
                   created_at: new Date()
               }
               return UsersData.createUser(fakeDB, user)
            })
        }),

    
    describe('getAddress ', () => { 
        it('should return address of 1', ()=>{
            const fakeDB = {
             query: sinon.mock().withArgs( 
                sinon.match.string
            )}
        return UsersData.getAddress(fakeDB)
         })
     }),
     describe('update address', () => {
        it('Should update address', ()=>{
            const fakeDB = {
                query: sinon.mock().withArgs( 
                sinon.match.string
            )}
            const address = {
                address_one: "4567",
               address_two: "E Dev st",
               city: 'Goodyear',
               state: "az",
               zipcode: 8004
            }
            return UsersData.updateUser(fakeDB, address)
         })
     }),

     describe('Create address', () => {
        it('Should send address data to the server', ()=>{
           const fakeDB = {
               query: sinon.mock().withArgs( 
               sinon.match.string
           )}
           const address = {
               address_one: "1234",
               address_two: "W Main st",
               city: 'Phoenix',
               state: "az",
               zipcode: 86794
              
           }
           return UsersData.createUser(fakeDB, address)
        })
    })

    
    })

// Intergration Tests

describe('Intergration Test', () => {
    let db;
    beforeAll(() => {
        
        
        return testDB.testDB().then(database => {
            return db = database;
        })
    })
       describe('getUser function', () => {
         it("Should get user data from db", ()=>{
            return UsersData.getUsers(db).then(userdata => {
                expect(userdata.length).not.toEqual(0)   
                expect(userdata[0]).toMatchObject({ 
                    user_id: expect.any(Number),
                    auth0_id: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    email: expect.any(String),
                    image_url: expect.any(String)
                })
            })
         })
       }),

       describe('update user', () => {
        it("Should update user data from db", ()=>{
            const user = {
                auth0_id: "Bye4567",
                username: "HOHOHO",
                first_name: "HAHAHAH",
                last_name: "HEHEHE",
                email: "4567@dev.com",
                image_url: "none"
            }
           return UsersData.updateUser(db, user).then(userdata => {
               expect(userdata.length).not.toEqual(0)   
               expect(userdata[0]).toMatchObject({ 
                   user_id: expect.any(Number),
                   auth0_id: expect.any(String),
                   username: expect.any(String),
                   first_name: expect.any(String),
                   last_name: expect.any(String),
                   email: expect.any(String),
                   image_url: expect.any(String)
               })
           })
        })
      }),
    
       describe('create user', () => {
         it("should create a user", () => {
            const user = {
                auth0_id: "Hello00129",
                username: "dabomb",
                first_name: "YO",
                last_name: "Mama",
                email: "1234@dev.com",
                image_url: "none"
            }
            return UsersData.createUser(db, user).then(newUser => {
                expect(newUser.length).not.toEqual(0);
                expect(newUser[0]).toMatchObject({
                    auth0_id: expect.any(String),
                    email: expect.any(String),
                    first_name: expect.any(String),
                    user_id: expect.any(Number),
                    image_url: expect.any(String),
                    last_name: expect.any(String),
                    username: expect.any(String),
                    
                })
            })
         })
       }),

       describe('getAddress ', () => {
        it("Should get address data from db", ()=>{
           return UsersData.getAddress(db).then(addressData => {
               expect(addressData.length).not.toEqual(0)   
               expect(addressData[0]).toMatchObject({ 
                   address_id: expect.any(Number),
                   address_one: expect.any(String),
                   address_two: expect.any(String),
                   city: expect.any(String),
                   state: expect.any(String),
                   zipcode: expect.any(Number)
            
               })
           })
        })
      }),
      describe('update address', () => {
        it("Should update address data from db", ()=>{
            const address = {
                address_one: "8888",
                address_two: "E Dev St",
                city: "Goodyear",
                state: "AZ",
                zipcode: 9999
            }
           return UsersData.updateAddress(db, address).then(addressData => {
               expect(addressData.length).not.toEqual(0)   
               expect(addressData[0]).toMatchObject({ 
                address_id: expect.any(Number),
                address_one: expect.any(String),
                address_two: expect.any(String),
                city: expect.any(String),
                state: expect.any(String),
                zipcode: expect.any(Number)
               })
           })
        })
      }),

      describe('create address', () => {
        it("should create an address", () => {
           const address = {
            address_one: "1234",
            address_two: "W Main st",
            city: 'Phoenix',
            state: "az",
            zipcode: 86794
           }
           return UsersData.createAddress(db, address).then(newAddress => {
               expect(newAddress.length).not.toEqual(0);
               expect(newAddress[0]).toMatchObject({
                address_id: expect.any(Number),
                address_one: expect.any(String),
                address_two: expect.any(String),
                city: expect.any(String),
                state: expect.any(String),
                zipcode: expect.any(Number)
                   
               })
           })
        })
      })
})