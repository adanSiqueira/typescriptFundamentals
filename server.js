// Import required modules
import express from 'express';
import cors from 'cors';
import { getAllUsers, getUserById, createUser } from './users.ts';
import { get } from 'http';

/*  APP INITIALIZATION */
const app = express();
const PORT = 3000;

/*  MIDDLEWARE 
Enable CORS for all origins and Parse incoming JSON requests
*/
app.use(cors());
app.use(express.json());

/*ROUTES*/
/**GET /
 Root route*/
app.get('/', (req, res) => {
  res.send('🚀 Express server is running!');
});

/*GET /health
Health check endpoint*/
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

/* GET /api/users
Returns all users (mock data)*/
app.get('/api/users', getAllUsers);

/* GET /api/users/:id
Returns a single user by ID*/
app.get('/api/users/:id', getUserById);

/* POST /api/users
Creates a new user*/
app.post('/api/users', createUser);

/*SERVER START*/
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
