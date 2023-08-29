const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../backend/server'); // Adjust the path accordingly

const expect = chai.expect;
chai.use(chaiHttp);

describe('Customers API', () => {
    // Setup default timeout
    const timeout = 8000; 

    // GET 获得所有customer
    describe('GET /customers', () => {
        it('should get all customers', (done) => {
            chai.request(app)
                .get('/customers')
                .timeout(timeout)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
    
                    // Output all role information to the terminal
                    console.log('List of all customers:');
                    res.body.forEach(customer => {
                        console.log(`Customer ID: ${customer._id}, Name: ${customer.name}, Email: ${customer.emial}`);
                    });
    
                    done();
                });
        });
    });
    

    // POST 插入新的customer
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
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('_id');
                    done();
                });
        });
    });

    // // PUT 输入id更新customer
    // describe('PUT /customers/:id', () => {
    //     it('should update the customer', (done) => {
    //         const updatedData = {
    //             name: "Updated Name"
    //         };

    //         const customerId = "64ec825d56484829ecb5e981"; // 你需要在这里填写id

    //         chai.request(app)
    //             .put('/customers/' + customerId)
    //             .send(updatedData)
    //             .timeout(timeout)
    //             .end((err, res) => {
    //                 expect(err).to.be.null;
    //                 expect(res).to.have.status(200);
    //                 expect(res.body).to.be.a('object');
    //                 expect(res.body.name).to.equal("Updated Name");
    //                 done();
    //             });
    //     });
    // });

    // // DELETE 删除指定id的customer
    // describe('DELETE /customers/:id', () => {
    //     it('should delete the customer or indicate if ID is not found', (done) => {
    //         const customerId = "64ec818f651668ce30844810"; // 在这里插入你想删除的ID
    
    //         chai.request(app)
    //             .delete('/customers/' + customerId)
    //             .end((err, res) => {
    //                 if (err) {
    //                     console.error("An error occurred:", err.message);
    //                     done(err);
    //                 } else {
    //                     // 404表示ID不存在
    //                     if (res.status === 404) {
    //                         console.log(`No customer found with the ID: ${customerId}`);
    //                     } else if (res.status === 200) {
    //                         console.log(`Deleted customer with ID: ${res.body._id}`);
    //                         expect(res.body).to.be.a('object');
    //                         expect(res.body).to.have.property('_id').equal(customerId);
    //                     } else {
    //                         console.log("Unexpected response received.");
    //                     }
    //                     done();
    //                 }
    //             });
    //     });
    // });

    // // GET 通过姓名获取customer的所有信息
    // describe('Fetch Customers by Name', () => {

    //     it('should return customers with the provided name or indicate absence', (done) => {
    //         const testName = 'Updated Name';  // 更改为您想测试的名字
    
    //         chai.request(app)
    //             .get(`/customers-by-name/${testName}`)
    //             .end((err, res) => {
    //                 if (err) {
    //                     console.error("An error occurred:", err.message);
    //                     done(err);
    //                 } else {
    //                     // 如果响应中没有数据，表示名字不存在
    //                     if (res.body.length === 0 || res.status === 404) {
    //                         console.log(`No customers found with the name: ${testName}`);
    //                     } else {
    //                         console.log(`Found customers for name "${testName}":`);
    //                         res.body.forEach(customer => {
    //                             console.log(`ID: ${customer._id}, Name: ${customer.name}, Email: ${customer.email}`);  // 您可以选择要显示的字段
    //                         });
    //                     }
    //                     done();
    //                 }
    //             });
    //     });
    
    // });


});
