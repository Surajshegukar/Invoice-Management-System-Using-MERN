import React from 'react'

function Home() {
  
const styles = {
  footerContainer: {
    background: 'linear-gradient(to right,#3498db,red)', // Gradient background
    color: 'black',
    padding: '30px 0',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  footerColumn: {
    flex: 1,
    margin: '0 20px',
  },
  socialIcons: {
    display: 'flex',
    fontSize: '1.5em',
    justifyContent: 'center', // Centered social icons
    width: '120px',
    margin: '10px 0',
    gap: '10px',
  },
  socialIcon: {
    color: '#000', // Initial icon color
    margin: '0 10px',
    transition: 'color 0.3s ease-in-out',
  },
  socialIconHover: {
    color: '#ff0000', // Icon color on hover
  },
  footerBottom: {
    marginTop: '20px',
    textAlign: 'center',
  },
  heroContainer: {
    background: '#3498db',
    color: '#fff',
    padding: '50px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5em',
    marginBottom: '20px',
  },
  subtext: {
    fontSize: '1.2em',
  },
  contentContainer: {
    background: '#f9f9f9',
    padding: '50px',
    textAlign: 'center',
  },
  content: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2.5em',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2em',
    color: '#555',
    marginBottom: '30px',
  },
  featureList: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  featureItem: {
    flex: 1,
    padding: '20px',
    background: '#3498db',
    borderRadius: '8px',
    margin: '0 10px',
    color: '#fff',
  },
  featureIcon: {
    width: '100%',
    height: 'auto',
    marginBottom: '10px',
    borderRadius: '8px',
  },
};
  return (
    <div>
    <div style={styles.heroContainer}>
      <div style={styles.heroContent}>
        <h1 style={styles.heading}>Welcome to Invoice Management System</h1>
        <p style={styles.subtext}>Effortlessly manage your invoices with our user-friendly system.</p>
      </div>
    </div>
    <div style={styles.contentContainer}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Features</h2>
        <p style={styles.description}>
          Our Invoice Management System offers a range of features to simplify your invoicing process.
          Explore the functionalities and boost your productivity.
        </p>
        <div style={styles.featureList}>
          <div style={styles.featureItem}>
            <img src="https://source.unsplash.com/random/800x600?feature1" alt="Feature 1" style={styles.featureIcon} />
            <p>Feature 1</p>
          </div>
          <div style={styles.featureItem}>
            <img src="https://source.unsplash.com/random/800x600?feature2" alt="Feature 2" style={styles.featureIcon} />
            <p>Feature 2</p>
          </div>
          <div style={styles.featureItem}>
            <img src="https://source.unsplash.com/random/800x600?feature3" alt="Feature 3" style={styles.featureIcon} />
            <p>Feature 3</p>
          </div>
        </div>
      </div>
    </div>
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        <div style={styles.footerColumn}>
          <h3>Contact Us</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +1 123 456 7890</p>
        </div>
        <div style={styles.footerColumn}>
          <h3>Quick Links</h3>
          <ul>
            <li style={{listStyle:'none' }}><a href="/">Home</a></li>
            <li style={{listStyle:'none' }}><a href="/features">Features</a></li>
            <li style={{listStyle:'none' }}><a href="/pricing">Pricing</a></li>
            <li style={{listStyle:'none' }}><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div style={styles.footerColumn}>
          <h3>Follow Us</h3>
          <div style={styles.socialIcons}>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-facebook"></i></a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div style={styles.footerBottom}>
        <p>&copy; 2024 Invoice Management System. All rights reserved.</p>
      </div>
    </footer>
  </div>

  )
}

export default Home