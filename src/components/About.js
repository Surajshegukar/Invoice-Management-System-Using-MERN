import React from 'react'

function About() {
  return (
    <div style={styles.aboutContainer}>
      <div style={styles.aboutContent}>
        <h2 style={styles.heading}>Our Story</h2>
        <p style={styles.description}>
          We are dedicated to providing a user-friendly and feature-rich platform that adapts to your unique needs.
        </p>
        <h2 style={styles.heading}>Mission</h2>
        <p style={styles.description}>
          Our mission is to revolutionize the way businesses handle their invoicing tasks.
          We aim to offer a comprehensive and intuitive solution that streamlines the entire invoicing workflow, from creation to payment tracking.
        </p>
        <h2 style={styles.heading}>Values</h2>
        <ul style={styles.valuesList}>
          <li><i className="" style={styles.valueIcon}></i> Innovation</li>
          <li><i className="" style={styles.valueIcon}></i> Efficiency</li>
          <li><i className="" style={styles.valueIcon}></i> Collaboration</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  aboutContainer: {
    background: 'linear-gradient(to right, #3498db, #1abc9c)',
    color: '#fff',
    padding: '50px 0',
    textAlign: 'center',
  },
  aboutContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '3em',
    color: '#fff',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2em',
    color: '#fff',
    marginBottom: '30px',
    lineHeight: '1.5',
  },
  highlight: {
    color: '#1abc9c',
  },
  valuesList: {
    listStyleType: 'none',
    padding: 0,
    fontSize: '1.2em',
    color: '#fff',
  },
  valueIcon: {
    marginRight: '10px',
  },
};

export default About