import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { mockUser, UserDetails } from "@/data/mock-user";
import IMAGES from "@/assets/images";
import AppModal from "@/components/common/modal";
import AssignYellowCard from "./assign-y-card";
AssignYellowCard;
export default function QueryUser({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<UserDetails | null>(mockUser);

  const [isOpenAssignYCard, setOpenAssignYCard] = React.useState(false);

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setUser(null);
      return;
    }
    setQuery(query);
    const foundUser =
      mockUser.passportNumber.toLowerCase() == query.toLowerCase()
        ? mockUser
        : null;

    if (foundUser) {
      setUser(foundUser);
    } else {
      setUser(null);
    }
  };

  return (
    <>
      <div className="-mt-6">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search by Reference number, Passport Number or name, NIN"
          className="w-full bg-background"
          // value={query}
          // onChange={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {/* Display UI based on search results */}
        {!query.trim() ? (
          // Default UI when no query is entered
          <div className="h-[500px] w-full flex flex-col items-center justify-center text-[#10192899]/60">
            <img src={IMAGES.pendingBlock} className="w-24 h-24" alt="" />
            <h2 className="text-base font-semibold text-center">
              Search for a user
            </h2>
            <p className="text-sm text-center">
              Your search result will appear here if we have their records
            </p>
          </div>
        ) : user ? (
          // Display user details if a user is found
          <div className="flex justify-center items-center w-full ">
            <div className="w-full p6 relative">
              {/* User Details */}
              <div className="mt-6">
                <h3 className="text-[#8E8E93] font-semibold text-sm">
                  USER DETAILS
                </h3>

                <div className="w-full grid grid-cols-3 gap-10 justify-center items-center">
                  <div className="w-full col-span-2">
                    <div className="grid grid-cols-2 gap-4 mb-4 mt-6">
                      <div className="text-gray-500 text-left text-sm pr-3">
                        First Name{" "}
                        <span className="border-r border-l px-2">LN</span>{" "}
                        <span>MN</span>{" "}
                      </div>
                      <div className="font-medium text-right text-sm">
                        {user.firstName} {user.lastName} {user.middleName}
                      </div>
                    </div>

                    {/* Age */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-sm font-medium">Age</div>
                      <div className="text-gray-500 text-right text-sm">
                        {user.age}
                      </div>
                    </div>

                    {/* State of Origin */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-sm font-medium">State of Origin</div>
                      <div className="text-gray-500 text-right text-sm">
                        {user.stateOfOrigin}
                      </div>
                    </div>

                    {/* Passport Number */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm font-medium">Passport Number</div>
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
                    <p className="text-sm">Yellow Card Number</p>
                    <p
                      className="text-gray-600 text-sm cursor-pointer"
                      onClick={() => {
                        setOpenAssignYCard(true);
                        // onClose();
                      }}
                    >
                      Not Assigned{" "}
                      <span className="text-primary font-semibold underline">
                        Assign Now
                      </span>
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm">Vaccination</p>
                    <p className="text-gray-600 text-sm">
                      <span className="text-primary font-semibold">
                        {"0"}/{user.vaccinations.length}
                      </span>{" "}
                      <span className="text-primary font-semibold underline">
                        Update
                      </span>
                    </p>
                  </div>

                  {/* Vaccination Details */}
                </div>

                {/* Contact Information */}
                <div className="mt-4 bg-[#F4F4F4] p-3 rounded-md flex items-center gap-2">
                  <img
                    src={IMAGES.nYellowCardIcon}
                    alt="Nigeria Flag"
                    className="w-11 h-11"
                  />
                  <p className="text-[12px] flex flex-col">
                    <span className="font-bold text-danger">
                      Void this Card
                    </span>
                    This is an irreversible action that must be confirmed with
                    your password
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // No user found UI
          <div className="h-[500px] w-full flex flex-col items-center justify-center text-[#10192899]/60">
            <img src={IMAGES.noResultBlock} className="w-24 h-24" alt="" />
            <h2 className="text-base font-semibold text-center">
              No result found!
            </h2>
            <p className="text-sm text-center">
              Invalid or non existent user details provided.
              <br />
              We don’t have this user in our database, please try again
            </p>
          </div>
        )}
      </div>

      <AppModal
        open={isOpenAssignYCard}
        setOpen={setOpenAssignYCard}
        title="ASSIGN YELLOW CARD NUMBER"
        className="sm:max-w-[567px] bg-white"
      >
        <AssignYellowCard onClose={() => setOpenAssignYCard(false)} />
      </AppModal>
    </>
  );
}
