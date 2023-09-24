const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Customers API', () => {
    // Set up the default timeout
    const timeout = 8000;

    // GET - Retrieve all customers
    describe('GET /customers', () => {
        it('should retrieve all customers', (done) => {
            chai.request(app)
                .get('/customers')
                .timeout(timeout)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');

                    // Log all customer information to the console
                    console.log('List of all customers:');
                    res.body.forEach(customer => {
                        console.log(`Customer ID: ${customer._id}, Name: ${customer.name}, Email: ${customer.email}`);
                    });

                    done();
                });
        });
    });

    // POST - Insert a new customer
    describe('POST /customers', () => {
        it('should add a new customer', (done) => {
            const customerData = {
                name: "Bill",
                email: "1203@126.com",
                phone: "1",
                address: "String",
                notes: "String",
                group: "F",
                birthday: "30/06/2003",
                company: "C",
                profilePicture: "https://www.w3schools.com/html/pic_trulli.jpg",
            };

            chai.request(app)
                .post('/customers')
                .send(customerData)
                .timeout(timeout)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });
    });

    // PUT - Update a customer by ID
    describe('PUT /customers/:id', () => {
        it('should update the customer', (done) => {
            const updatedData = {
                name: "Updated Name"
            };

            const customerId = "64ec825d56484829ecb5e981"; // Insert the ID here

            chai.request(app)
                .put('/customers/' + customerId)
                .send(updatedData)
                .timeout(timeout)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.name).to.equal("Updated Name");
                    done();
                });
        });
    });

    // DELETE - Delete a customer by ID
    describe('DELETE /customers/:id', () => {
        it('should delete the customer or indicate if ID is not found', (done) => {
            const customerId = "64ec818f651668ce30844810"; // Insert the ID of the customer to delete here

            chai.request(app)
                .delete('/customers/' + customerId)
                .end((err, res) => {
                    if (err) {
                        console.error("An error occurred:", err.message);
                        done(err);
                    } else {
                        // 404 indicates ID not found
                        if (res.status === 404) {
                            console.log(`No customer found with the ID: ${customerId}`);
                        } else if (res.status === 200) {
                            console.log(`Deleted customer with ID: ${res.body._id}`);
                            expect(res.body).to.be.an('object');
                            expect(res.body).to.have.property('_id').equal(customerId);
                        } else {
                            console.log("Unexpected response received.");
                        }
                        done();
                    }
                });
        });
    });

    // GET - Retrieve customer information by name
    describe('Fetch Customers by Name', () => {
        it('should return customers with the provided name or indicate absence', (done) => {
            const testName = 'Updated Name';  // Change to the name you want to test

            chai.request(app)
                .get(`/customers-by-name/${testName}`)
                .end((err, res) => {
                    if (err) {
                        console.error("An error occurred:", err.message);
                        done(err);
                    } else {
                        // If there is no data in the response, the name does not exist
                        if (res.body.length === 0 || res.status === 404) {
                            console.log(`No customers found with the name: ${testName}`);
                        } else {
                            console.log(`Found customers for name "${testName}":`);
                            res.body.forEach(customer => {
                                console.log(`ID: ${customer._id}, Name: ${customer.name}, Email: ${customer.email}`);  // You can choose which fields to display
                            });
                        }
                        done();
                    }
                });
        });
    });
});
