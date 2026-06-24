import React, { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, getCountryCallingCode } from 'libphonenumber-js';
import type { CountryCode } from 'libphonenumber-js';
import { Send, User, Mail, Globe, MessageSquare, Lock } from 'lucide-react';
import { countries, getFlag, type CountryOption } from '../../data/countries';

const EMAILJS_PUBLIC_KEY = 'eKyGjQqzlwi8gVTW7';
const EMAILJS_SERVICE_ID = 'service_5wed65w';
const EMAILJS_TEMPLATE_ID = 'template_pgb7kdg';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    message: '',
    regarding: '',
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [phoneError, setPhoneError] = useState('');

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

  // Get placeholder for the selected country
  const phonePlaceholder = useMemo(() => {
    if (!selectedCountry) return 'Enter phone number';
    // Generate a sample placeholder based on dial code
    return `e.g. ${selectedCountry.dialCode} 9171234567`;
  }, [selectedCountry]);

  // Validate phone number against selected country
  const validatePhone = (value: string | undefined, country: CountryOption | null): boolean => {
    if (!value || !country) return false;
    return isValidPhoneNumber(value, country.code as CountryCode);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countries.find((c) => c.code === code) || null;
    setSelectedCountry(country);
    setFormData((prev) => ({ ...prev, country: country?.name || '' }));
    // Clear phone when country changes
    setFormData((prev) => ({ ...prev, phone: '' }));
    setPhoneError('');
  };

  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, phone: value || '' }));
    setPhoneError('');
  };

  const handlePhoneBlur = () => {
    if (formData.phone && selectedCountry) {
      if (!validatePhone(formData.phone, selectedCountry)) {
        setPhoneError(`Please enter a valid ${selectedCountry.name} phone number`);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'message') {
      setCharCount(value.length);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry) {
      alert('Please select your country.');
      return;
    }

    if (!formData.phone) {
      alert('Please enter your phone number.');
      return;
    }

    if (!validatePhone(formData.phone, selectedCountry)) {
      alert(`Please enter a valid ${selectedCountry.name} phone number.`);
      return;
    }

    setLoading(true);

    // Format phone as E.164 (e.g. +639171234567)
    const templateParams = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      country: selectedCountry.name,
      message: formData.message.trim() + (formData.regarding ? `\n\n[Regarding: ${formData.regarding}]` : ''),
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        setLoading(false);
        alert('Your inquiry has been sent! We will get back to you soon.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          country: '',
          message: '',
          regarding: '',
        });
        setSelectedCountry(null);
        setCharCount(0);
        setPhoneError('');
      })
      .catch((error) => {
        setLoading(false);
        alert('Something went wrong. Please try again or email us directly at sales.marketing@doyenph.com');
        console.error('EmailJS error:', error);
      });
  };

  return (
    <div className="contact-form-body-wrapper">
      <form onSubmit={handleSubmit} id="contactForm">
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

        <div className="form-grid">
          {/* Row 1: Name | Country */}
          <div className="form-group">
            <label htmlFor="name">
              Your Name <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
              <User className="field-icon" size={18} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="country">
              Your Country <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <select
                id="country"
                name="country"
                value={selectedCountry?.code || ''}
                onChange={handleCountryChange}
                required
                className="country-select"
              >
                <option value="" disabled>Select your country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {getFlag(c.code)} {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>
              <Globe className="field-icon" size={18} />
            </div>
          </div>

          {/* Row 2: Phone (locked to country) | Email */}
          <div className="form-group">
            <label htmlFor="phone">
              Tel / WhatsApp <span className="req">*</span>
            </label>
            <div className="phone-input-wrapper">
              <PhoneInput
                international
                country={selectedCountry?.code as CountryCode | undefined}
                defaultCountry="PH"
                value={formData.phone || undefined}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                placeholder={phonePlaceholder}
                disabled={!selectedCountry}
                countrySelectComponent={() => null}
                className="phone-input-field"
                numberInputProps={{
                  className: 'phone-number-input',
                }}
              />
              {!selectedCountry && (
                <span className="phone-hint">
                  Please select a country first
                </span>
              )}
              {selectedCountry && !phoneError && (
                <span className="phone-hint">
                  {getFlag(selectedCountry.code)} {selectedCountry.name} — {selectedCountry.dialCode}
                </span>
              )}
              {phoneError && (
                <span className="phone-hint phone-error">
                  {phoneError}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Your Email <span className="req">*</span>
            </label>
            <div className="input-wrap">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
              <Mail className="field-icon" size={18} />
            </div>
          </div>

          {/* Row 3: Message (full width) */}
          <div className="form-group form-full">
            <label htmlFor="message">
              Your Message <span className="req">*</span>
            </label>
            <div className="input-wrap textarea-wrap">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Please describe your inquiry in detail..."
                maxLength={2000}
                required
              ></textarea>
              <MessageSquare className="field-icon" size={18} />
              <span className={`char-counter ${charCount > 1800 ? 'near' : ''}`}>
                {charCount.toLocaleString()} / 2,000
              </span>
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
