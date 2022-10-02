import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto container">
      <p>&copy; Copyright {currentYear}. Created By Love ❤️ </p>
    </footer>
  );
};

export default Footer;
