const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("Welcome to Express");
})
app.use(express.json())


let users=[]
    

    app.get('/users', (req, res) => {
    res.json(users); 
})

app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body }; 
    users.push(newUser);
    res.status(201).json(newUser); 
});

app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id)); 
    if (!user) {
        return res.status(404).json({ message: "User not found" }); 
    }

    
    user.name = req.body.name || req.name;
    user.email = req.body.email || req.email;

    res.json(user); 
});


app.delete('/users/:id', (req, res) => {
    users = users.filter(user => user.id !== parseInt(req.params.id)); 
    res.json({ message: 'User deleted' });
});


app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});
