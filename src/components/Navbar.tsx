const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 z-50 p-6">
      <div className="flex gap-4">
        <button className="glass-button">
          Sync Now
        </button>
        <button className="glass-button">
          Explore
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
