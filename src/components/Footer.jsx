function Footer() {
  return (
    <footer className="landing-footer">
      <p>© {new Date().getFullYear()} Excellent Learning Global CBT System. <br /> All rights reserved.</p>

      <div className="footer-links">
        <a href="https://yourwebsite.com" target="_blank" rel="noreferrer">
          Website
        </a>

        <a href="https://twitter.com" target="_blank" rel="noreferrer">
            Twitter
        </a>

        <a href="https://instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>
      </div>
    </footer>
  );
}

export default Footer;