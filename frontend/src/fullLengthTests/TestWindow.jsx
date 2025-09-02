import React, { useState } from "react";
import Introduction from "./testWindowPages/Introduction";
import Nondisclosure from "./testWindowPages/Nondisclosure";
import Differences from "./testWindowPages/Differences";
import Tutorial from "./testWindowPages/Tutorial";
import downloadIcon from "../assets/download.png";
import Navigation from "./testWindowPages/Navigation";
import ExamQuestions from "./testWindowPages/ExamQuestions";
import ReviewEdit from "./testWindowPages/ReviewEdit";
import TestingRules from "./testWindowPages/TestingRules";
import TimingAndBreaks from "./testWindowPages/TimingAndBreaks";
import SelectOrder from "./order/SelectOrder";
import DataInsightInstructions from "./testWindowPages/DataInsightInstructions";
const TestWindow = () => {
  const [step, setStep] = useState("introduction");

  const handleNext = () => {
    if (step === "introduction") {
      setStep("nondisclosure");
    } else if (step === "nondisclosure") {
      setStep("differences");
    } else if (step === "differences") {
      setStep("tutorial");
    } else if (step === "tutorial") {
      setStep("navigation");
    } else if (step === "navigation") {
      setStep("examQuestions");
    } else if (step === "examQuestions") {
      setStep("reviewEdit");
    } else if (step === "reviewEdit") {
      setStep("timingAndBreaks");
    } else if (step === "timingAndBreaks") {
      setStep("testingRules");
    } else if (step === "testingRules") {
      setStep("selectOrder");
    } else if (step === "selectOrder") {
      setStep("dataInsightInstructions");
    }
  };

  const handlePrevious = () => {
    if (step === "testingRules") {
      setStep("timingAndBreaks");
    } else if (step === "timingAndBreaks") {
      setStep("reviewEdit");
    } else if (step === "reviewEdit") {
      setStep("examQuestions");
    } else if (step === "examQuestions") {
      setStep("navigation");
    } else if (step === "navigation") {
      setStep("tutorial");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Header Bar */}
      <div className="bg-[#4a3f3fff] text-white px-6 py-4 shrink-0 flex items-center justify-between">
        <h1 className="text-xl font-medium">
          GMAT™ Official Practice Exam 2 - Vishal Kumar
        </h1>
        {step === "selectOrder" && (
        <svg
          className="w-6 h-6 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-12.25a.75.75 0 00-1.5 0v4a.75.75 0 00.329.623l2.5 1.667a.75.75 0 10.832-1.246L10.75 9.5V5.75z"
            clipRule="evenodd"
          />
        </svg>
        )}
      </div>

      {/* Blue Strip */}
      <div className="bg-[#2d9ecbff] h-8 w-full shrink-0" />

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto py-8 bg-white ">
        {step === "introduction" && <Introduction />}
        {step === "nondisclosure" && <Nondisclosure />}
        {step === "differences" && <Differences />}
        {step === "tutorial" && <Tutorial />}
        {step === "navigation" && <Navigation />}
        {step === "examQuestions" && <ExamQuestions />}
        {step === "reviewEdit" && <ReviewEdit />}
        {step === "timingAndBreaks" && <TimingAndBreaks />}
        {step === "testingRules" && <TestingRules />}
        {step === "selectOrder" && <SelectOrder />}
        {step === "dataInsightInstructions" && <DataInsightInstructions />}
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-[#2d9ecbff] px-6 py-3 flex justify-between items-center shrink-0">
        <div className="flex items-center space-x-6">
          {/* Help */}
          {(step === "introduction" ||
            step === "nondisclosure" ||
            step === "differences") && (
            <button className="flex items-center text-white text-lg font-medium hover:text-gray-200 transition-colors">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75l-.9.92C12.45
                12.9 12 13.5 12 15h-2v-.5c0-1 .45-1.5 1.07-2.08l1.2-1.2c.37-.36.73-.86.73-1.42
                0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79
                4 4c0 .88-.36 1.68-.93 2.25z"
                />
              </svg>
              <span className="relative">
                <span className="border-b-2 border-white pb-[1px]">H</span>elp
              </span>
            </button>
          )}
          {/* Pause */}
          <button className="flex items-center text-white text-lg font-medium hover:text-gray-200 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
            </svg>
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">P</span>ause
            </span>
          </button>

          {/* Save for Later */}
          <button className="flex items-center text-white text-lg font-medium hover:text-gray-200 transition-colors">
            <img
              src={downloadIcon}
              alt="Save Icon"
              className="w-5 h-5 mr-2 filter invert"
            />
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">S</span>ave for
              Later
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          {/* Previous Button - Only show if not on first page */}
          {(step === "navigation" ||
            step === "examQuestions" ||
            step === "reviewEdit" ||
            step === "timingAndBreaks" ||
            step === "testingRules") && (
            <button
              onClick={handlePrevious}
              className="group flex items-center text-white text-lg font-medium hover:text-gray-200 transition-colors"
            >
              <span className="relative">
                <span className="border-b-2 border-white pb-[1px]">P</span>
                revious
              </span>
            </button>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="group flex items-center text-white text-lg font-medium hover:text-gray-200 transition-colors"
          >
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">N</span>ext
            </span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center transition-all duration-200 group-hover:bg-gray-100">
              <svg
                className="w-4 h-4 text-[#2d9ecbff]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestWindow;
