import React from "react";

const SetProfile: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg flex w-11/12 max-w-5xl">
        <div className="w-1/2 pr-6 hidden md:block">
          <img
            src="/vaccine.jpg" 
            alt="Vaccination"
            className="w-full h-full rounded-lg object-cover"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold">Let’s get to know you</h1>
          <p className="text-gray-600 mb-4">Enter the required data to get started</p>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Surname</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Akintade" />
              </div>
              <div>
                <label className="block text-sm font-medium">First Name</label>
                <input type="text" className="w-full p-2 border rounded" placeholder="Temitope" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input type="date" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input type="tel" className="w-full p-2 border rounded" placeholder="+234 (555) 000-0000" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="w-full p-2 border rounded" placeholder="olivia@untitledui.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">State of Residence</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Abuja, FCT" />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Enter your address" />
            </div>
            <div>
              <label className="block text-sm font-medium">Passport Number</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="1234567890" />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetProfile;
