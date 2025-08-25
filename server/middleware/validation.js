// Input validation middleware

const validator = require('validator');

// Email validation
const validateEmail = (email) => {
  return validator.isEmail(email) && email.length <= 254;
};

// Sanitize HTML and dangerous characters
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags specifically
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove potential XSS attempts
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Limit length
    .substring(0, 2000);
};

// Contact form validation middleware
const validateContactForm = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  // Check required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    errors.push('Email is required');
  }
  
  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    errors.push('Subject is required');
  }
  
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    errors.push('Message is required');
  }

  // Validate email format
  if (email && !validateEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  // Validate lengths
  if (name && name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (subject && subject.length > 200) {
    errors.push('Subject must be less than 200 characters');
  }
  
  if (message && message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }

  // Check for minimum lengths
  if (name && name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (subject && subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long');
  }
  
  if (message && message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }

  // Check for spam patterns
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|congratulations)\b/i,
    /\b(click here|act now|limited time|urgent)\b/i,
    /(http:\/\/|https:\/\/|www\.)[^\s]{10,}/g, // Multiple URLs
    /(.)\1{10,}/, // Repeated characters
  ];

  const fullText = `${name} ${email} ${subject} ${message}`.toLowerCase();
  
  for (const pattern of spamPatterns) {
    if (pattern.test(fullText)) {
      errors.push('Message appears to be spam');
      break;
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  // Sanitize inputs
  req.body.name = sanitizeInput(name);
  req.body.email = sanitizeInput(email);
  req.body.subject = sanitizeInput(subject);
  req.body.message = sanitizeInput(message);

  next();
};

// Rate limiting check
const checkRateLimit = (req, res, next) => {
  // This will be handled by express-rate-limit middleware
  // but we can add additional custom logic here if needed
  next();
};

module.exports = {
  validateContactForm,
  checkRateLimit,
  validateEmail,
  sanitizeInput
};