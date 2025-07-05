import { BellIcon, HomeIcon, SearchIcon, ShipWheelIcon, UsersIcon } from "lucide-react";
import { Link, useLocation } from "react-router"; // ensure react-router-dom v6+
import useAuthUser from "../hooks/useAuthUser";

/**
 * Sidebar re‑designed with beautiful inline styles, featuring a search input and button‑like nav links.
 */
const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  // ——— Shared colors & easing ———
  const indigo = "#4f46e5"; // primary accent
  const gray200 = "#e5e7eb";
  const gray300 = "#d1d5db";
  const gray700 = "#374151";

  // ——— Layout containers ———
  const sidebarStyle = {
    width: "256px", // 64 * 4
    backgroundColor: "#f3f4f6", // base‑200
    borderRight: `1px solid ${gray300}`,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
  };

  const headerStyle = {
    padding: "1.25rem", // 20px
    borderBottom: `1px solid ${gray300}`,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const logoText = {
    fontSize: "1.75rem",
    fontWeight: 700,
    fontFamily: "monospace",
    background: `linear-gradient(90deg,${indigo},#14b8a6)`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    letterSpacing: "0.05em",
  };

  // Search bar section
  const searchSection = {
    padding: "1rem",
    borderBottom: `1px solid ${gray300}`,
    display: "flex",
    gap: "0.5rem",
  };

  const searchInput = {
    flex: 1,
    padding: "0.55rem 0.75rem",
    fontSize: "0.85rem",
    border: `1px solid ${gray300}`,
    borderRadius: "0.5rem",
    outline: "none",
  };

  const searchButton = {
    padding: "0.55rem 0.75rem",
    backgroundColor: indigo,
    border: "none",
    borderRadius: "0.5rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const navStyle = {
    flex: 1,
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const linkBase = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.6rem 0.9rem",
    borderRadius: "0.5rem",
    fontSize: "0.95rem",
    fontWeight: 500,
    textDecoration: "none",
    color: gray700,
    transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out, transform 0.15s",
  };

  const activeLink = {
    backgroundColor: gray200,
    color: "#1f2937", // gray‑800
  };

  const profileSection = {
    padding: "1rem",
    borderTop: `1px solid ${gray300}`,
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  };

  const avatarWrapper = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
  };

  const avatarImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const onlineDot = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#22c55e", // success green
    display: "inline-block",
  };

  // NavLink helper
  const NavLink = ({ to, icon: Icon, label }) => {
    const isActive = currentPath === to;
    return (
      <Link
        to={to}
        style={{ ...linkBase, ...(isActive ? activeLink : {}) }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "#f9fafb";
            e.currentTarget.style.transform = "translateX(4px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.transform = "none";
          }
        }}
      >
        <Icon size={20} style={{ opacity: 0.75 }} />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <aside style={sidebarStyle} className="hidden lg:flex">
      {/* Logo */}
      <div style={headerStyle}>
        <ShipWheelIcon size={34} color={indigo} />
        <span style={logoText}>ConnectX</span>
      </div>

      {/* Search bar */}
      <div style={searchSection}>
        <input type="text" placeholder="Search..." style={searchInput} />
        <button style={searchButton} aria-label="search">
          <SearchIcon size={18} color="#ffffff" />
        </button>
      </div>

      {/* Navigation */}
      <nav style={navStyle}>
        <NavLink to="/" icon={HomeIcon} label="Home" />
        <NavLink to="/friends" icon={UsersIcon} label="Friends" />
        <NavLink to="/notifications" icon={BellIcon} label="Notifications" />
      </nav>

      {/* User profile */}
      <div style={profileSection}>
        <div style={avatarWrapper}>
          <img
            src={authUser?.profilePic || "/placeholder-avatar.png"}
            alt="User Avatar"
            style={avatarImg}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontWeight: 600, fontSize: "0.85rem", margin: 0 }}>{
            authUser?.fullName || "Guest User"
          }</p>
          <p style={{ fontSize: "0.7rem", color: "#16a34a", display: "flex", alignItems: "center", gap: "4px", margin: 0 }}>
            <span style={onlineDot} /> Online
          </p>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
