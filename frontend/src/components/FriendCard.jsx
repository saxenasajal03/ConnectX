import { useState } from "react";
import { Link } from "react-router"; // make sure you are using react-router-dom v6+
import { LANGUAGE_TO_FLAG } from "../constants";

/**
 * Inline‑styled friend card component.
 * Designed to look good even if external CSS (Tailwind) fails to load.
 */
const FriendCard = ({ friend }) => {
  const [hovered, setHovered] = useState(false);

  // Shadow intensifies on hover
  const cardStyle = {
    backgroundColor: "#f3f4f6", // Tailwind's base‑200 equivalent
    borderRadius: "0.75rem",
    padding: "1rem",
    boxShadow: hovered
      ? "0 8px 20px rgba(0,0,0,0.12)"
      : "0 2px 6px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out",
    transform: hovered ? "translateY(-2px)" : "none",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  };

  const avatarWrapper = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
  };

  const avatarImg = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const nameStyle = {
    fontWeight: 600,
    fontSize: "1rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "140px",
  };

  const badgeBase = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "2px 6px",
    fontSize: "0.7rem",
    borderRadius: "0.375rem",
  };

  const nativeBadge = {
    ...badgeBase,
    backgroundColor: "#6366f1", // indigo‑500
    color: "#ffffff",
  };

  const learningBadge = {
    ...badgeBase,
    border: "1px solid #6366f1",
    color: "#6366f1",
    backgroundColor: "transparent",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.55rem 0",
    borderRadius: "0.5rem",
    border: "1px solid #6366f1",
    backgroundColor: hovered ? "#6366f1" : "transparent",
    color: hovered ? "#ffffff" : "#6366f1",
    fontWeight: 600,
    fontSize: "0.9rem",
    textAlign: "center",
    textDecoration: "none",
    transition: "all 0.15s ease-in-out",
    display: "block",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* USER INFO */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div style={avatarWrapper}>
          <img
            src={friend.profilePic || "/placeholder-avatar.png"}
            alt={friend.fullName}
            style={avatarImg}
          />
        </div>
        <h3 style={nameStyle}>{friend.fullName}</h3>
      </div>

      {/* BADGES */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "0.75rem" }}>
        <span style={nativeBadge}>
          {getLanguageFlag(friend.nativeLanguage)} Native: {friend.nativeLanguage}
        </span>
        <span style={learningBadge}>
          {getLanguageFlag(friend.learningLanguage)} Learning: {friend.learningLanguage}
        </span>
      </div>

      {/* MESSAGE BUTTON */}
      <Link
        to={`/chat/${friend._id}`}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#6366f1";
          e.currentTarget.style.color = "#ffffff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#6366f1";
        }}
      >
        Message
      </Link>
    </div>
  );
};
export default FriendCard;

/**
 * Small helper that returns a 24×18 flag icon <img> for a language code.
 * Looks up the mapping from LANGUAGE_TO_FLAG constant.
 */
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        style={{ height: "12px", marginRight: "4px" }}
      />
    );
  }
  return null;
}
