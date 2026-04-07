"use client";

import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";

export default function BookingFormWrapper() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || undefined;
  return <BookingForm defaultService={service} />;
}
