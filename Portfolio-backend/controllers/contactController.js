const Contact = require('../models/Contact');

// POST save contact message
const sendMessage = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json({ message: 'Message received!', data: saved });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all messages (admin use)
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };