// 引入express库，它是一个用于构建Web应用的框架。
const express = require('express');

// 引入body-parser库，它可以帮助我们解析来自前端的数据。
const bodyParser = require('body-parser');

// 引入mongoose库，它是一个用于连接和操作MongoDB的工具。
const mongoose = require('mongoose');

const cors = require('cors');

// 创建一个Express应用。
const app = express();
app.use(cors());

// 设置我们的应用要监听的端口号。
const port = 3000;

// 修改此处的连接字符串，使其指向本地MongoDB
const connectionString = "mongodb://localhost:27017/mydatabase";  // mydatabase为您的数据库名称，可以根据实际情况修改

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义一个客户数据模型。
// 这个模型描述了客户在数据库中应该有哪些字段和数据类型。
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    notes: String,
    group: String,
    birthday: String,
    company: String,
    profilePicture: String,
});

// 使用上述模型创建一个名为'Customer'的数据表模型。
const Customer = mongoose.model('Customer', customerSchema);
// 使用body-parser库解析请求中的数据。
app.use(bodyParser.json());

// POST(/customers) -> 插入数据
app.post('/customers', async (req, res) => {
    try {
        // 使用请求中的数据创建一个新的客户。
        const customer = new Customer(req.body);
        // 保存这个客户到数据库中。
        await customer.save();
        // 返回成功响应和新创建的客户信息。
        res.status(201).send(customer);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});

// GET (/customers) -> 获取所有角色
app.get('/customers', async (req, res) => {
    try {
        // 从数据库中获取所有客户的信息。
        const customers = await Customer.find();
        // 返回成功响应和客户信息。
        res.status(200).send(customers);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});

// GET(/customers-by-name/:name) -> 返回与该姓名匹配的所有客户数据
app.get('/customers-by-name/:name', async (req, res) => {
    try {
        // 从数据库中查找与指定姓名匹配的所有客户。
        const customersWithName = await Customer.find({ name: req.params.name });

        if (customersWithName.length === 0) {
            return res.status(404).send({ message: 'No customers found with the given name.' });
        }

        // 返回成功响应和客户列表。
        res.status(200).send(customersWithName);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});


// GET (/customers/:id) -> 返回指定ID的客户信息。
app.get('/customers/:id', async (req, res) => {
    try {
        // 从数据库中获取指定ID的客户信息。
        const customer = await Customer.findById(req.params.id);
        // 如果客户不存在，返回404状态码。
        if (!customer) {
            return res.status(404).send();
        }
        // 返回成功响应和客户信息。
        res.status(200).send(customer);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});

// PUT(/customers/:id) -> 更新指定ID的客户信息。
app.put('/customers/:id', async (req, res) => {
    try {
        // 更新指定ID的客户信息。
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,          // 返回更新后的数据。
            runValidators: true // 在保存之前验证数据。
        });
        // 如果客户不存在，返回404状态码。
        if (!customer) {
            return res.status(404).send();
        }
        // 返回成功响应和更新后的客户信息。
        res.status(200).send(customer);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});

// DELETE(/customers/:id) -> 删除指定ID的客户。
app.delete('/customers/:id', async (req, res) => {
    try {
        // 从数据库中删除指定ID的客户。
        const customer = await Customer.findByIdAndDelete(req.params.id);
        // 如果客户不存在，返回404状态码。
        if (!customer) {
            return res.status(404).send();
        }
        // 返回成功响应和被删除的客户信息。
        res.status(200).send(customer);
    } catch (error) {
        // 如果出现错误，返回错误信息。
        res.status(500).send(error);
    }
});

// 在指定的端口上启动应用。
app.listen(port, () => {
    console.log(`CRM backend is running on http://localhost:${port}`);
});

module.exports = app;  // 这里我们导出app对象