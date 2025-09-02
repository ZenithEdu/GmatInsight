import { useState } from "react";
import GmatLogo from "../assets/Gmat_FullLength_Logo.png";
import FaqPage from "./FaqPage";
import ProfilePage from "./ProfilePage";

const handleStartTest = () => {
  window.open('/test-window', '_blank', 'noopener,noreferrer');
};

const FLTHome = () => {
  const [activeTab, setActiveTab] = useState("HOME");
  
  const navItems = ["HOME", "FREQUENTLY ASKED QUESTIONS", "PROFILE", "LOGOUT"];

  return (
    <div style={{ backgroundColor: "#F9F9F9" }} className="min-h-screen">
      {/* Header */}
      <header className="w-full px-3">
        <div className="flex items-start ml-9" style={{ height: "100px" }}>
          <img
            src={GmatLogo}
            alt="GMAT Official Practice Logo"
            className="h-full object-contain"
          />
        </div>
        <div className="w-full border-b border-gray-300 mt-[15px]" />
      </header>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-end space-x-2 mt-3 mb-4 px-5">
        {navItems.map((label) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            className={`relative text-white px-5 py-[7px] ${
              activeTab === label
                ? "bg-[#393636] hover:bg-[#3c3737]"
                : "bg-[#393636] hover:bg-[#3c3737]"
            }`}
          >
            {activeTab === label && (
              <span className="absolute inset-0 border border-black -m-1" />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        ))}
      </nav>

      {/* Page Body */}
      <div className="px-6 md:px-16 lg:px-4">
        {activeTab === "HOME" && <HomePage />}
        {activeTab === "FREQUENTLY ASKED QUESTIONS" && <FaqPage />}
        {activeTab === "PROFILE" && <ProfilePage />}
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <section className="px-6 md:px-8 lg:px-10">
      <p className="text-lg mb-6">
        You are logged in as:{" "}
        <strong style={{ fontWeight: "650" }}>Vishal Kumar</strong>
      </p>

      <div className="flex space-x-1 ml-2">
        <button className="border border-gray-300 px-5 py-2 bg-white text-lg">
          Practice Tests
        </button>
      </div>

      <div className="bg-white border border-gray-300 p-4 space-y-6 text-[15px]">
        {/* Start */}
        <div>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Start
          </div>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 w-1/2 text-lg">Test</th>
                <th className="p-2 w-[160px] text-lg">Expires</th>
                <th className="p-2 w-[80px] text-center text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 text-lg">
                  GMAT™ Official Practice Exam 2
                </td>
                <td className="p-2 border border-gray-300 text-lg">—</td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="text-white uppercase"
                    style={{
                      backgroundColor: "#3567B1",
                      fontSize: "18px",
                      minWidth: "60px",
                      width: "100%",
                      padding: "7px 9px",
                    }}
                      onClick={handleStartTest}

                  >
                    Start Test
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* In Progress */}
        <div>
          <div className="text-lg font-semibold text-gray-700 mb-2">
            In Progress
          </div>
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2 w-1/2 text-lg">Test</th>
                <th className="p-2 w-[160px] text-lg">Modified On</th>
                <th className="p-2 w-[80px] text-center text-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border border-gray-300 text-lg">
                  GMAT™ Official Practice Exam 1
                </td>
                <td className="p-2 border border-gray-300 text-lg">
                  7/15/2025
                </td>
                <td className="p-2 border border-gray-300 text-center">
                  <button
                    className="text-white uppercase"
                    style={{
                      backgroundColor: "#3567B1",
                      fontSize: "18px",
                      minWidth: "60px",
                      width: "100%",
                      padding: "7px 0",
                    }}
                  >
                    Resume Test
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FLTHome;