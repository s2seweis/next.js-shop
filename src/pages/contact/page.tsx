// src/components/ContactForm.tsx
import React, { useState } from 'react';
import styles from '@/src/styles/css/ContactForm.module.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      {/* <h3 style={{ marginTop: '100px', textAlign: 'center' }}>Contact</h3> */}
      <div
        className="main"
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '-100px',
        }}
      >
        <div className={styles.card}>
        <h3 style={{ marginTop: '100px', textAlign: '' }}>Contact</h3>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label className={styles.formLabel}>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
              />
            </label>
            <label className={styles.formLabel}>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
              />
            </label>
            <label className={styles.formLabel}>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.textareaField}
              />
            </label>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
