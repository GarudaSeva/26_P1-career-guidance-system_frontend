import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Briefcase, GraduationCap, DollarSign, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import rolesData from "@/data/roles.json";

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = rolesData.find(
  (r) =>
    r.job_title.toLowerCase() ===
    decodeURIComponent(id as string).toLowerCase()
);

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Career Not Found</h1>
          <Button onClick={() => navigate("/careers")}>Back to Careers</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/careers")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{role.job_title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{role.description}</p>

          {/* Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Role Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{role.roles_and_overview}</p>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Skills Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {role.skills_required.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Educational Requirements */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Educational Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {role.educational_requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Duties and Responsibilities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Duties and Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {role.duties_and_responsibilities.map((duty, idx) => (
                  <li key={idx}>{duty}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Salary Range */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Salary Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-primary">{role.salary_range}</p>
            </CardContent>
          </Card>

          {/* Top Companies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Top Companies Offering This Role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {role.top_companies_offering_this_role.map((company, idx) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {company}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CareerDetail;
