import { Button } from "@/components/ui/button";
import { useNavigation } from "@/utils/navigation";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  const { goBack } = useNavigation();
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto text-center">
          <h1 className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl">
            Sorry, the page not found
          </h1>
          <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
            It is looking like you may have taken a wrong turn. Don&apos;t
            worry... it
            <br className="hidden sm:inline-block" />
            happens to the best of us. Just click the button below to get back
            on track.
          </p>

          <Button
            className="mt-8 !px-4 !py-2 !rounded-full !w-fit"
            onClick={goBack}
          >
            <span className="flex gap-2 items-center">
              {" "}
              <span>Go Back</span>
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
