import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Welcome, <span className="text-primary">{user || "Guest"}</span>!
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Choose your path to personalized career guidance
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* School Bot Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">School Bot</CardTitle>
                <CardDescription className="text-base">
                  Connecting school to your future
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Link your current academic learning to future career opportunities. Discover how school subjects connect to professions and develop your study skills.
                </p>
                <Button 
                  className="w-full group-hover:scale-105 transition-transform"
                  onClick={() => navigate("/chat", { state: { mode: "basic" } })}
                >
                  Start School Guidance
                </Button>
              </CardContent>
            </Card>

            {/* Career Bot Card */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Career Bot</CardTitle>
                <CardDescription className="text-base">
                  Build career development skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Develop essential communication, time management, networking, and personal branding skills for a successful professional journey.
                </p>
                <Button 
                  className="w-full group-hover:scale-105 transition-transform"
                  onClick={() => navigate("/chat", { state: { mode: "advanced" } })}
                >
                  Start Career Guidance
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
