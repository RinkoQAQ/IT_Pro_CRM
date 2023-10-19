const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const fs = require('fs');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Customer Profile Picture API', function() {

    // 允许测试运行一段时间，特别是因为我们要与数据库交互
    this.timeout(10000);

    let customerId;

    // 之前的测试用例
    before(async () => {
        // 在这里，我们可以插入一个模拟客户，然后在后续的测试中使用这个客户的ID。
        const result = await chai.request(app).post('/customers').send({
            name: 'John Doe',
            email: 'johndoe@example.com'
        });
        customerId = result.body._id;
    });

    it('should upload a profile picture for a customer', (done) => {
        chai.request(app)
            .post(`/customers/${customerId}/upload`)
            .attach('profilePicture', fs.readFileSync('test/test.png'), 'test.png') // 替换为你的测试图片路径
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body.profilePicture).to.be.a('string');
                done();
            });
    });

    // // 清除测试数据
    // after(async () => {
    //     await chai.request(app).delete(`/customers/${customerId}`);
    // });
});

