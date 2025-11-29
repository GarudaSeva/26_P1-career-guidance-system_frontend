import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Lightbulb, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBackground from "@/assets/hero-bg.jpg";
import collaborationImg from "@/assets/collaboration.jpg";
import careerGrowthImg from "@/assets/career-growth.jpg";

const Index = () => {
  // ✅ Check login state from sessionStorage
  const user = sessionStorage.getItem("user");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section with Background */}
      <section 
        className="relative flex-1 pt-32 pb-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">AI-Powered Career Guidance</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect
              <span className="text-primary block mt-2">Career Path with AI</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Smart recommendations tailored to your skills, interests, and ambitions. 
              Let our AI guide you to the career that matches your unique potential.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={user ? "/home" : "/auth"}>
                <Button size="lg" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/careers">
                <Button size="lg" variant="outline">
                  Explore Careers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-accent/30 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose <span className="text-primary">AI Career Discovery</span>?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Matching</h3>
              <p className="text-muted-foreground">
                AI analyzes your profile to recommend careers that truly fit your strengths and interests
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Skill Gap Analysis</h3>
              <p className="text-muted-foreground">
                Identify missing skills and get personalized learning recommendations to bridge the gap
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Growth Insights</h3>
              <p className="text-muted-foreground">
                Understand salary trends, demand, and growth potential for your recommended careers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
              Our AI-powered platform makes career discovery simple and effective
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src={collaborationImg} 
                  alt="Professional collaboration" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Tell Us About Yourself</h3>
                      <p className="text-muted-foreground">
                        Share your skills, interests, education, and career aspirations through our interactive chatbot
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                      <p className="text-muted-foreground">
                        Our advanced AI processes your information and matches it with thousands of career paths
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Get Personalized Results</h3>
                      <p className="text-muted-foreground">
                        Receive tailored career recommendations with detailed insights, skill gaps, and learning paths
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Growth Section */}
      <section className="bg-accent/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Your Career <span className="text-primary">Growth Journey</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Whether you're a student exploring options or a professional looking to pivot, our platform provides the insights and guidance you need to succeed.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <strong className="text-foreground">For Students:</strong>
                      <span className="text-muted-foreground ml-1">
                        Connect your academic subjects to real-world careers and plan your educational path
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <strong className="text-foreground">For Professionals:</strong>
                      <span className="text-muted-foreground ml-1">
                        Identify skill gaps, explore career transitions, and access development resources
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div>
                      <strong className="text-foreground">Data-Driven Insights:</strong>
                      <span className="text-muted-foreground ml-1">
                        Access salary trends, job market demand, and growth potential for every recommended career
                      </span>
                    </div>
                  </li>
                </ul>
                <Link to={user ? "/home" : "/auth"}>
                  <Button size="lg">Get Started Today</Button>
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <img 
                  src={careerGrowthImg} 
                  alt="Career growth illustration" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-primary/5 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover Your <span className="text-primary">Perfect Career</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students and professionals who have found their ideal career path with AI guidance
            </p>
            <Link to={user ? "/home" : "/auth"}>
              <Button size="lg" className="group">
                Start Your Journey Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
