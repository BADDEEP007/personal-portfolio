// Email template utilities for consistent styling

const createEmailTemplate = (title, content, footerText = null) => {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #9333ea, #7c3aed); padding: 30px; border-radius: 15px 15px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">${title}</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 15px 15px; box-shadow: 0 10px 30px rgba(147, 51, 234, 0.1);">
        ${content}
        
        ${footerText ? `
          <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 12px;">${footerText}</p>
          </div>
        ` : ''}
      </div>
    </div>
  `;
};

const createContactNotificationEmail = (name, email, subject, message) => {
  const content = `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #333; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #9333ea; padding-bottom: 8px;">
        📧 New Contact Form Submission
      </h2>
    </div>
    
    <div style="margin-bottom: 20px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #9333ea; border-radius: 8px;">
      <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">👤 Contact Information</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: 600; width: 80px;">Name:</td>
          <td style="padding: 8px 0; color: #333;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #9333ea; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; font-weight: 600;">Subject:</td>
          <td style="padding: 8px 0; color: #333; font-weight: 600;">${subject}</td>
        </tr>
      </table>
    </div>
    
    <div style="margin-bottom: 20px; padding: 20px; background-color: #f8f9fa; border-left: 4px solid #7c3aed; border-radius: 8px;">
      <h3 style="margin: 0 0 15px 0; color: #333; font-size: 16px;">💬 Message</h3>
      <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #e9ecef;">
        <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${message}</p>
      </div>
    </div>
    
    <div style="text-align: center; margin: 25px 0;">
      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" 
         style="display: inline-block; background: linear-gradient(135deg, #9333ea, #7c3aed); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: 600; font-size: 14px;">
        📧 Reply to ${name}
      </a>
    </div>
  `;
  
  return createEmailTemplate(
    'New Contact Form Submission',
    content,
    `This message was sent from your portfolio contact form on ${new Date().toLocaleString()}`
  );
};

const createAutoReplyEmail = (name, subject) => {
  const content = `
    <div style="margin-bottom: 25px;">
      <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">
        Hi ${name}! 👋
      </h2>
    </div>
    
    <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
      Thank you for contacting me through my portfolio! I've received your message about 
      "<strong style="color: #9333ea;">${subject}</strong>" and I appreciate you taking the time to reach out.
    </p>
    
    <div style="background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(124, 58, 237, 0.1)); padding: 20px; border-left: 4px solid #9333ea; border-radius: 8px; margin: 25px 0;">
      <h3 style="color: #333; font-size: 16px; margin: 0 0 10px 0;">⏰ What happens next?</h3>
      <p style="color: #555; font-size: 14px; line-height: 1.6; margin: 0;">
        I typically respond to all inquiries within <strong>24-48 hours</strong>. I'll review your message carefully and get back to you as soon as possible with a detailed response.
      </p>
    </div>
    
    <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 25px;">
      In the meantime, feel free to explore my portfolio and check out my latest projects. You can also connect with me on social media for updates on my work and insights into my development journey.
    </p>
    
    <div style="text-align: center; margin: 30px 0; padding: 20px; background: linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(124, 58, 237, 0.05)); border-radius: 10px;">
      <p style="color: #333; font-size: 16px; margin: 0 0 5px 0;">
        Best regards,
      </p>
      <p style="color: #9333ea; font-size: 18px; font-weight: 700; margin: 0;">
        Your Name
      </p>
      <p style="color: #666; font-size: 14px; margin: 5px 0 0 0;">
        Full-Stack Developer & AI Enthusiast
      </p>
    </div>
    
    <div style="text-align: center; margin: 25px 0;">
      <p style="color: #666; font-size: 14px; margin-bottom: 15px;">Connect with me:</p>
      <div style="display: inline-block;">
        <a href="https://github.com/yourusername" style="display: inline-block; margin: 0 10px; color: #9333ea; text-decoration: none; font-size: 14px;">🔗 GitHub</a>
        <a href="https://linkedin.com/in/yourusername" style="display: inline-block; margin: 0 10px; color: #9333ea; text-decoration: none; font-size: 14px;">💼 LinkedIn</a>
        <a href="https://yourportfolio.com" style="display: inline-block; margin: 0 10px; color: #9333ea; text-decoration: none; font-size: 14px;">🌐 Portfolio</a>
      </div>
    </div>
  `;
  
  return createEmailTemplate(
    'Thank You for Reaching Out! 🚀',
    content,
    'This is an automated response. Please do not reply to this email.'
  );
};

const createPlainTextEmail = (name, email, subject, message, isAutoReply = false) => {
  if (isAutoReply) {
    return `
Hi ${name}!

Thank you for contacting me through my portfolio! I've received your message about "${subject}" and I appreciate you taking the time to reach out.

What happens next?
I typically respond to all inquiries within 24-48 hours. I'll review your message carefully and get back to you as soon as possible with a detailed response.

In the meantime, feel free to explore my portfolio and check out my latest projects. You can also connect with me on social media for updates on my work.

Best regards,
Your Name
Full-Stack Developer & AI Enthusiast

Connect with me:
GitHub: https://github.com/yourusername
LinkedIn: https://linkedin.com/in/yourusername
Portfolio: https://yourportfolio.com

---
This is an automated response. Please do not reply to this email.
    `.trim();
  }
  
  return `
New Contact Form Submission

Contact Information:
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent on: ${new Date().toLocaleString()}
  `.trim();
};

module.exports = {
  createEmailTemplate,
  createContactNotificationEmail,
  createAutoReplyEmail,
  createPlainTextEmail
};