// const express = require("express");
// const mongoose = require('mongoose');
// const multer = require("multer");
// const ItemModel = require('./models/Items'); // Ensure this path is correct
// const app = express();
// const cors = require('cors');

// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static('uploads')); // Serving static files from 'uploads' directory

// // Multer storage configuration
// const storage = multer.diskStorage({
//     destination: "./uploads",
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage }).single('file'); // Single file upload

// // Image upload endpoint
// app.post('/upload', (req, res) => {
//     upload(req, res, function (err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(500).json({ error: err.message });
//         } else if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         // Return the uploaded file path
//         return res.status(200).json({
//             message: "File uploaded successfully",
//             file: `http://localhost:3000/uploads/${req.file.filename}`
//         });
//     });
// });

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/eshop", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Fetch items based on itemDescription query parameter
// app.get("/api/", (req, res) => {
//     const itemDescription = req.query.itemDescription;
//     ItemModel.find({ itemDescription })
//         .then(items => res.json(items))
//         .catch(err => res.status(500).json({ error: 'Database query failed' }));
// });

// // Fetch distinct item descriptions
// app.get("/app/", (req, res) => {
//     ItemModel.find()
//         .distinct("itemDescription")
//         .then(items => res.json(items))
//         .catch(err => res.status(500).json({ error: 'Database query failed' }));
// });

// // Add a new item
// app.post('/api/', (req, res) => {
//     console.log('Received data:', req.body);
//     ItemModel.create(req.body)
//         .then(() => {
//             console.log('Data saved to database');
//             res.json({ message: "success" });
//         })
//         .catch(err => {
//             console.error('Error saving data:', err);
//             res.status(500).json({ error: 'Database save failed' });
//         });
// });

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     ItemModel.findOne({ email: email })
//         .then(user => {
//             if (user) {
//                 if (user.password === password) {
//                     res.json("Success");
//                 } else {
//                     res.json("The password is incorrect");
//                 }
//             } else {
//                 res.json("No record existed");
//             }
//         })
//         .catch(err => res.status(500).json({ error: 'Database query failed' }));
// });

// // Start the server
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });


const express = require("express");
const mongoose = require('mongoose');
const multer = require("multer");
const ItemModel = require('./models/Items'); // Ensure this path is correct
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serving static files from 'uploads' directory

// Multer storage configuration
const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage }).single('file'); // Single file upload

// Image upload endpoint
app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Return the uploaded file path
        return res.status(200).json({
            message: "File uploaded successfully",
            file: `http://localhost:3000/uploads/${req.file.filename}`
        });
    });
});

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/eshop", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Fetch items based on itemDescription query parameter
app.get("/api/", (req, res) => {
    const itemDescription = req.query.itemDescription;
    ItemModel.find({ itemDescription })
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: 'Database query failed' }));
});

// Fetch distinct item descriptions
app.get("/app/", (req, res) => {
    ItemModel.find()
        .distinct("itemDescription")
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: 'Database query failed' }));
});

// Add a new item
app.post('/api/', (req, res) => {
    const { itemName, itemPrice, itemDescription, itemImageUrl } = req.body;

    const newItem = new ItemModel({
        itemName,
        itemPrice,
        itemDescription,
        itemImageUrl,
        email: req.body.email,
        password: req.body.password
    });

    newItem.save()
        .then(() => {
            console.log('Data saved to database');
            res.json({ message: "success" });
        })
        .catch(err => {
            console.error('Error saving data:', err);
            res.status(500).json({ error: 'Database save failed' });
        });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    ItemModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("The password is incorrect");
                }
            } else {
                res.json("No record existed");
            }
        })
        .catch(err => res.status(500).json({ error: 'Database query failed' }));
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
