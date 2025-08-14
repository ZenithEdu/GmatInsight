import React from "react";

const ProfilePage = () => {
  return (
    <section className="px-6 md:px-16 lg:px-12 mt-8">
      <div className="bg-white border border-gray-300 p-6  max-w-3xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-800 mb-4">
          Your Profile
        </h2>

        <div className="space-y-1 text-[16px]">
          <div
            style={{
              borderTop: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              padding: "10px 5px",
              backgroundColor: "#F9F9F9",
            }}
          >
            <span className="text-gray-800 text-lg">GMAC Test Prep</span>
          </div>

          <div
            style={{
              padding: "0px 5px",
              paddingBottom: "15px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span className="block text-gray-600 uppercase text-sm">
              First Name:
            </span>
            <span className="text-gray-800 font-bold">Vishal</span>
          </div>

          <div
            style={{
              padding: "0px 5px",
              paddingBottom: "15px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span className="block text-gray-600 uppercase text-sm">
              Last Name:
            </span>
            <span className="text-gray-800 font-bold">Kumar</span>
          </div>

          <div
            style={{
              padding: "0px 5px",
              paddingBottom: "15px",
              borderBottom: "1px solid #ccc",
            }}
          >
            <span className="block text-gray-600 uppercase text-sm">
              Email:
            </span>
            <span className="text-gray-800 font-bold">
              vishalzenith47@gmail.com
            </span>
          </div>

          <div
            style={{
              padding: "0px 5px",
            }}
          >
            <span className="block text-gray-600 uppercase text-sm">
              TimeFactor:
            </span>
          </div>

          <div className="border border-gray-300 p-4 space-y-3">
            <div className="text-xl text-gray-800 font-medium">
              Accommodations
            </div>

            <span className="text-gray-600 text-sm uppercase">
              MANAGE ACCOMMODATIONS
            </span>

            <p className="text-gray-600 text-lg">
              To enter an accommodation code, select "Manage Accomodations".
            </p>

            <button
              className="px-5 py-2 text-white uppercase text-lg"
              style={{
                backgroundColor: "#393636",
              }}
            >
              Manage Accommodations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;