import { LuBriefcase, LuBookOpen, LuClock, LuTarget } from "react-icons/lu";

const RoleInfoHeader = ({ role, topicsToFocus, experience, questions, description, lastUpdated }) => {
  return (
    <div style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, background: "radial-gradient(circle, rgba(255,147,36,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -40, left: "30%", width: 160, height: 160, background: "radial-gradient(circle, rgba(252,215,96,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="container mx-auto px-6 py-8 relative z-10">
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <LuTarget size={13} style={{ color: "#FF9324" }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: "#FF9324", letterSpacing: "0.1em", textTransform: "uppercase" }}>Interview Session</span>
        </div>

        <h1 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
          {role}
        </h1>

        {topicsToFocus && (
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4, fontWeight: 500 }}>
            {topicsToFocus}
          </p>
        )}

        {description && (
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 20, maxWidth: 600 }}>
            {description}
          </p>
        )}

        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <HeaderBadge icon={<LuBriefcase size={13} />} label={`${experience} ${experience === 1 ? "Year" : "Years"} Experience`} />
          <HeaderBadge icon={<LuBookOpen size={13} />} label={`${questions} Questions`} />
          <HeaderBadge icon={<LuClock size={13} />} label={`Updated ${lastUpdated}`} />
        </div>
      </div>
    </div>
  );
};

const HeaderBadge = ({ icon, label }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>
    {icon}{label}
  </div>
);

export default RoleInfoHeader;
