"use client";

import { Heading } from "@/src/components";
import { useFindRestaurantByIdQuery } from "@/src/hooks";
import { useParams } from "next/navigation";

export default function Restaurant() {
  const params = useParams();
  const { data } = useFindRestaurantByIdQuery(params.id);

  if (!data) {
    return null;
  }

  return (
    <Heading title={data.name} description={`${data.totalDishes} pratos`} />
  );
}
