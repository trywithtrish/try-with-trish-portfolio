export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-logo">TryWithTrish</div>
      <div className="footer-copy">
        © {new Date().getFullYear()} · All rights reserved
      </div>
    </footer>
  );
}
