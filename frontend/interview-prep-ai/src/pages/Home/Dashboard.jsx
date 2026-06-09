import { useEffect, useState } from "react";
import { LuPlus, LuLayoutGrid, LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-hot-toast";

import DashboardLayout from "../../components/layouts/DashboardLayout";
import SummaryCard from "../../components/Cards/SummaryCard";
import Modal from "../../components/Modal";
import CreateSessionForm from "./CreateSessionForm";
import DeleteAlertContent from "../../components/Loader/DeleteAlertContent";
import { CARD_BG } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data || []);
    } catch (error) {
      console.error("Error fetching session data:", error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success("Session deleted successfully");
      setOpenDeleteAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      toast.error("Failed to delete session");
    }
  };

  useEffect(() => { fetchAllSessions(); }, []);

  const filtered = sessions.filter(s =>
    s.role?.toLowerCase().includes(search.toLowerCase()) ||
    s.topicsToFocus?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-6 pb-10 px-4 md:px-0">
        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <LuLayoutGrid size={18} style={{ color: "#FF9324" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#FF9324", letterSpacing: "0.08em", textTransform: "uppercase" }}>My Sessions</span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
              Interview Prep Dashboard
            </h1>
            <p style={{ fontSize: 14, color: "#6b7280", marginTop: 4 }}>
              {sessions.length} session{sessions.length !== 1 ? "s" : ""} ready for practice
            </p>
          </div>

          {/* Search */}
          <div style={{ position: "relative", minWidth: 260 }}>
            <LuSearch size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search sessions..."
              style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none", background: "#fff", color: "#111", boxSizing: "border-box", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "#FF9324"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "#fff", borderRadius: 20, border: "2px dashed #e5e7eb" }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, rgba(255,147,36,0.1), rgba(252,215,96,0.1))", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <LuLayoutGrid size={28} style={{ color: "#FF9324" }} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 8 }}>
              {search ? "No sessions found" : "No sessions yet"}
            </h3>
            <p style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>
              {search ? "Try a different search term" : "Create your first interview session to get started"}
            </p>
            {!search && (
              <button
                onClick={() => setOpenCreateModal(true)}
                style={{ background: "linear-gradient(135deg, #FF9324, #FCD760)", border: "none", color: "#000", fontWeight: 700, fontSize: 14, padding: "12px 28px", borderRadius: 50, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <LuPlus size={16} /> Create First Session
              </button>
            )}
          </div>
        )}

        {/* Session grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || "_"}
              questions={data?.questions?.length || "_"}
              description={data?.description || ""}
              lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpenCreateModal(true)}
        style={{ position: "fixed", bottom: 32, right: 32, background: "linear-gradient(135deg, #FF9324, #FCD760)", border: "none", color: "#000", fontWeight: 700, fontSize: 14, padding: "14px 24px", borderRadius: 50, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(255,147,36,0.4)", zIndex: 50, transition: "all 0.2s" }}
        onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,147,36,0.55)"; }}
        onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,147,36,0.4)"; }}
      >
        <LuPlus size={18} /> New Session
      </button>

      <Modal isOpen={openCreateModal} onClose={() => setOpenCreateModal(false)} hideHeader>
        <CreateSessionForm />
      </Modal>

      <Modal isOpen={openDeleteAlert?.open} onClose={() => setOpenDeleteAlert({ open: false, data: null })} title="Delete Session">
        <div style={{ width: "min(90vw, 420px)" }}>
          <DeleteAlertContent content="Are you sure you want to delete this session?" onDelete={() => deleteSession(openDeleteAlert?.data)} />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashboard;