import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
            Welcome <span className="text-primary">{user || "Guest"}</span>
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

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is AI Career Discovery?</AccordionTrigger>
                  <AccordionContent>
                    AI Career Discovery is an intelligent platform that helps students and professionals find the best career paths based on their skills, interests, academic performance, and personal traits using advanced AI algorithms.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the School Bot help students?</AccordionTrigger>
                  <AccordionContent>
                    The School Bot analyzes your academic performance across subjects, study habits, and extracurricular activities to recommend careers that align with your strengths and interests. It helps you understand how your current subjects connect to future professions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What does the Career Bot offer?</AccordionTrigger>
                  <AccordionContent>
                    The Career Bot provides personalized career recommendations for college students and professionals based on your existing skills and interests. It identifies skill gaps and suggests multiple career opportunities with similarity scores to help you make informed decisions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is my data secure and private?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we take data privacy seriously. All your personal information, academic records, and career preferences are stored securely and used only to provide personalized recommendations. We never share your data with third parties without your consent.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I get multiple career recommendations?</AccordionTrigger>
                  <AccordionContent>
                    Yes! The Career Bot for college students and professionals can provide multiple career recommendations (typically 3-5 options) ranked by similarity to your profile. You can choose how many recommendations you'd like to receive.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>What is skill gap analysis?</AccordionTrigger>
                  <AccordionContent>
                    Skill gap analysis identifies the difference between your current skills and the skills required for your target career. Our platform highlights which skills you need to develop or acquire to be successful in your chosen career path.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>How accurate are the career recommendations?</AccordionTrigger>
                  <AccordionContent>
                    Our AI model is trained on extensive career data and uses advanced machine learning algorithms to provide highly accurate recommendations. The system considers multiple factors including academic performance, skills, interests, and industry trends to suggest the best matches.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>Can I explore different career options?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely! Our Careers page features a comprehensive database of career roles across various industries. You can search, filter, and explore detailed information about different careers including job descriptions, required skills, salary ranges, and top hiring companies.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>Do I need technical skills to use this platform?</AccordionTrigger>
                  <AccordionContent>
                    No technical skills are required! Our platform is designed to be user-friendly and intuitive. Simply answer the chatbot's questions naturally, and the AI will guide you through the process to provide personalized career recommendations.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-10">
                  <AccordionTrigger>How often should I use the career guidance tools?</AccordionTrigger>
                  <AccordionContent>
                    We recommend using the tools whenever you're considering career decisions, developing new skills, or experiencing changes in your interests. For students, checking in each semester can help track your career path alignment. Professionals may benefit from quarterly reviews to ensure continued career growth.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
