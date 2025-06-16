import React from 'react'
import styles from './styles.module.css'

export default function ContactUs() {
  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: '#012F5A', position: 'relative' }}
      >
        <div
          className="p-5 rounded shadow-lg text-white text-center"
          style={{
            backgroundColor: '#012F5A',
            border: '4px solid #5AB1C6',
            maxWidth: '500px',
            width: '100%',
          }}
        >
          <h2 className="fw-bold mb-3">CONTACT US</h2>
          <p className="mb-4 text-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore.
          </p>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className={`form-control border-0 border-bottom rounded-0 text-white ${styles.placeholderWhite}`}
                placeholder="Your Name"
                style={{
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid #5AB1C6',
                }}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className={`form-control border-0 border-bottom rounded-0 text-white ${styles.placeholderWhite}`}
                placeholder="Your Mail"
                style={{
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid #5AB1C6',
                }}
              />
            </div>
            <div className="mb-4">
              <textarea
                rows="3"
                className={`form-control border-0 border-bottom rounded-0 text-white ${styles.placeholderWhite}`}
                placeholder="Your Message"
                style={{
                  backgroundColor: 'transparent',
                  borderBottom: '1px solid #5AB1C6',
                  resize: 'none',
                }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-outline-light px-4"
              style={{ borderColor: '#ffffff' }}
            >
              SUBMIT →
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}