import IMAGES from "@/assets/images";
import { Input } from "@/components/ui/input";
import React from "react";
import { useState } from "react";

interface UserDetails {
  passportNumber: string;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  stateOfOrigin: string;
  yellowCardNumber: string;
  vaccinations: { name: string; expiresOn: string }[];
  imageUrl: string;
}

const mockUser: UserDetails = {
  passportNumber: "A02737829",
  firstName: "Emmanuel",
  lastName: "Gambo",
  middleName: "John",
  age: 28,
  stateOfOrigin: "Nasarawa",
  yellowCardNumber: "A234568",
  vaccinations: [
    { name: "COVID-19", expiresOn: "2/10/2028" },
    { name: "Flu (influenza)", expiresOn: "2/10/2028" },
    { name: "Hepatitis A", expiresOn: "2/10/2028" },
    { name: "Hepatitis B", expiresOn: "2/10/2028" },
  ],
  imageUrl: IMAGES.jimPassport, // Replace with actual image URL
};

const UserQuery = () => {
  const [query, setQuery] = useState(mockUser.passportNumber);
  const [user] = useState<UserDetails | null>(mockUser);

  return (
    <div className="flex justify-center items-center w-full">
      <div className=" w-full p6 relative">
        <Input value={query} onChange={(e) => setQuery(e.target.value)} />

        {/* User Details */}
        {user && (
          <div className="mt-6">
            <h3 className="text-[#8E8E93] font-semibold text-sm">
              USER DETAILS
            </h3>

            <div className="w-full fle grid grid-cols-3 gap-10 justify- items-cente">
              <div className="w-full col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
                  <div className="text-gray-500 text-left text-sm pr-3">
                    First Name{" "}
                    <span className="border-r border-l px-2">LN</span>{" "}
                    <span>MN</span>{" "}
                  </div>
                  <div className="font-medium  text-right text-sm">
                    {user.firstName} {user.lastName} {user.middleName}
                  </div>
                </div>

                {/* Age */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" text-sm font-medium">Age</div>
                  <div className="text-gray-500 text-right text-sm">
                    {user.age}
                  </div>
                </div>

                {/* State of Origin */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" text-sm font-medium">State of Origin</div>
                  <div className="text-gray-500 text-right text-sm">
                    {user.stateOfOrigin}
                  </div>
                </div>

                {/* Passport Number */}
                <div className="grid grid-cols-2 gap-4">
                  <div className=" text-sm font-medium">Passport Number</div>
                  <div className="text-gray-500 text-right text-sm">
                    {user.passportNumber}
                  </div>
                </div>
              </div>
                <div className="w-full col-span-1 flex justify-end">
                <div className="bg-black w-32 h-32 rounded-lg overflow-hidden">
                  <img
                  src={user.imageUrl}
                  alt="User"
                  className="w-full h-full object-cover"
                  />
                </div>
                </div>
            </div>

            <div className="w-full border-t border-b border-dotted pb-5 mt-8 space-y-4">
              {/* Yellow Card Number */}
              <div className="flex justify-between pt-6">
                <p className=" text-sm">Yellow Card Number</p>
                <p className="text-gray-600 text-sm">{user.yellowCardNumber}</p>
              </div>

              <div className="flex justify-between">
                <p className=" text-sm">Vaccination</p>
                <p className="text-gray-600 text-sm">
                  <span className="text-primary font-semibold">
                    {"4"}/{user.vaccinations.length}
                  </span>{" "}
                  taken
                </p>
              </div>

              {/* Vaccination Details */}
              <ul className="space-y-1 text-sm text-gray-600">
                {user.vaccinations.map((vaccine, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-semibold">• {vaccine.name}</span>
                    <span className="text-red-600 text-xs font-semibold">
                      expires on{" "}
                      <span className="text-text font-normal">
                        {" "}
                        {vaccine.expiresOn}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Validation Text */}
            <div className="mt-10 flex gap-2 text-center justify-center text-xs text-gray-500">
              <img
                src={IMAGES.logo}
                alt="User"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div className="font-andale-mono max-w-[224px]">
                <p>The Port Health Office of the Federal Republic of Nigeria</p>
                <p>validates the above information</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-4 bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
              <img
                src={IMAGES.nYellowCardIcon}
                alt="Nigeria Flag"
                className="w-11 h-11"
              />
              <p className="text-sm font-bold">
                For more information, contact port health email
                <span className="font-normal"> ph.fmh.gov.ng</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuery;
