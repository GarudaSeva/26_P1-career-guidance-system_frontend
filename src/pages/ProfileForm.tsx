import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    email: "",
    gender: "",
    age: "",
    partTimeJob: "",
    absenceDays: "",
    extracurricularActivities: "",
    weeklyStudyHours: "",
    mathScore: "",
    historyScore: "",
    physicsScore: "",
    chemistryScore: "",
    biologyScore: "",
    englishScore: "",
    geographyScore: "",
    skills: "",
    interests: "",
  });

  // Set logged user email
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user.email) {
      setFormData((prev: any) => ({ ...prev, email: user.email }));
    }
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/save-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.result) {
        setResult(data.result);
        toast({ title: "Profile & Recommendation Saved 🎯" });
        navigate("/home");
      }
    } catch (error) {
      toast({ title: "Error saving profile & recommendations", variant: "destructive" });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-10 bg-gray-50">
      <Card className="p-8 w-full max-w-2xl space-y-6 shadow-lg border border-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold text-center text-primary">Complete Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Gender Dropdown */}
          <select
            name="gender"
            onChange={handleChange}
            className="appearance-none border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800
                       focus:ring-2 focus:ring-primary transition cursor-pointer"
          >
            <option value="">Select Gender</option>
            <option value="male" className="p-3">Male</option>
            <option value="female" className="p-3">Female</option>
          </select>

          <Input
            name="age"
            placeholder="Age"
            onChange={handleChange}
            className="rounded-lg"
          />

          {/* School student section */}
          {parseInt(formData.age) <= 17 && formData.age !== "" && (
            <>
              <select
                name="partTimeJob"
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800
                           focus:ring-2 focus:ring-primary transition cursor-pointer"
              >
                <option value="">Do you have part-time job?</option>
                <option value="1" className="p-3">Yes</option>
                <option value="0" className="p-3">No</option>
              </select>

              <Input name="absenceDays" placeholder="Absence Days in a month ?" onChange={handleChange} />

              <select
                name="extracurricularActivities"
                onChange={handleChange}
                className="appearance-none border border-gray-300 rounded-lg p-3 w-full bg-white text-gray-800
                           focus:ring-2 focus:ring-primary transition cursor-pointer"
              >
                <option value="">Extracurricular Activities?</option>
                <option value="1" className="p-3">Yes</option>
                <option value="0" className="p-3">No</option>
              </select>

              <Input name="weeklyStudyHours" placeholder="Weekly Study Hours ?" onChange={handleChange} />

              <h3 className="font-semibold">Academic Scores</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input name="mathScore" placeholder="Mathematics" onChange={handleChange} />
                <Input name="historyScore" placeholder="History" onChange={handleChange} />
                <Input name="physicsScore" placeholder="Physics" onChange={handleChange} />
                <Input name="chemistryScore" placeholder="Chemistry" onChange={handleChange} />
                <Input name="biologyScore" placeholder="Biology" onChange={handleChange} />
                <Input name="englishScore" placeholder="English" onChange={handleChange} />
                <Input name="geographyScore" placeholder="Geography" onChange={handleChange} />
              </div>
            </>
          )}

          {/* Advanced (college/professional) section */}
          {parseInt(formData.age) >= 18 && formData.age !== "" && (
            <>
              <Input name="skills" placeholder="Skills (Python, ML)" onChange={handleChange} className="rounded-lg" />
              <Input name="interests" placeholder="Interests (AI, WebDev)" onChange={handleChange} className="rounded-lg" />
            </>
          )}

          <Button className="w-full mt-4 rounded-lg" type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Get Recommendations"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileForm;
