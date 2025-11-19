import express from "express";
import { getAllUsers, getUserById, createUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// GET /api/users - list all users
router.get('/users', getAllUsers);

// GET /api/users/:id - get single user
router.get('/users/:id', getUserById);

// DELETE /api/users/:id - delete a user
router.delete('/users/:id', deleteUser);

// POST /api/users - create a new user
router.post('/users', createUser);

export default router;
