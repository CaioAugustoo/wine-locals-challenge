import { Restaurant } from "@/src/types";
import { useRouter } from "next/navigation";
import React from "react";
import { NewDishButton } from "./new-dish-button";

interface WrapperProps {
  children: React.ReactNode;
  restaurantId: Restaurant["id"];
  restaurantName: Restaurant["name"];
}

export const Wrapper = ({
  children,
  restaurantId,
  restaurantName,
}: WrapperProps) => {
  const { push } = useRouter();

  return (
    <div
      className="flex items-center justify-between gap-4"
      title={`Visitar restaurante "${restaurantName}"`}
    >
      <button
        onClick={() => push(`/restaurant/${restaurantId}`)}
        className="w-full text-left shadow-md duration-100 hover:-translate-y-1 hover:shadow-sm"
      >
        <div className="w-full rounded-md bg-slate-800 p-4">{children}</div>
      </button>

      <NewDishButton restaurantId={restaurantId} />
    </div>
  );
};
