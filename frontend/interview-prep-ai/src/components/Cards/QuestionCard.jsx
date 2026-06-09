import { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({ question, answer, onLearnMore, isPinned, onTogglePin }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      setHeight(contentRef.current.scrollHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  return (
    <div
      style={{ background: "#fff", borderRadius: 16, marginBottom: 12, overflow: "hidden", border: isPinned ? "1.5px solid rgba(255,147,36,0.35)" : "1.5px solid #f3f4f6", transition: "all 0.2s", boxShadow: isExpanded ? "0 8px 32px rgba(0,0,0,0.07)" : "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div style={{ padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 14 }}>
        {/* Q badge */}
        <div style={{ flexShrink: 0, width: 28, height: 28, background: isPinned ? "linear-gradient(135deg, #FF9324, #FCD760)" : "#f9fafb", border: isPinned ? "none" : "1.5px solid #e5e7eb", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: isPinned ? "#000" : "#6b7280", marginTop: 1 }}>
          Q
        </div>

        {/* Question text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            onClick={() => setIsExpanded(p => !p)}
            style={{ fontSize: 14, fontWeight: 500, color: "#111", lineHeight: 1.55, cursor: "pointer", margin: 0 }}
          >
            {question}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {/* Pin */}
          <button
            type="button"
            onClick={onTogglePin}
            title={isPinned ? "Unpin" : "Pin"}
            style={{ background: isPinned ? "rgba(255,147,36,0.1)" : "#f9fafb", border: isPinned ? "1px solid rgba(255,147,36,0.3)" : "1px solid #e5e7eb", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: isPinned ? "#FF9324" : "#9ca3af", display: "flex", alignItems: "center", transition: "all 0.15s" }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "#FF9324"; e.currentTarget.style.color = "#FF9324"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = isPinned ? "rgba(255,147,36,0.3)" : "#e5e7eb"; e.currentTarget.style.color = isPinned ? "#FF9324" : "#9ca3af"; }}
          >
            {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
          </button>

          {/* Learn More */}
          <button
            type="button"
            onClick={() => { setIsExpanded(true); onLearnMore?.(); }}
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.2)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: "#0891b2", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, transition: "all 0.15s", whiteSpace: "nowrap" }}
            onMouseOver={e => { e.currentTarget.style.background = "rgba(6,182,212,0.14)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "rgba(6,182,212,0.08)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.2)"; }}
          >
            <LuSparkles size={13} />
            <span className="hidden md:inline">Learn More</span>
          </button>

          {/* Expand toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(p => !p)}
            style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center", transition: "all 0.15s" }}
          >
            <LuChevronDown size={16} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
          </button>
        </div>
      </div>

      {/* Answer */}
      <div style={{ maxHeight: `${height}px`, overflow: "hidden", transition: "max-height 0.3s ease-in-out" }}>
        <div ref={contentRef} style={{ margin: "0 18px 16px", background: "#f9fafb", borderRadius: 12, padding: "14px 16px", borderLeft: "3px solid #FF9324" }}>
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
