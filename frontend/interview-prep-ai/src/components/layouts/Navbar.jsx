import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuBrain } from "react-icons/lu";

const Navbar = () => {
  return (
    <div style={{ height: 64, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 30 }}>
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #FF9324, #FCD760)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <LuBrain size={18} color="#000" />
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
            Interview Prep AI
          </span>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
};

export default Navbar;
