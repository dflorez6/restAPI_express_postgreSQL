//====================
// User Routes
//====================
// Import the dependencies
import { Router } from 'express';
const router = Router();

//--------------------
// GET
//--------------------
// Index
router.get('/', 
    // Return Function
    async (req, res) => {
        // Retrieves all Users from DB
        const users = await req.context.models.User.findAll();
        // Returns all users
        return res.send(users);
    }
);

// Show
router.get('/:userId',
    // Return Function
    async (req, res) => {
        // Retrieves User from DB by id
        const user = await req.context.models.User.findByPk(
            req.params.userId
        ); // Finds user by PrimaryKey ('id')
        return res.send(user);
    }
);

//--------------------
// 'POST'
//--------------------
// Create
router.post('/', 
    // Return Function
    (req, res) => {
        return res.send("POST HTTP method on user resource");
    } 
);

//--------------------
// 'PUT'
//--------------------
// Update
router.put('/:userId',
    // Return Function
    (req, res) => {
        return res.send(`PUT HTTP method on users/${req.params.userId} resource`);
    }
);

//--------------------
// 'DELETE'
//--------------------
// Destroy
router.delete('/:userId',
    // Return Function
    (req, res) => {
        return res.send(`DELETE HTTP method on users/${req.params.userId} resource`);
    }
);

// Export Module (export the router NOT as an object inside { })
export default router;