// Importing required modules and components
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router components for navigation
import "katex/dist/katex.min.css";
import { SnackbarProvider } from "./components/SnackbarProvider";
// Public pages
import Home from "./pages/home.jsx";
import LoginPage from "./components/login.jsx";
import GmatCoursesSection from "./pages/gmat.jsx";
import GreCoursesSection from "./pages/gre.jsx";
import AboutPage from "./pages/about.jsx";
import ContactUs from "./pages/contact.jsx";
import TestimonialsPage from "./pages/testimonials.jsx";
import GMATCoursePage from "./pages/GmatCoursePage.jsx";
import GMATFocusFormat from "./pages/knowgmat.jsx";

// Full Length Test (FLT) related pages
import FLTHome from "./fullLengthTests/FLTHome";
import TestWindow from "./fullLengthTests/TestWindow.jsx";
import NotFound from "./fullLengthTests/pages/NotFound.js";

// Admin pages for test management
import QuantPage from "./admin/vaultPages/QuantPage.jsx";
import VerbalPage from "./admin/vaultPages/VerbalPage.jsx";
import DataInsightPage from "./admin/vaultPages/DataInsightPage.jsx";
import DataInsightsUploadPage from "./admin/uploadInterface/DataInsightsUploadPage.jsx";
import QuantitativeUploadPage from "./admin/uploadInterface/quant/QuantitativeUploadPage.jsx";
import DataSufficiencyUploadPage from "./admin/dataInsightStructures/DataSufficiencyUploadPage.jsx";
import VerbalReasoningStructure from "./admin/verbalStructure/VerbalReasoningStructure.jsx";

// Admin: Data Insight Question Structures
import MultiSourceStructure from "./admin/dataInsightStructures/MultiSourceStructure.jsx";
import TableAnalysisStructure from "./admin/dataInsightStructures/TableAnalysisStructure.jsx";
import GraphicsInterpretationStructure from "./admin/dataInsightStructures/GraphicsInterpretationStructure.jsx";
import TwoPartAnalysisStructure from "./admin/dataInsightStructures/TwoPartAnalysisStructure.jsx";

// Admin: Other sections
import Admin from "./admin/Admin.jsx";
import QuestionVault from "./admin/vault/QuestionVault.jsx";
import AssessmentManager from "./admin/assessments/AssessmentManager.jsx";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";

function App() {
  return (
    <>
      {/* Setting up the Router */}
      <SnackbarProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} /> {/* Homepage */}
            <Route path="/login" element={<LoginPage />} />{" "}
            {/* User login page */}
            <Route path="/gmat" element={<GmatCoursesSection />} />{" "}
            <Route path="/gmat-course-page" element={<GMATCoursePage />} />{" "}
            {/* GMAT courses list */}
            <Route path="/gre" element={<GreCoursesSection />} />{" "}
            {/* GRE courses list */}
            <Route path="/about" element={<AboutPage />} />{" "}
            {/* About us page */}
            <Route path="/contact" element={<ContactUs />} />{" "}
            {/* Contact page */}
            <Route path="/testimonials" element={<TestimonialsPage />} />{" "}
            <Route path="/gmatcourse1" element={<GMATCoursePage />} />{" "}
            {/* Specific GMAT course details */}
            <Route path="/full-length-test" element={<GMATFocusFormat />} />{" "}
            {/* GMAT exam format details */}
            {/* FLT (Full Length Test) routes */}
            <Route path="/flt" element={<FLTHome />} /> {/* FLT homepage */}
            <Route path="/test-window" element={<TestWindow />} />{" "}
            {/* Test-taking window */}
            {/* Admin dashboard routes */}
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <Admin />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Admin dashboard */}
            {/* Admin: Vault pages */}
            <Route
              path="/question-vault"
              element={
                <AdminProtectedRoute>
                  <QuestionVault />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Question bank */}
            {/* Assessment storage */}
            <Route
              path="/assessment-manager"
              element={
                <AdminProtectedRoute>
                  <AssessmentManager />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Manage Quant questions */}
            <Route
              path="/quant"
              element={
                <AdminProtectedRoute>
                  <QuantPage />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Manage Verbal questions */}
            <Route
              path="/verbal"
              element={
                <AdminProtectedRoute>
                  <VerbalPage />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Manage Data Insight section */}
            <Route
              path="/data-insight"
              element={
                <AdminProtectedRoute>
                  <DataInsightPage />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Verbal: Upload pages */}
            <Route
              path="/verbal/verbal-upload-page"
              element={
                <AdminProtectedRoute>
                  <VerbalReasoningStructure />
                </AdminProtectedRoute>
              }
            />
            {/* Data Insight: Upload pages */}
            <Route
              path="/data-insight/data-insight-upload-page"
              element={
                <AdminProtectedRoute>
                  <DataInsightsUploadPage />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="/quant/quantitative-upload-page"
              element={
                <AdminProtectedRoute>
                  <QuantitativeUploadPage />
                </AdminProtectedRoute>
              }
            />
            {/* Data Insight: Structures */}
            <Route
              path="/multi-source"
              element={
                <AdminProtectedRoute>
                  <MultiSourceStructure />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Multi-source reasoning format */}
            <Route
              path="/table-analysis"
              element={
                <AdminProtectedRoute>
                  <TableAnalysisStructure />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Table analysis format */}
            <Route
              path="/graphics-interpretation"
              element={
                <AdminProtectedRoute>
                  <GraphicsInterpretationStructure />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Graphics interpretation format */}
            <Route
              path="/two-part-analysis"
              element={
                <AdminProtectedRoute>
                  <TwoPartAnalysisStructure />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Two-part analysis format */}
            <Route
              path="/data-sufficiency-upload-page"
              element={
                <AdminProtectedRoute>
                  <DataSufficiencyUploadPage />
                </AdminProtectedRoute>
              }
            />{" "}
            {/* Data sufficiency format */}
            {/* Catch-all route for undefined pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </>
  );
}
export default App;
