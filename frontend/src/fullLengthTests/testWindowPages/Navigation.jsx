import clock from "../../assets/clock.png";
import out from "../../assets/2of7.png";
import restore from "../../assets/restore.png";
import bookmark from "../../assets/bookmark.png";
import bookmarkFilled from "../../assets/bookmarkFilled.png";
import downloadIcon from "../../assets/download.png";


const Navigation = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Screen Layout and Navigation
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p className="flex items-center">
          For any timed section of the exam, you can see your time remaining for
          that section in the upper right corner by the
          <span className="mx-1">
            <img src={clock} alt="clock" width={30} className="inline" />
          </span>
          icon.
        </p>
        <p className="flex items-center">
          Just below the time remaining, you will see{" "}
          <span className="mx-1">
            <img src={out} alt="clock" width={70} className="inline" />
          </span>
          . This indicates that you are viewing the second of 7 questions or
          screens.
        </p>
        <p className="text-base">
          You can minimize the time remaining and the question number reminders
          by clicking on them. To restore them, click on the{" "}
          <img
            src={clock}
            alt="Clock icon"
            width={30}
            className="inline mx-1"
          />
          and
          <span className="">
            <img
              src={restore}
              alt="Restore icon"
              width={30}
              className="inline mx-1 "
            />
            icons. When you have five (5) minutes remaining, you will see an
            alert message notifying you of the time left in the section.
          </span>
        </p>
        <p className="text-base">
          You can bookmark a question for review by clicking the{" "}
          <img
            src={bookmark}
            alt="Clock icon"
            width={30}
            className="inline mx-1"
          />
          icon. When a question is bookmarked, the icon will be filled in:
          <span className="">
            <img
              src={bookmarkFilled}
              alt="Restore icon"
              width={30}
              className="inline mx-1 "
            />
            . Clicking the icon again will remove the bookmark.
          </span>
        </p>
        <div className="text-base">
          <p className="mb-2">
            On each screen, the navigation buttons and functions can be selected
            by:
          </p>
          <ul className="list-disc pl-5 space-y-1 ml-10">
            <li>Clicking the appropriate button with the mouse</li>
            <li>
              Using the Tab key to move through the options and pressing the
              space bar to select an option
            </li>
            <li>Using the shortcut keys (Alt + underlined shortcut letter)</li>
          </ul>
        </div>
     <p className="mt-8">
        
  <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecb] px-3 py-1 rounded mr-1 align-middle">
    <svg
      className="w-5 h-5 "
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
  provides access to the information in this tutorial, as well as specific testing and section instructions.
</p>
 <p className="mt-8 ">
  The{" "}
  <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecb] px-3 py-1 rounded mr-1 align-middle">
    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" />
    </svg>
    <span className="relative">
      <span className="border-b-2 border-white pb-[1px]">P</span>ause
    </span>
  </button>
  and{" "}
  <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecb] px-3 py-1 rounded mr-1 align-middle">
    <img
      src={downloadIcon}
      alt="Save Icon"
      className="w-5 h-5 mr-1 filter invert"
    />
    <span className="relative">
      <span className="border-b-2 border-white pb-[1px]">S</span>ave for Later
    </span>
  </button>
  buttons are available in the Data Insights, Quantitative, and Verbal section of the Practice Exams only, but are <strong>NOT</strong> available in the GMAT™ exam.
</p>

        {/* Styled Next Button in Content */}
        <p className="mt-8">
          Click{" "}
          <button className="group inline-flex items-center text-white text-sm font-medium bg-[#2d9ecbff] px-3 py-1 rounded ">
            <span className="relative">
              <span className="border-b-2 border-white pb-[1px]">N</span>ext
            </span>
            <div className="ml-2 w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-gray-100 transition-all duration-200">
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

export default Navigation;
