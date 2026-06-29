import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Send, User, Mail, Building2, Phone, MessageSquare, Lock } from 'lucide-react';

const EMAILJS_PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY || 'eKyGjQqzlwi8gVTW7';
const EMAILJS_SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID || 'service_5wed65w';
const EMAILJS_TEMPLATE_ID = 'template_pgb7kdg';

function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, '');
  if (digits.length === 0) return '';
  const hasCountryCode = digits.startsWith('63') || digits.startsWith('+63');
  if (hasCountryCode) {
    const rest = digits.startsWith('+63') ? digits.slice(3) : digits.slice(2);
    if (rest.length === 0) return '+63';
    if (rest.length <= 3) return `+63 ${rest}`;
    if (rest.length <= 6) return `+63 ${rest.slice(0, 3)} ${rest.slice(3)}`;
    return `+63 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6)}`;
  }
  if (digits.startsWith('09')) {
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`;
  }
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    regarding: '',
  });

  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [statusInfo, setStatusInfo] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const product = params.get('product');
      const category = params.get('category');
      const brand = params.get('brand');

      if (product) {
        let text = `Product Inquiry: ${product}`;
        if (brand) text += ` (${brand})`;
        if (category) text += ` - Category: ${category}`;
        setFormData((prev) => ({ ...prev, regarding: text }));
      }
    }
  }, []);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'company':
        if (!value.trim()) return 'Company is required';
        if (value.trim().length < 2) return 'Company must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phone': {
        if (!value.trim()) return 'Contact number is required';
        const digits = value.replace(/\D/g, '');
        if (digits.length < 7) return 'Please enter a valid contact number (min 7 digits)';
        if (digits.length > 15) return 'Contact number must not exceed 15 digits';
        return '';
      }
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneDisplay(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    
    // Dynamic real-time validation: validate continuously as input is modified once touched or populated
    const isTouched = touched.phone || formatted.length > 0;
    if (isTouched) {
      setTouched((prev) => ({ ...prev, phone: true }));
      const error = validateField('phone', formatted);
      setErrors((prev) => ({ ...prev, phone: error }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'message') {
      setCharCount(value.length);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Dynamic real-time validation: validate continuously as input is modified once touched or populated
    const isTouched = touched[name] || value.length > 0;
    if (isTouched) {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusInfo({ type: '', message: '' });

    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    const fields = ['name', 'company', 'email', 'phone', 'message'] as const;
    fields.forEach((field) => {
      newTouched[field] = true;
      newErrors[field] = validateField(field, formData[field]);
    });
    setTouched(newTouched);
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((msg) => msg !== '');
    if (hasError) return;

    setLoading(true);

    const templateParams = {
      name: formData.name.trim(),
      company: formData.company.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim() + (formData.regarding ? `\n\n[Regarding: ${formData.regarding}]` : ''),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        setLoading(false);
        setStatusInfo({ type: 'success', message: 'Your inquiry has been sent! We will get back to you soon.' });
        setFormData({
          name: '',
          company: '',
          phone: '',
          email: '',
          message: '',
          regarding: '',
        });
        setCharCount(0);
        setErrors({});
        setTouched({});
      })
      .catch((error) => {
        setLoading(false);
        setStatusInfo({
          type: 'error',
          message: 'Something went wrong. Please try again or email us directly at sales.marketing@doyenph.com',
        });
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div className="contact-form-body-wrapper">
      <form onSubmit={handleSubmit} id="contactForm">
        {statusInfo.message && (
          <div className={`form-status-banner ${statusInfo.type}`}>
            {statusInfo.message}
          </div>
        )}

        <div className="form-grid">
          {formData.regarding && (
            <div className="form-group form-full regarding-group">
              <label htmlFor="regarding">Regarding</label>
              <div className="input-wrap">
                <input
                  type="text"
                  id="regarding"
                  name="regarding"
                  value={formData.regarding}
                  readOnly
                  className="input-regarding"
                />
                <Lock className="field-icon" size={18} />
              </div>
            </div>
          )}
          {/* Row 1: Name | Company */}
          <div className="form-group">
            <label htmlFor="name">
              Your Name <span className="req">*</span>
            </label>
            <div className={`input-wrap${errors.name ? ' has-error' : ''}`}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your full name"
                required
              />
              <User className="field-icon" size={18} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="company">
              Your Company <span className="req">*</span>
            </label>
            <div className={`input-wrap${errors.company ? ' has-error' : ''}`}>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your company name"
                required
              />
              <Building2 className="field-icon" size={18} />
              {errors.company && <span className="field-error">{errors.company}</span>}
            </div>
          </div>

          {/* Row 2: Phone | Email */}
          <div className="form-group">
            <label htmlFor="phone">
              Telephone / Contact Number <span className="req">*</span>
            </label>
            <div className={`input-wrap${errors.phone ? ' has-error' : ''}`}>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                onBlur={handleBlur}
                placeholder="e.g. +63 917 123 4567"
                required
                className="phone-input-field"
                maxLength={20}
                inputMode="tel"
              />
              <Phone className="field-icon" size={18} />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Your Email <span className="req">*</span>
            </label>
            <div className={`input-wrap${errors.email ? ' has-error' : ''}`}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email address"
                required
              />
              <Mail className="field-icon" size={18} />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>

          {/* Row 3: Message (full width) */}
          <div className="form-group form-full">
            <label htmlFor="message">
              Your Message <span className="req">*</span>
            </label>
            <div className={`input-wrap textarea-wrap${errors.message ? ' has-error' : ''}`}>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                placeholder="Please describe your inquiry in detail..."
                maxLength={2000}
                required
              ></textarea>
              <MessageSquare className="field-icon" size={18} />
              <span className={`char-counter ${charCount > 1800 ? 'near' : ''}`}>
                {charCount.toLocaleString()} / 2,000
              </span>
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>
          </div>
        </div>

        <div className="submit-area">
          <button type="submit" className="submit-btn-teal" disabled={loading}>
            <Send size={16} />
            {loading ? 'Sending Inquiry...' : 'Send Inquiry'}
          </button>
        </div>
      </form>

      <div className="security-note">
        <Lock size={14} />
        Your information is secure. We do not share your details with third parties.
      </div>

      {loading && (
        <div className="sending-overlay active" id="sendingOverlay">
          <div className="sending-spinner"></div>
          <p>Sending your message...</p>
        </div>
      )}
    </div>
  );
}
