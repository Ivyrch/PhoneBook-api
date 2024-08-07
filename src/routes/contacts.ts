import express from "express";
import axios from "axios";
import { Contact } from '../interfaces/contactInterface';

const app = express();
app.use(express.json());

let contacts: Contact[] = [];
let idCounter = 1;

app.get('/contacts', (req, res) => {
    res.json(contacts);
});


app.post('/contacts', (req, res) => {
    const newContact: Contact = {
        id: idCounter++,
        ...req.body
    };
    contacts.push(newContact);
    res.json(newContact);
});

app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const updatedContact = req.body;
    const contact = contacts.find(contact => contact.id === parseInt(id));

    if (contact) {
        Object.assign(contact, updatedContact);
        return res.json({ message: 'Contact updated', contact });
    } else {
        return res.status(404).json({ message: 'Contact not found' });
    }
});


app.delete('/contacts/:id', (req, res) => {
    const { id } = req.params;
    contacts = contacts.filter(contact => contact.id !== parseInt(id));
    res.json({ message: 'Contact deleted' });
});


app.get('/external-contacts', async (req, res) => {
    try {
        const response = await axios.get('https://api.example.com/contacts');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching external contacts:', error);
        res.status(500).json({ message: 'Error fetching external contacts' });
    }
});

export default app;
