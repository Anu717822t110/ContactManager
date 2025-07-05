import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import { ContactList } from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [loading, setLoading] = useState(false);   // ✅ added
  const [error, setError] = useState("");           // ✅ added

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/contacts");
      setContacts(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load contacts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const saveContact = async (contact) => {
    try {
      if (contact._id) {
        await axios.put(`http://localhost:5000/contacts/${contact._id}`, contact);
      } else {
        await axios.post("http://localhost:5000/contacts", contact);
      }
      fetchContacts();
      setEditContact(null);
    } catch (err) {
      setError("Failed to save contact");
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      setError("Failed to delete contact");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Contact Manager</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ContactForm contact={editContact} onSave={saveContact} />
      <ContactList
        contacts={contacts}
        onEdit={setEditContact}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
