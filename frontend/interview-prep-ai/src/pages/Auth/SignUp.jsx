import { useContext, useState } from "react";
import { LuBrain, LuMail, LuLock, LuUser, LuArrowRight } from "react-icons/lu";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import uploadImage from "../../utils/uploadImage";
import { API_PATHS } from "../../utils/apiPaths";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) { setError("Please enter full name."); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address."); return; }
    if (!password) { setError("Please enter the password."); return; }
    setError("");
    setIsLoading(true);
    try {
      let profileImageUrl = "";
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, { name: fullName, email, password, profileImageUrl });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ width: "min(90vw, 420px)", padding: "40px 36px", background: "#0f0f0f", borderRadius: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
        <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #FF9324, #FCD760)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LuBrain size={18} color="#fff" />
        </div>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Interview Prep AI</span>
      </div>

      <h3 style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>
        Create account
      </h3>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
        Start your interview prep journey today
      </p>

      <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <DarkInput label="Full Name" placeholder="John Doe" type="text" icon={<LuUser size={16} />} value={fullName} onChange={e => setFullName(e.target.value)} />
        <DarkInput label="Email Address" placeholder="john@example.com" type="email" icon={<LuMail size={16} />} value={email} onChange={e => setEmail(e.target.value)} />
        <DarkInput label="Password" placeholder="Min 8 characters" type="password" icon={<LuLock size={16} />} value={password} onChange={e => setPassword(e.target.value)} />

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: 13 }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{ background: "linear-gradient(135deg, #FF9324, #FCD760)", border: "none", color: "#000", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 12, cursor: isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: isLoading ? 0.7 : 1, marginTop: 4, transition: "all 0.2s" }}
        >
          {isLoading ? "Creating account..." : <><span>Create Account</span><LuArrowRight size={16} /></>}
        </button>
      </form>

      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 20, textAlign: "center" }}>
        Already have an account?{" "}
        <button type="button" onClick={() => setCurrentPage("login")} style={{ background: "none", border: "none", color: "#FF9324", fontWeight: 600, cursor: "pointer", fontSize: 13, textDecoration: "underline" }}>
          Sign In
        </button>
      </p>
    </div>
  );
};

const DarkInput = ({ label, placeholder, type, icon, value, onChange }) => (
  <div>
    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 6 }}>{label}</label>
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }}>{icon}</div>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px 11px 38px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
        onFocus={e => e.target.style.borderColor = "rgba(255,147,36,0.5)"}
        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
      />
    </div>
  </div>
);

export default SignUp;
