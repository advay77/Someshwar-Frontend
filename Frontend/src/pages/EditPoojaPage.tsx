import React from "react";
import PoojaForm from "../components/PoojaForm";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EditPoojaPage() {
  const navigate = useNavigate();
  return (
    <div className="mx-auto px-4 py-8">
      <button onClick={()=>navigate(-1)} className="flex items-center gap-2 py-2 px-4 text-sm rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-muted"><ArrowLeft size={16}/> Back</button>
      <PoojaForm />
    </div>
  );
}
