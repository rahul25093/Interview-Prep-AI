import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuBrain, LuBriefcase, LuHash, LuBookOpen, LuFileText, LuArrowRight, LuSparkles } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({ role: "", experience: "", topicsToFocus: "", description: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;
    if (!role || !experience || !topicsToFocus) { setError("Please fill all required fields"); return; }
    setError("");
    setIsLoading(true);
    try {
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, { role, experience, topicsToFocus, numberOfQuestions: 10 });
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, { ...formData, questions: generatedQuestions });
      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data.session._id}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { key: "role", label: "Target Role", placeholder: "e.g. Frontend Developer", type: "text", icon: <LuBriefcase size={15} />, required: true },
    { key: "experience", label: "Years of Experience", placeholder: "e.g. 2", type: "number", icon: <LuHash size={15} />, required: true },
    { key: "topicsToFocus", label: "Topics to Focus On", placeholder: "e.g. React, Node.js, MongoDB", type: "text", icon: <LuBookOpen size={15} />, required: true },
    { key: "description", label: "Session Goal", placeholder: "e.g. Preparing for Google interview", type: "text", icon: <LuFileText size={15} />, required: false },
  ];

  return (
    <div style={{ width: "min(90vw, 460px)", padding: "40px 36px", background: "#0f0f0f", borderRadius: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
        <div style={{ width: 40, height: 40, background: "linear-gradient(135deg, #FF9324, #FCD760)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LuBrain size={20} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>New Session</h3>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>AI will generate 10 tailored questions</p>
        </div>
      </div>

      <form onSubmit={handleCreateSession} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {fields.map(({ key, label, placeholder, type, icon, required }) => (
          <div key={key}>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 6, letterSpacing: "0.02em" }}>
              {icon} {label} {required && <span style={{ color: "#FF9324" }}>*</span>}
            </label>
            <input
              type={type}
              value={formData[key]}
              onChange={e => handleChange(key, e.target.value)}
              placeholder={placeholder}
              style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "rgba(255,147,36,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
          </div>
        ))}

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px 14px", color: "#f87171", fontSize: 13 }}>
            {error}
          </div>
        )}

        {isLoading && (
          <div style={{ background: "rgba(255,147,36,0.08)", border: "1px solid rgba(255,147,36,0.15)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
            <LuSparkles size={15} style={{ color: "#FF9324" }} />
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Generating your personalized questions...</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{ background: isLoading ? "rgba(255,147,36,0.4)" : "linear-gradient(135deg, #FF9324, #FCD760)", border: "none", color: "#000", fontWeight: 700, fontSize: 14, padding: "13px 24px", borderRadius: 12, cursor: isLoading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 4, transition: "all 0.2s" }}
        >
          {isLoading ? (
            <><SpinnerLoader /> Generating...</>
          ) : (
            <><LuSparkles size={16} /> Generate Questions <LuArrowRight size={15} /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
