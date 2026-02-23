import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/profile" style={styles.link}>Profile</Link>
        <Link to="/contact" style={styles.link}>Contact</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/dashboard" style={styles.link}>Dashboard</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1e1e1e",
    color: "white"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "500"
  }
};

export default Navbar;