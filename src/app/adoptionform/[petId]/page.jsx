import React from "react";
import AdoptionFormComponent from "@/components/AdoptionFormComponent/page";

export default async function AdoptionFormPage({ params: { petId } }) {
  return <AdoptionFormComponent petId={petId} />;
}
