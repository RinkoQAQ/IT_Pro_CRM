// Import the express library, which is a framework for building web applications.
const express = require('express');

// Import the body-parser library to parse data from the frontend.
const bodyParser = require('body-parser');

// Import the mongoose library for connecting and working with MongoDB.
const mongoose = require('mongoose');

// Import CORS for handling cross-origin requests.
const cors = require('cors');

// Import bcrypt library for password encryption
const bcrypt = require('bcrypt');

// Create an Express application.
const app = express();

// Enable CORS middleware to handle cross-origin requests.
app.use(cors());

// Use bodyParser to parse JSON data from incoming requests.
app.use(bodyParser.json({ limit: '50mb' }));


// Set the port that our application will listen on.
const port = process.env.PORT || 3000;

// Modify the connection string to point to your MongoDB cluster.
const connectionString = "mongodb+srv://js:123@personalcrm.w5i2deu.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose.
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define a user data model.
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    profilePicture: String,
    email: String
});

// Define an event data model for customer events.
const eventSchema = new mongoose.Schema({
    time: Date,
    content: String
});

// Define a customer data model.
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

// Create Customer and User data table models using the defined schemas.
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

        // Use bcrypt to generate hashed password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is a hash round number
        
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
        const passwordMatch = await bcrypt.compare(password, user.password);

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

// Start the CRM backend on the specified port.
app.listen(port, () => {
    console.log(`CRM backend is running on http://localhost:${port}`);
});

// Export the app object.
module.exports = app;
