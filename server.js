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
app.use(bodyParser.json());

// // 设置我们的应用要监听的端口号。
// const port = 3000;
const port = process.env.PORT || 3000;

// 修改此处的连接字符串，使其指向本地MongoDB
// const connectionString = "mongodb://localhost:27017/mydatabase";  // mydatabase为您的数据库名称，可以根据实际情况修改
const connectionString = "mongodb+srv://js:123@personalcrm.w5i2deu.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 定义一个用户数据模型。
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const eventSchema = new mongoose.Schema({
    time: Date,
    content: String
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
    events: [eventSchema]
});




// 使用上述模型创建Customer和User的数据表模型
const Customer = mongoose.model('Customer', customerSchema);
const User = mongoose.model('User', userSchema);



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

app.get('/', (req, res) => {
    res.send('Welcome to CRM backend!');
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



// 用户
// 用户注册
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // 检查用户名是否已存在
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, password });

        // 保存用户到数据库
        await newUser.save();
        
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 用户登录
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 查找用户
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Username not found' });
        }

        // 检查密码
        if (password === user.password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// events管理
// POST (/customers/:id/events) -> 添加事件到特定客户
app.post('/customers/:id/events', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        customer.events.push(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET (/customers/:id/events) -> 获取特定客户的所有事件
app.get('/customers/:id/events', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send(customer.events);
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET (/events) -> 获取所有客户的所有事件
app.get('/events', async (req, res) => {
    try {
        const customers = await Customer.find();
        const allEvents = customers.flatMap(customer => customer.events.map(event => {
            return {
                ...event.toObject(),
                customerName: customer.name
            };
        }));
        res.status(200).send(allEvents);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`CRM backend is running on http://localhost:${port}`);
});

module.exports = app;  // 这里我们导出app对象