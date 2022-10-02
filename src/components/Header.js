import React from "react";

const Header = ({ title }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <section className="container">
          <a className="navbar-brand" href="#">
            {title}
          </a>
        </section>
      </nav>
    </header>
  );
};

export default Header;
