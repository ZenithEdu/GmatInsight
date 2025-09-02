const TimingAndBreaks = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Timing and Optional Breaks{" "}
        </h2>
      </div>

      <div className="max-w-8xl mx-auto space-y-6 text-md leading-relaxed mt-8">
        <p>
          You will have one (1) optional break, which you may take after the
          first section OR after the second section. If you take your break
          after the first section, you will not have the option to take another
          break after the second section.{" "}
          <span className="font-bold italic">
            Please note the breaks in the GMAT Official Practice Exams are not
            timed. However, they will be timed in the GMAT™ Exam.
          </span>
        </p>
        <div>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You can take up to 10 minutes for your break. If you have a
              break-related accommodation, you may be approved for an additional
              10-minute break.
            </li>
            <li>Your camera must remain on during the entire break.</li>
            <li>
              The break time includes the time required to re-check into the
              exam. Please keep this in mind as you plan your break.
            </li>
            <li>
              If you exceed the allotted time, the extra time will be deducted
              from the next exam section.
            </li>
            <li>
              If you are taking an online exam and using an approved physical
              erasable whiteboard, it must be completely erased and shown to the
              camera before you leave for break, and you must leave the
              whiteboard at your workstation during the break.
            </li>
          </ul>
        </div>

        <p>
          <strong>As a reminder:</strong> Your break time includes the time to
          re-check in with the Test Administrator. If you exceed the allotted
          break time, the extra time will be deducted from the next section.
          During your break, you are NOT allowed to change any settings on the
          computer you are using or access any electronic devices, including
          cell phones and smartwatches.
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

export default TimingAndBreaks;
