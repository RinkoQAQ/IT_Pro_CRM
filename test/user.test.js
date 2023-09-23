const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('User Registration and Login', () => {
    // Clear the database or perform other necessary preparations before testing

    // Test user registration
    describe('User Registration', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/register')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Registration successful');
                    done();
                });
        });

        it('should not register a user with an existing username', (done) => {
            chai.request(app)
                .post('/register')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Username already exists');
                    done();
                });
        });
    });

    // Test user login
    describe('User Login', () => {
        it('should login a registered user', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Login successful');
                    done();
                });
        });

        it('should not login with incorrect password', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'incorrectpassword' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Incorrect password');
                    done();
                });
        });

        it('should not login with non-existent username', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'nonexistentuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.an('object');
                    res.body.should.have.property('message').eql('Username not found');
                    done();
                });
        });
    });
});
