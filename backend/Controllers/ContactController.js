import Contacts from "../Models/Contact.js";


//  Create Contact (User form submit)
 const createContact = async (req, res) => {
  try {
    const { name, email, messages } = req.body;

    if (!name || !email || !messages) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newContact = new Contacts({
      name,
      email,
      messages,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      message: "Message sent successfully ✅",
      data: savedContact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



//  Get All Contacts (Admin)
 const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ✅ Delete Contact (Admin)
const deleteContact = async (req, res) => {
  try {
    const contact = await Contacts.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {getAllContacts ,createContact , deleteContact}