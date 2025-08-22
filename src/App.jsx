// Importing required modules and components
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router components for navigation

// Public pages
import Home from "./pages/home.jsx";
import LoginPage from "./components/login.jsx";
import GmatCoursesSection from "./pages/gmat.jsx";
import GreCoursesSection from "./pages/gre.jsx";
import AboutPage from "./pages/about.jsx";
import ContactUs from "./pages/contact.jsx";
import TestimonialsPage from "./pages/testimonials.jsx";
import TestimonialPage from "./components/oneTestimonial.jsx";
import GMATCoursePage from "./pages/gmat1.jsx";
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

// Admin: Data Insight Question Structures
import MultiSourceStructure from "./admin/dataInsightStructures/MultiSourceStructure.jsx";
import TableAnalysisStructure from "./admin/dataInsightStructures/TableAnalysisStructure.jsx";
import GraphicsInterpretationStructure from "./admin/dataInsightStructures/GraphicsInterpretationStructure.jsx";
import TwoPartAnalysisStructure from "./admin/dataInsightStructures/TwoPartAnalysisStructure.jsx";
import DataSufficiencyStructure from "./admin/dataInsightStructures/DataSufficiencyStructure.jsx";

// Admin: Other sections
import Admin from "./admin/Admin.jsx";
import QuestionVault from "./admin/vault/QuestionVault.jsx";
import VerbalReasoningStructure from "./admin/verbalStructure/VerbalReasoningStructure.jsx";
import AssessmentVault from "./admin/vault/AssessmentVault.jsx";

function App() {
  return (
    <>
      {/* Setting up the Router */}
      <BrowserRouter>
        <Routes>

            {/* Public routes */}
          <Route path="/" element={<Home />} /> {/* Homepage */}
          <Route path="/login" element={<LoginPage />} /> {/* User login page */}
          <Route path="/gmat" element={<GmatCoursesSection />} /> {/* GMAT courses list */}
          <Route path="/gre" element={<GreCoursesSection />} /> {/* GRE courses list */}
          <Route path="/about" element={<AboutPage />} /> {/* About us page */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact page */}
          <Route path="/testimonials" element={<TestimonialsPage />} /> {/* All testimonials */}
          <Route path="/user1" element={<TestimonialPage />} /> {/* Single testimonial view */}
          <Route path="/gmatcourse1" element={<GMATCoursePage />} /> {/* Specific GMAT course details */}
          <Route path="/knowgmat" element={<GMATFocusFormat />} /> {/* GMAT exam format details */}

          {/* FLT (Full Length Test) routes */}
          <Route path="/flt" element={<FLTHome />} /> {/* FLT homepage */}
          <Route path="/test-window" element={<TestWindow />} /> {/* Test-taking window */}

          {/* Admin dashboard routes */}
          <Route path="/admin" element={<Admin />} /> {/* Admin dashboard */}
          {/* Admin: Vault pages */}
          <Route path="/question-vault" element={<QuestionVault />} /> {/* Question bank */}
          <Route path="/assessment-vault" element={<AssessmentVault />} /> {/* Assessment storage */}
          {/* Admin: Question management */}
          <Route path="/quant" element={<QuantPage />} /> {/* Manage Quant questions */}
          <Route path="/verbal" element={<VerbalPage />} /> {/* Manage Verbal questions */}
          <Route path="/data-insight" element={<DataInsightPage />} /> {/* Manage Data Insight section */}

          {/* Verbal: Upload pages */}
          <Route path="/verbal-upload-page" element={<VerbalReasoningStructure />} />
          {/* Data Insight: Upload pages */}
          <Route
            path="/data-insight-upload-page"
            element={<DataInsightsUploadPage />}
          /> 

          {/* Data Insight: Structures */}
          <Route path="/multi-source" element={<MultiSourceStructure />} /> {/* Multi-source reasoning format */}
          <Route path="/table-analysis" element={<TableAnalysisStructure />} /> {/* Table analysis format */}
          <Route
            path="/graphics-interpretation"
            element={<GraphicsInterpretationStructure />}
          /> {/* Graphics interpretation format */}
          <Route
            path="/two-part-analysis"
            element={<TwoPartAnalysisStructure />}
          /> {/* Two-part analysis format */}
          <Route
            path="/data-sufficiency"
            element={<DataSufficiencyStructure />}
          /> {/* Data sufficiency format */}


          {/* Catch-all route for undefined pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
