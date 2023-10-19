const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage;
const Grid = require('gridfs-stream');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const connectionString = "mongodb+srv://js:123@personalcrm.w5i2deu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let gfs;
mongoose.connection.once('open', function () {
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
});

const storage = new GridFsStorage({
    url: connectionString,
    file: (req, file) => {
        return {
            bucketName: 'profilePictures',
            filename: file.originalname
        };
    },
});

const upload = multer({ storage });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePicture: String,
    email: String
});

const eventSchema = new mongoose.Schema({
    time: Date,
    content: String
});

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

const Customer = mongoose.model('Customer', customerSchema);
const User = mongoose.model('User', userSchema);

// POST(/customers) -> Insert data
app.post('/customers', async (req, res) => {
    try {
        // Create a new customer using the data from the request body.
        const customer = new Customer(req.body);
        // Save this customer to the database.
        await customer.save();
        // Return a success response with the newly created customer information.
        res.status(201).send(customer);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to CRM backend!');
});

// GET (/customers) -> Get all customers
app.get('/customers', async (req, res) => {
    try {
        // Retrieve all customer information from the database.
        const customers = await Customer.find();
        // Return a success response with customer information.
        res.status(200).send(customers);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// GET(/customers-by-name/:name) -> Return all customer data that matches the given name
app.get('/customers-by-name/:name', async (req, res) => {
    try {
        // Find all customers from the database that match the specified name.
        const customersWithName = await Customer.find({ name: req.params.name });

        if (customersWithName.length === 0) {
            return res.status(404).send({ message: 'No customers found with the given name.' });
        }

        // Return a success response with the list of customers.
        res.status(200).send(customersWithName);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// GET (/customers/:id) -> Return customer information for the specified ID.
app.get('/customers/:id', async (req, res) => {
    try {
        // Get customer information for the specified ID from the database.
        const customer = await Customer.findById(req.params.id);
        // If the customer doesn't exist, return a 404 status.
        if (!customer) {
            return res.status(404).send();
        }
        // Return a success response with customer information.
        res.status(200).send(customer);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// PUT(/customers/:id) -> Update customer information for the specified ID.
app.put('/customers/:id', async (req, res) => {
    try {
        // Update customer information for the specified ID.
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,          // Return the updated data.
            runValidators: true // Validate data before saving.
        });
        // If the customer doesn't exist, return a 404 status.
        if (!customer) {
            return res.status(404).send();
        }
        // Return a success response with the updated customer information.
        res.status(200).send(customer);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// DELETE(/customers/:id) -> Delete the customer with the specified ID.
app.delete('/customers/:id', async (req, res) => {
    try {
        // Delete the customer with the specified ID from the database.
        const customer = await Customer.findByIdAndDelete(req.params.id);
        // If the customer doesn't exist, return a 404 status.
        if (!customer) {
            return res.status(404).send();
        }
        // Return a success response with the deleted customer information.
        res.status(200).send(customer);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// User
// User registration
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username already exists.
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }
        
        // Use 'bcrypt' library to encrypt passwords  
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });

        // Save the user to the database.
        await newUser.save();

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).json({ error: error.message });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user.
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Username not found' });
        }

        // Check the password.
        if (password === user.password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).json({ error: error.message });
    }
});

// Event management
// POST (/customers/:id/events) -> Add an event to a specific customer
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
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// GET (/customers/:id/events) -> Get all events for a specific customer
app.get('/customers/:id/events', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send({ message: 'Customer not found' });
        }
        res.status(200).send(customer.events);
    } catch (error) {
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// GET (/events) -> Get all events for all customers
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
        // If an error occurs, return an error response.
        res.status(500).send(error);
    }
});

// User Profile Picture Upload
app.post('/user/:id/upload', upload.single('profilePicture'), async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { profilePicture: req.file.filename },
            { new: true }
        );
        if (!user) {
            return res.status(404).send();
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Customer Profile Picture Upload
app.post('/customers/:id/upload', upload.single('profilePicture'), async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { profilePicture: req.file.filename },
            { new: true }
        );
        if (!customer) {
            return res.status(404).send();
        }
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get Profile Picture
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
    });
});

// User Profile Picture Deletion
app.delete('/user/:id/delete-picture', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send();
        }
        const filename = user.profilePicture;
        await gfs.remove({ filename, root: 'profilePictures' });
        user.profilePicture = "";
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Customer Profile Picture Deletion
app.delete('/customers/:id/delete-picture', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send();
        }
        const filename = customer.profilePicture;
        await gfs.remove({ filename, root: 'profilePictures' });
        customer.profilePicture = "";
        await customer.save();
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the CRM backend on the specified port.
app.listen(port, () => {
    console.log(`CRM backend is running on http://localhost:${port}`);
});

// Export the app object.
module.exports = app;
