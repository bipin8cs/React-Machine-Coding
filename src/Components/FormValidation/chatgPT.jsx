import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const initialFormState = {
  email: '',
  password: '',
  phone: '',
};

const initialErrors = {
  email: '',
  password: '',
  phone: '',
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
const validatePhone = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone);

const mockApi = async (data) => {
  await new Promise((r) => setTimeout(r, 1000));
  if (Math.random() < 0.3) {
    return {
      success: false,
      errors: {
        email: 'Email already exists.',
        phone: 'Invalid phone format.',
      },
    };
  }
  return { success: true };
};

export default function ValidatedForm() {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : initialFormState;
  });
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    debounceValidate(field, value);
  };

  const debounceValidate = debounce((field, value) => {
    let error = '';
    if (!value) error = 'This field is required';
    else if (field === 'email' && !validateEmail(value)) error = 'Invalid email format';
    else if (field === 'password' && !validatePassword(value)) error = 'Password too weak';
    else if (field === 'phone' && !validatePhone(value)) error = 'Invalid phone number';

    setErrors((prev) => ({ ...prev, [field]: error }));
  }, 300);

  const validateForm = () => {
    const newErrors = {};
    newErrors.email = !formData.email ? 'Required' : !validateEmail(formData.email) ? 'Invalid email' : '';
    newErrors.password = !formData.password ? 'Required' : !validatePassword(formData.password) ? 'Weak password' : '';
    newErrors.phone = !formData.phone ? 'Required' : !validatePhone(formData.phone) ? 'Invalid phone' : '';
    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (attempts >= maxAttempts) return setMessage('Rate limit exceeded');
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');
    try {
      const res = await mockApi(formData);
      if (!res.success) {
        setErrors((prev) => ({ ...prev, ...res.errors }));
        setMessage('Validation failed on server');
      } else {
        localStorage.removeItem('formData');
        setFormData(initialFormState);
        setErrors(initialErrors);
        setMessage('Form submitted successfully!');
      }
    } catch (err) {
      setMessage('Network error. Please retry.');
    } finally {
      setLoading(false);
      setAttempts((a) => a + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <div>
        <label>Email</label>
        <input type="email" value={formData.email} onChange={handleChange('email')} className="border p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={formData.password} onChange={handleChange('password')} className="border p-2 w-full" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div>
        <label>Phone</label>
        <input type="tel" value={formData.phone} onChange={handleChange('phone')} className="border p-2 w-full" />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {message && <p className="mt-2 text-sm text-center text-gray-700">{message}</p>}
    </form>
  );
}
