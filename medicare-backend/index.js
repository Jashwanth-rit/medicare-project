const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.json());


app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
const port = process.env.PORT || 6600;

// Connect to MongoDB

const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));
// Define Models (example)
// Define Models (example)
const Product = mongoose.model("Product", new mongoose.Schema({
  id: String,
  name: String,
  price: String,
  url: String,
  description: String,
  category: String
}));

const HealthcareTaker = mongoose.model("HealthcareTaker", new mongoose.Schema({
  id: String, // Unique identifier for the healthcare taker
  name: String, // Name of the healthcare taker
  specialty: String, // Area of expertise or specialty
  phone: String, // Contact number
  email: String, // Email address
  location: String, // Address or location
  availability: String, // Availability details (e.g., "9 AM - 5 PM")
  image: String // URL or path to the healthcare taker's image
}));


const PoliceInfo = mongoose.model("PoliceInfo", new mongoose.Schema({
  id: String, // Unique identifier for the police record
  officerName: String, // Name of the officer
  badgeNumber: String, // Badge number
  station: String, // Police station name
  location: String, // Location of the police station
  contact: String, // Contact number
  jurisdiction: String, // Jurisdiction or area of coverage
  email: String, // Email address
  image: String // URL or path to the officer's image
}));


const FireExtinguisher = mongoose.model("FireExtinguisher", new mongoose.Schema({
  id: String, // Unique identifier for the fire extinguisher
  type: String, // Type of extinguisher (e.g., "CO2", "Foam", "Water")
  location: String, // Location of the fire extinguisher
  maintenanceDate: Date, // Last maintenance date
  expiryDate: Date, // Expiry date for the fire extinguisher
  capacity: String, // Capacity of the extinguisher (e.g., "5kg")
  contact: String, // Emergency contact for maintenance or support
  image: String // URL or path to the fire extinguisher's image
}));



const ReminderSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the reminder
  time: { type: String, required: true }, // Time for the reminder
  before: { type: Number, required: true }, // Time in minutes/hours before taking tablets
  after: { type: Number, required: true }, // Time in minutes/hours after taking tablets
  numberOfTablets: { type: Number, required: true }, // Number of tablets to be taken
  tabletList: { type: [String], required: true } // List of tablet names
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

const Cart = mongoose.model("Cart", new mongoose.Schema({
  id: String,
  price: String,
  name: String,
  url: String,
  description: String,
  category: String
}));

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true },
  products: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: String, required: true },
      description: { type: String, required: true },
      url: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
  userDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pickupTime: { type: String, required: true },
    orderDay: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  billDetails: {
    totalCost: { type: Number, required: true },
    tax: { type: Number, required: true },
    discount: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    finalAmount: { type: Number, required: true },
  },
});

const Order = mongoose.model("Order", OrderSchema);

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the patient
  disease: { type: String, required: true }, // Disease the patient is suffering from
  moneyRequired: { type: Number, required: true }, // Money required for treatment
  deadline: { type: Date, required: true }, // Deadline for the treatment
  place: { type: String, required: true }, // Place of the patient
  hospitals: { type: [String], required: true } // List of hospitals the patient is admitted in
});

const Patient = mongoose.model("Patient", PatientSchema);


const carouselSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});

const Carousel = mongoose.model("Carousel", carouselSchema);

const Buy = mongoose.model("Buy", new mongoose.Schema({
  id: { type: String, required: true },
  price: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
}));

const User = mongoose.model("User", new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
}));

const Seller = mongoose.model("Seller", new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
}));

const AmbulanceSchema = new mongoose.Schema({
  vehicleNumber: { type: String, required: true }, // Unique number or identifier for the ambulance
  imageurl: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // Contact number for the ambulance
  currentPlace: { type: String, required: true }, // Current location of the ambulance
  availability: { type: Boolean, required: true },
 // Whether the ambulance is available or not
});

const Ambulance = mongoose.model("Ambulance", AmbulanceSchema);

const ImageSchema = new mongoose.Schema({
  image: {
    data: Buffer, // Binary data for the image
    contentType: String // MIME type (e.g., 'image/jpeg', 'image/png')
  },
  uploadedAt: { type: Date, default: Date.now } // Timestamp for when the image was uploaded
});

const Image = mongoose.model("Image", ImageSchema);

const MedicalShopSchema = new mongoose.Schema({
  shopName: { type: String, required: true }, // Name of the medical shop
  address: { type: String, required: true }, // Address of the shop
  phoneNumber: { type: String, required: true }, // Contact number of the shop
  availability: { type: Boolean, required: true }, // Whether the shop is currently open
  openingHours: { type: String, required: true }, // Opening hours (e.g., "8 AM - 10 PM")
  emergencyServices: { type: Boolean, default: false } // Indicates if emergency services are available
});

const MedicalShop = mongoose.model("MedicalShop", MedicalShopSchema);


const DoctorSessionSchema = new mongoose.Schema({
  doctorName: { type: String, required: true }, // Name of the doctor
  imageurl: { type: String, required: true }, // Image of the doctor
  age: { type: Number, required: true }, // Doctor's age
  fees: { type: Number, required: true }, // Consultation fees
  category: { 
    type: String, 
    required: true, 
    enum: ["Physical Treatment", "Mental Health", "Suggestions", "Precautions","Pregnency"] 
  }, // Category of the session
  availability: { type: Boolean, required: true }, // Whether the doctor is available
  createdAt: { type: Date, default: Date.now } // Timestamp for session creation
});

const DoctorSession = mongoose.model("DoctorSession", DoctorSessionSchema);


const jwtkey = process.env.JWT_SECRET || "default-secret";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(403).json({ result: 'Token is required' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ result: 'Invalid token' });
  }
};

// POST: User Login
app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send({ result: "Invalid email or password" });
    }

    // Generate JWT token
    jwt.sign({ user }, process.env.JWT_USER_SECRET, { expiresIn: process.env.JWT_EXPIRATION }, (err, token) => {
      if (err) {
        return res.status(500).send({ result: "Failed to generate token" });
      }
      res.status(200).send({ user, auth: token });
    });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(400).send({ result: "Error logging in user" });
  }
});

app.get('/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find();
    res.status(200).json(reminders);
  } catch (err) {
    console.error('Error fetching reminders:', err);
    res.status(500).json({ error: 'Failed to fetch reminders', details: err.message });
  }
});

app.get('/fire-extinguishers', async (req, res) => {
  try {
    const fireExtinguishers = await FireExtinguisher.find(); // Fetch all fire extinguisher records
    res.status(200).json(fireExtinguishers);
  } catch (err) {
    console.error('Error fetching fire extinguishers:', err);
    res.status(500).json({ 
      error: 'Failed to fetch fire extinguishers', 
      details: err.message 
    });
  }
});

app.post('/reminders', async (req, res) => {
  try {
    const reminder = new Reminder(req.body);
    const savedReminder = await reminder.save();
    res.status(201).json(savedReminder);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add reminder', details: err.message });
  }
});

app.get('/police-services', async (req, res) => {
  try {
    const policeServices = await PoliceInfo.find();
    res.status(200).json(policeServices);
  } catch (err) {
    console.error('Error fetching police services:', err);
    res.status(500).json({ error: 'Failed to fetch police services', details: err.message });
  }
});

app.get('/healthcare-takers', async (req, res) => {
  try {
    const takers = await HealthcareTaker.find();
    res.status(200).json(takers);
  } catch (err) {
    console.error('Error fetching healthcare takers:', err);
    res.status(500).json({ error: 'Failed to fetch healthcare takers', details: err.message });
  }
});

app.get('/ambulances', async (req, res) => {
  try {
    const ambulances = await Ambulance.find();
    res.status(200).json(ambulances);
  } catch (err) {
    console.error('Error fetching ambulances:', err);
    res.status(500).json({ error: 'Failed to fetch ambulances', details: err.message });
  }
});

app.get('/donations', async (req, res) => {
  try {
    const donations = await Patient.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Error fetching donations', error });
  }
});

app.delete('/reminders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Reminder.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Reminder not found' });
    }
    res.status(200).json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder', details: error.message });
  }
});



app.get("/carousel", async (req, res) => {
  try {
    const limit = req.query._limit ? parseInt(req.query._limit) : 0;
    const carousel = await Carousel.find().limit(limit);
    res.status(200).json(carousel);
  } catch (error) {
    res.status(500).send({ message: "Error fetching carousel data", error });
  }
});


// POST: Add Product (Protected Route)
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.error("Error adding product", error);
    res.status(400).send({ error: "Error adding product" });
  }
});


// Get all products from the "buy" collection
app.get('/buy', async (req, res) => {
  try {
    const products = await Buy.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// Delete a product by ID
app.delete('/buy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Buy.deleteOne({ id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});
// GET: Get Products (Protected Route)

app.get('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findOne({ id }); // Adjust based on your database structure
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor data', details: err.message });
  }
});  


app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(400).send({ error: "Error fetching products" });
  }
});
app.get('/doctors', async (req, res) => {
  try {
    const doctorSessions = await DoctorSession.find(); // Fetch all sessions
    res.status(200).send(doctorSessions);
  } catch (error) {
    console.error('Error fetching doctor sessions:', error);
    res.status(400).send({ error: 'Error fetching doctor sessions' });
  }
});

// POST: User Signup (Optional)



// GET: Get Products


// GET: Get a specific Product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error fetching product", error);
    res.status(400).send({ error: "Error fetching product" });
  }
});

// PUT: Update Product
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    console.error("Error updating product", error);
    res.status(400).send({ error: "Error updating product" });
  }
});

// DELETE: Delete Product
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product", error);
    res.status(400).send({ error: "Error deleting product" });
  }
});

// POST: Add to Cart
app.post("/cart", async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.status(201).send(cartItem);
  } catch (error) {
    console.error("Error adding to cart", error);
    res.status(400).send({ error: "Error adding to cart" });
  }
});

// GET: Get Cart Items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.status(200).send(cartItems);
  } catch (error) {
    console.error("Error fetching cart items", error);
    res.status(400).send({ error: "Error fetching cart items" });
  }
});

// DELETE: Remove Item from Cart
app.delete("/cart/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).send({ error: "Cart item not found" });
    }
    res.status(200).send({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item", error);
    res.status(400).send({ error: "Error deleting cart item" });
  }
});

// POST: Create Order
app.post("/order", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(400).send({ error: "Error creating order" });
  }
});

// GET: Get Orders
app.get("/order", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(400).send({ error: "Error fetching orders" });
  }
});

// DELETE: Delete Order
app.delete("/order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).send({ error: "Order not found" });
    }
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order", error);
    res.status(400).send({ error: "Error deleting order" });
  }
});

// POST: User Signup
app.post("/user", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.error("Error signing up user", error);
    res.status(400).send({ error: "Error signing up user" });
  }
});

// POST: Seller Signup
app.post("/seller", async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.status(201).send(seller);
  } catch (error) {
    console.error("Error signing up seller", error);
    res.status(400).send({ error: "Error signing up seller" });
  }
});

// POST: User Login
app.get("/user", async (req, res) => {
  try {
    const { email, password } = req.query;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(404).send({ error: "Invalid email or password" });
    }
    res.status(200).send(user);
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(400).send({ error: "Error logging in user" });
  }
});

// POST: Seller Login
app.get("/seller", async (req, res) => {
  try {
    const { email, password } = req.query;
    const seller = await Seller.findOne({ email, password });
    if (!seller) {
      return res.status(404).send({ error: "Invalid email or password" });
    }
    res.status(200).send(seller);
  } catch (error) {
    console.error("Error logging in seller", error);
    res.status(400).send({ error: "Error logging in seller" });
  }
});

// Start Server
app.listen(port, () => {
  console.log("Server is running on port 3000");
});
