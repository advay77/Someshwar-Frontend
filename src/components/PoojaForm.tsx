import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPuja, createPuja, updatePuja } from "@/utils/api";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const PoojaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [puja, setPuja] = useState({
    name: "",
    nameHindi: "",
    price: 0,
    duration: "",
    description: "",
    benefits: [],
    requirements: [],
    constrains: [],
    mode: [],
    temples: [],
    image: "",
  });

  useEffect(() => {
    if (id) {
      const fetchPuja = async () => {
        const pujaData = await getPuja(id);
        setPuja(pujaData);
      };
      fetchPuja();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPuja((prevPuja) => ({
      ...prevPuja,
      [name]: value,
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const newValues = [...puja[field]];
    newValues[index] = e.target.value;
    setPuja((prevPuja) => ({
      ...prevPuja,
      [field]: newValues,
    }));
  };

  const addArrayItem = (field) => {
    setPuja((prevPuja) => ({
      ...prevPuja,
      [field]: [...prevPuja[field], ""],
    }));
  };

  const handleRemoveArrayItem = (index, field) => {
    const newValues = [...puja[field]];
    newValues.splice(index, 1);
    setPuja((prevPuja) => ({
      ...prevPuja,
      [field]: newValues,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updatePuja(id, puja);
    } else {
      await createPuja(puja);
    }
    navigate("/admin/pujas");
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{id ? "Edit Puja" : "Create Puja"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={puja.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="nameHindi">Name (Hindi)</Label>
          <Input
            id="nameHindi"
            name="nameHindi"
            value={puja.nameHindi}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={puja.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={puja.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={puja.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Benefits</Label>
          {puja.benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={benefit}
                onChange={(e) => handleArrayChange(e, index, "benefits")}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveArrayItem(index, "benefits")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("benefits")}>
            Add Benefit
          </Button>
        </div>
        <div>
          <Label>Requirements</Label>
          {puja.requirements.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={requirement}
                onChange={(e) => handleArrayChange(e, index, "requirements")}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveArrayItem(index, "requirements")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("requirements")}>
            Add Requirement
          </Button>
        </div>
        <div>
          <Label>Constrains</Label>
          {puja.constrains.map((constrain, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={constrain}
                onChange={(e) => handleArrayChange(e, index, "constrains")}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveArrayItem(index, "constrains")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("constrains")}>
            Add Constrain
          </Button>
        </div>
        <div>
          <Label>Mode</Label>
          {puja.mode.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={item}
                onChange={(e) => handleArrayChange(e, index, "mode")}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveArrayItem(index, "mode")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("mode")}>
            Add Mode
          </Button>
        </div>
        <div>
          <Label>Temples</Label>
          {puja.temples.map((temple, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={temple}
                onChange={(e) => handleArrayChange(e, index, "temples")}
              />
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleRemoveArrayItem(index, "temples")}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={() => addArrayItem("temples")}>
            Add Temple
          </Button>
        </div>
        {/* <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            name="image"
            value={puja.image}
            onChange={handleChange}
          />
        </div> */}
        <Button type="submit">{id ? "Update" : "Create"}</Button>
      </form>
    </div>
  );
};

export default PoojaForm;
