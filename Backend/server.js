import express from 'express';
import cors from 'cors';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// home page
app.get('/', (req, res) => {
    res.send(' Server Homepage');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});