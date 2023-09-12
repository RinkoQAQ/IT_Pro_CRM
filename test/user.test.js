const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/server'); // 导入你的 Express 应用
const should = chai.should();

chai.use(chaiHttp);

describe('User Registration and Login', () => {
    // 在测试前清空数据库或做其他必要的准备工作

    // 测试用户注册
    describe('User Registration', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/register')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
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
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Username already exists');
                    done();
                });
        });
    });

    // 测试用户登录
    describe('User Login', () => {
        it('should login a registered user', (done) => {
            chai.request(app)
                .post('/login')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
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
                    res.body.should.be.a('object');
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
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Username not found');
                    done();
                });
        });
    });
});
