import React from "react";
import { ArrowRight, UserIcon } from "lucide-react";
import SearchYellowCardForm from "./forms/search-yellow-card";
import MainHeader from "./header/main-header";
import IMAGES from "@/assets/images";


const YellowCardHomePage = () => {

  return (
    <div className="bg-gradient-to-r from-primary/10  to-white min-h-screen app-container">
      {/* Header */}
      <MainHeader />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-center items-center p-20 gap-x-20">
        <div className="w-full space-y-4 text-center md:text-left">
          <span className="border border-primary text-primary px-3 py-1 rounded-full text-sm">
            Get cleared for your travels
          </span>
          <h2 className="text-2xl font-bold leading-tight sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight xl:text-[56px] xl:leading-[60px]">
            Get your yellow cards fast and seamlessly
          </h2>
          <div className="space-y-3 mt-10">
            <SearchYellowCardForm />
          </div>

          <div className="pt-20 w-full md:w-[260px]">
            <div className="border-t space-y-3">
              <p className="uppercase tracking-widest pt-5">
                Have you made payments?
              </p>
              <p className="font-bold flex items-center gap-x-6 justify-center md:justify-start">
                <span>Query a transaction</span> <ArrowRight />
              </p>
            </div>
          </div>
        </div>
        <div className="w-full self-center">
          <img
            src={IMAGES.yellowCardImage}
            alt="Yellow Card"
            className="rounded-[50px] h-[532.85px] mx-auto"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="p-12 mt-20">
        <h3 className="text-4xl font-bold text-center">How it works</h3>
        <div className="grid md:grid-cols-4 gap-6 mt-10">
          <div className="col-span-2">
            <div className="bg-[#09340D78] h-full overflow-hidden rounded-2xl shadow-md w-full">
            <img src={IMAGES.jim} alt="" className="w-full h-full" />
            </div>
          </div>
          <div className="bg-[#D3E5DB] border border-primary/50 rounded-2xl p-6 shadow-md space-y-10">
            <div className="flex justify-center items-center p-1 bg-primary w-fit rounded-lg">
              <UserIcon size={32} />
            </div>
            <h4 className="font-bold">Create an Account</h4>
            <p className="text-text">
              Setup your account by providing the necessary sign up credential.
              We would be able to that information to process your e-yellow
              card.
            </p>
          </div>
          <div className="bg-[#E4E9D2] border border-[#E0CC7C]/50 rounded-2xl p-6 shadow-md space-y-10">
            <div className="flex justify-center items-center p-1 bg-[#E0CC7C] w-fit rounded-lg">
              <UserIcon size={32} />
            </div>
            <h4 className="font-bold">
              Make Payment & Download the e-yellow card app
            </h4>
            <p className="text-text">
              Complete the required payment through the payment gateway. We
              would send you a payment receipt via email. You can go ahead to
              download the app and access your e-yellow card when ready
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YellowCardHomePage;
