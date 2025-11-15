import express from "express";
import { getAllUsers, getUserById } from "../controllers/user.controller.js";

const router = express.Router();

// GET /api/users - list all users
router.get('/users', getAllUsers);

// GET /api/users/:id - get single user
router.get('/users/:id', getUserById);

// DELETE /api/users/:id - delete a user
router.delete('/users/:id', getUserById);

export default router;
