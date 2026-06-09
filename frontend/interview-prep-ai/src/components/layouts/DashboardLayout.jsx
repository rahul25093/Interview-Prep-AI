import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb" }}>
      <Navbar />
      <main className="container mx-auto px-4 md:px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
