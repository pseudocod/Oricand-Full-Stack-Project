import { useState, useEffect } from 'react';
import {
  fetchAllContactMessages,
  fetchContactMessagesByStatus,
  fetchNewContactMessages,
  fetchContactMessageById,
  updateContactMessageStatus,
  fetchContactMessageStats
} from '../services/contactService';

export const useContactMessages = (initialPage = 0, initialSize = 20) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const loadMessages = async (page = currentPage, size = initialSize) => {
    try {
      setLoading(true);
      const data = await fetchAllContactMessages(page, size);
      setMessages(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      console.error('Failed to load contact messages:', err);
      setError('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const loadMessagesByStatus = async (status, page = 0, size = initialSize) => {
    try {
      setLoading(true);
      const data = await fetchContactMessagesByStatus(status, page, size);
      setMessages(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(page);
      setError(null);
    } catch (err) {
      console.error('Failed to load contact messages by status:', err);
      setError('Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  };

  const updateMessageStatus = async (id, status, adminNotes = '') => {
    try {
      await updateContactMessageStatus(id, status, adminNotes);
      await loadMessages(currentPage);
      return true;
    } catch (err) {
      console.error('Failed to update message status:', err);
      setError('Failed to update message status');
      return false;
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return {
    messages,
    loading,
    error,
    totalPages,
    totalElements,
    currentPage,
    loadMessages,
    loadMessagesByStatus,
    updateMessageStatus,
    setCurrentPage
  };
};

export const useNewContactMessages = () => {
  const [newMessages, setNewMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNewMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchNewContactMessages();
      setNewMessages(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load new contact messages:', err);
      setError('Failed to load new contact messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNewMessages();
  }, []);

  return { newMessages, loading, error, loadNewMessages };
};

export const useContactMessage = (id) => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMessage = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const data = await fetchContactMessageById(id);
      setMessage(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load contact message:', err);
      setError('Failed to load contact message');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessage();
  }, [id]);

  return { message, loading, error, loadMessage };
};

export const useContactMessageStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await fetchContactMessageStats();
      setStats(data || {});
      setError(null);
    } catch (err) {
      console.error('Failed to load contact message stats:', err);
      setError('Failed to load contact message stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  return { stats, loading, error, loadStats };
}; 