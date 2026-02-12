import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllPujas, deletePuja } from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PoojaAdminPage = () => {
  const [pujas, setPujas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPujas = async () => {
      const pujas = await getAllPujas();
      setPujas(pujas);
    };
    fetchPujas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this puja?")) {
      await deletePuja(id);
      setPujas(pujas.filter((puja) => puja._id !== id));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 py-2 px-4 text-sm rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-muted"><ArrowLeft size={16} /> Back</button>
        <h1 className="text-3xl font-bold">Manage Pujas</h1>
        <Button asChild>
          <Link to="/admin/pujas/new">Add New Puja</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pujas.map((puja) => (
            <TableRow key={puja._id}>
              <TableCell>{puja.name}</TableCell>
              <TableCell>{puja.price}</TableCell>
              <TableCell>{puja.duration}</TableCell>
              <TableCell>
                <Button asChild variant="outline" className="mr-2">
                  <Link to={`/admin/pujas/edit/${puja._id}`}>Edit</Link>
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(puja._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PoojaAdminPage;
