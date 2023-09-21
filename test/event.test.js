const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // 导入你的 Express 应用
const should = chai.should();

chai.use(chaiHttp);

describe('Customers and Events API', () => {

//   // 测试添加客户
//   describe('/POST customer', () => {
//     it('it should POST a customer', (done) => {
//       const customer = {
//           name: "John Doe",
//           email: "john@example.com"
//       };
//       chai.request(server)
//           .post('/customers')
//           .send(customer)
//           .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('name').eql('John Doe');
//               done();
//           });
//     });
//   });

//   // 测试添加事件到特定客户
//   describe('/POST event to a specific customer', () => {
//     it('it should POST an event to a specific customer', (done) => {
//       const customerId = "65057ce2305e01af7b79c7e0";  // 你需要替换成实际的ID
//       const event = {
//         time: new Date(),
//         content: "Meet up"
//       };
//       chai.request(app)
//           .post('/customers/' + customerId + '/events')
//           .send(event)
//           .end((err, res) => {
//               res.should.have.status(201);
//               res.body.should.be.a('object');
//               res.body.should.have.property('events');
//               done();
//           });
//     });
//   });

//   // 测试获取特定客户的所有事件
//   describe('/GET all events of a specific customer', () => {
//     it('it should GET all events of a specific customer', (done) => {
//       const customerId = "65057ce2305e01af7b79c7e0";  // 你需要替换成实际的ID
//       chai.request(app)
//           .get('/customers/' + customerId + '/events')
//           .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//               done();
//           });
//     });
//   });

  // 测试获取所有客户的所有事件
  describe('/GET all events of all customers', () => {
    it('it should GET all events of all customers', (done) => {
      chai.request(app)
          .get('/events')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              done();
          });
    });
  });
  
});
