import downloadIcon from "../../assets/download.png";
const Differences = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Differences between GMAT Official Practice Exams and the GMAT
          <sup>TM</sup> Exam
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          Optional break screens are not timed in GMAT Official Practice EXAMS,
          but are timed in the GMAT<sup>TM</sup> exam. For more information
          about the length of optional breaks, refer to www.mba.com. During the
          actual GMAT<sup>TM</sup> exam, if you exceed the time allowed for an
          optional break, the extra time used will be deducted from the time
          available to complete the next section of the exam.
        </p>
        <p>
          The{" "}
          <span>
            <button className=" group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-2 rounded">
              <img
                src={downloadIcon}
                alt="Save Icon"
                className="w-5 h-5 mr-2 filter invert"
              />
              <span className="relative">
                <span className="border-b-2 border-white pb-[1px]">S</span>ave
                for Later
              </span>
            </button>
          </span>{" "}
          button is available in the practice exams, but not available during
          the GMAT<sup>TM</sup> exam.
        </p>

        <p>
          The{" "}
          <span>
            <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-2 rounded">
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
          </span>{" "}
          button is available in the practice exams, but not available during
          the GMAT<sup>TM</sup> exam.
        </p>
        <p>
          After completing the GMAT Official Practice Exam, you will see section
          scores for the Data Insights, Quantitative Reasoning, and Verbal
          Reasoning sections.
        </p>
        <p>
          Keep in mind that the GMAT Official Practice Exams are meant to
          illustrate GMAT content and are not accurate predictors of performance
          on the GMAT<sup>TM</sup> exam.
        </p>
        <p>
          <span className="font-bold block">Please note:</span> If you are
          planning on taking the GMAT<sup>TM</sup> exam delivered online, there
          are additional steps you need to take to help ensure your computer
          meets the minimum requirements and to help ensure you have a smooth
          testing experience.
        </p>
        <p>
          For more information, please visit Plan for Exam Day for the GMAT<sup>TM</sup> exam delivered on mba.com.
        </p>
        <p>
            The browser back button will not work during practice exams. Use the save for Later option to navigate out of the exam.
        </p>
        {/* Styled Next Button in Content */}
        <p className="mt-8">
          Click{" "}
          <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-1 rounded">
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">N</span>ext
            </span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center ">
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
          </button>{" "}
          to continue.
        </p>
      </div>
    </div>
  );
};

export default Differences;
