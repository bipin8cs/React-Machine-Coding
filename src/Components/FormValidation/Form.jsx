// Form.jsx
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import './Form.css';

// Validation rules
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

const validatePhone = (phone) => {
  const re = /^\+\d{1,3}\d{10}$/;
  return re.test(phone);
};

// Mock API
const mockApi = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({ success: true });
      } else {
        reject({
          errors: {
            email: Math.random() > 0.5 ? 'Email already exists' : undefined,
            phone: Math.random() > 0.5 ? 'Phone number invalid' : undefined,
          }
        });
      }
    }, 1000);
  });
};

// Rate limiting
const RateLimiter = {
  lastRequest: 0,
  minInterval: 10,
  canRequest() {
    const now = Date.now();
    if (now - this.lastRequest < this.minInterval) {
      return false;
    }
    this.lastRequest = now;
    return true;
  }
};

const Form = () => {
  // Form state
  const [formData, setFormData] = useState(() => {
    // Load from localStorage
    const saved = localStorage.getItem('formData');
    return saved ? JSON.parse(saved) : {
      email: '',
      password: '',
      phone: '',
    };
  });

  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Save to localStorage on formData change
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // Real-time validation with debounce
  const validateField = useCallback(
    debounce((name, value) => {
      let error = '';
      
      switch (name) {
        case 'email':
          if (!value) error = 'Email is required';
          else if (!validateEmail(value)) error = 'Invalid email format';
          break;
        case 'password':
          if (!value) error = 'Password is required';
          else if (!validatePassword(value)) error = 'Password must be 8+ characters with uppercase, lowercase, number, and special character';
          break;
        case 'phone':
          if (!value) error = 'Phone is required';
          else if (!validatePhone(value)) error = 'Invalid phone format (+1234567890)';
          break;
        default:
          break;
      }

      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }, 300),
    []
  );

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    validateField(name, value);
  };

  // Form-level validation
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
      if (errors[key]) {
        newErrors[key] = errors[key];
      }
    });
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (!RateLimiter.canRequest()) {
      setSubmitError('Please wait before submitting again');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setServerErrors({});

    try {
      const response = await mockApi();
      if (response.success) {
        // Reset form
        setFormData({ email: '', password: '', phone: '' });
        localStorage.removeItem('formData');
        alert('Form submitted successfully!');
      }
    } catch (error) {
      if (error.errors) {
        setServerErrors(error.errors);
        // Reconciliation: Update client-side errors if server reports new issues
        setErrors(prev => ({
          ...prev,
          ...error.errors
        }));
      } else {
        setSubmitError('Network error occurred');
        if (retryCount < 3) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            handleSubmit(e);
          }, 2000);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email || serverErrors.email ? 'error' : formData.email && !errors.email ? 'success' : ''}
        />
        {(errors.email || serverErrors.email) && (
          <span className="error-message">{errors.email || serverErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password || serverErrors.password ? 'error' : formData.password && !errors.password ? 'success' : ''}
        />
        {(errors.password || serverErrors.password) && (
          <span className="error-message">{errors.password || serverErrors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone || serverErrors.phone ? 'error' : formData.phone && !errors.phone ? 'success' : ''}
        />
        {(errors.phone || serverErrors.phone) && (
          <span className="error-message">{errors.phone || serverErrors.phone}</span>
        )}
      </div>

      {submitError && (
        <div className="form-error">
          {submitError}
          {retryCount < 3 && <span>Retrying... ({retryCount + 1}/3)</span>}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting || Object.keys(errors).some(key => errors[key])}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};
export default Form;

