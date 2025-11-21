"use client";

import React, { RefObject } from "react";
import { Scrollspy } from "@/components/ui/scrollspy";

interface IndexingSectionProps {
  lists: string[];
  ref: RefObject<HTMLDivElement | null>;
}

const IndexingSection = ({ lists, ref }: IndexingSectionProps) => {
  return (
    <Scrollspy
      offset={50}
      targetRef={ref}
      className="h-fit flex flex-col gap-2.5 border-l border-gray-200 "
    >
      {lists.map((list, index) => (
        <div
          key={index}
          className="relative text-gray-800 text-b-13-14-400 py-3 px-4 rounded-md data-[active=true]:text-primary cursor-pointer before:content-[''] before:absolute before:-left-1 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full  data-[active=true]:before:bg-primary"
          data-scrollspy-anchor={`${list}-${index}`}
        >
          {list}
        </div>
      ))}
    </Scrollspy>
  );
};

export default IndexingSection;
