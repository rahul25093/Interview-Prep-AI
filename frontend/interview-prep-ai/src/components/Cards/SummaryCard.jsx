import { LuTrash2, LuClock, LuBriefcase, LuBookOpen } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({ colors, role, topicsToFocus, experience, questions, description, lastUpdated, onSelect, onDelete }) => {
  return (
    <div
      onClick={onSelect}
      style={{ background: "#fff", border: "1.5px solid #f3f4f6", borderRadius: 18, overflow: "hidden", cursor: "pointer", transition: "all 0.22s", position: "relative" }}
      onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "rgba(255,147,36,0.25)"; }}
      onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "#f3f4f6"; }}
    >
      {/* Card header with color */}
      <div style={{ background: colors.bgcolor, padding: "20px 20px 16px", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          {/* Avatar */}
          <div style={{ flexShrink: 0, width: 48, height: 48, background: "rgba(255,255,255,0.9)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: "#111" }}>{getInitials(role)}</span>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{role}</h2>
            <p style={{ fontSize: 12, color: "#6b7280", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{topicsToFocus}</p>
          </div>
        </div>

        {/* Delete btn */}
        <button
          className="delete-btn"
          onClick={e => { e.stopPropagation(); onDelete(); }}
          style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", display: "none", alignItems: "center", gap: 4, color: "#ef4444", fontSize: 12, fontWeight: 600, transition: "all 0.15s" }}
        >
          <LuTrash2 size={13} />
        </button>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 20px 18px" }}>
        {description && (
          <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {description}
          </p>
        )}

        {/* Stats row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <StatBadge icon={<LuBriefcase size={11} />} label={`${experience} ${experience === 1 ? "yr" : "yrs"} exp`} />
          <StatBadge icon={<LuBookOpen size={11} />} label={`${questions} Q&A`} />
          <StatBadge icon={<LuClock size={11} />} label={lastUpdated} />
        </div>
      </div>

      <style>{`.delete-btn { display: none !important; } div:hover > div > .delete-btn { display: flex !important; }`}</style>
    </div>
  );
};

const StatBadge = ({ icon, label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 50, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#374151" }}>
    {icon}{label}
  </div>
);

export default SummaryCard;
