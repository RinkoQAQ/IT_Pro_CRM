const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Customers and Events API', () => {

  // Test adding a customer
  describe('/POST customer', () => {
    it('should POST a customer', (done) => {
      const customer = {
          name: "John Doe",
          email: "john@example.com"
      };
      chai.request(app)
          .post('/customers')
          .send(customer)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.an('object');
              res.body.should.have.property('name').eql('John Doe');
              done();
          });
    });
  });

  // Test adding an event to a specific customer
  describe('/POST event to a specific customer', () => {
    it('should POST an event to a specific customer', (done) => {
      const customerId = "65057ce2305e01af7b79c7e0";  // Replace with the actual ID
      const event = {
        time: new Date(),
        content: "Meet up"
      };
      chai.request(app)
          .post('/customers/' + customerId + '/events')
          .send(event)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.an('object');
              res.body.should.have.property('events');
              done();
          });
    });
  });

  // Test getting all events of a specific customer
  describe('/GET all events of a specific customer', () => {
    it('should GET all events of a specific customer', (done) => {
      const customerId = "65057ce2305e01af7b79c7e0";  // Replace with the actual ID
      chai.request(app)
          .get('/customers/' + customerId + '/events')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              done();
          });
    });
  });

  // Test getting all events of all customers
  describe('/GET all events of all customers', () => {
    it('should GET all events of all customers', (done) => {
      chai.request(app)
          .get('/events')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.an('array');
              done();
          });
    });
  });
  
});
