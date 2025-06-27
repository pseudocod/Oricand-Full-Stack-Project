import axios from "./axiosInstance";

export async function submitContactMessage(contactData) {
  const res = await axios.post("/contact/submit", contactData);
  return res.data;
}

export async function fetchAllContactMessages(page = 0, size = 20) {
  const res = await axios.get(`/contact/admin/messages?page=${page}&size=${size}`);
  return res.data;
}

export async function fetchContactMessagesByStatus(status, page = 0, size = 20) {
  const res = await axios.get(`/contact/admin/messages/status/${status}?page=${page}&size=${size}`);
  return res.data;
}

export async function fetchNewContactMessages() {
  const res = await axios.get("/contact/admin/messages/new");
  return res.data;
}

export async function fetchContactMessageById(id) {
  const res = await axios.get(`/contact/admin/messages/${id}`);
  return res.data;
}

export async function updateContactMessageStatus(id, status, adminNotes = '') {
  const res = await axios.put(`/contact/admin/messages/${id}/status`, {
    status,
    adminNotes
  });
  return res.data;
}

export async function fetchContactMessageStats() {
  const res = await axios.get("/contact/admin/messages/stats");
  return res.data;
} 