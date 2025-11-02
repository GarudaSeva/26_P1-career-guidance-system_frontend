import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Message = {
  role: "user" | "bot";
  content: string;
  isCareerCard?: boolean;
  careerData?: any;
};

type ChatMode = "initial" | "basic" | "advanced";
type BasicStep = "gender" | "job" | "absence" | "extracurricular" | "study_hours" | "scores" | "complete";
type AdvancedStep = "skills" | "interests" | "top_k" | "complete";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hi! 👋 I'm your AI Career Assistant. Are you a school student (below 12th) or a college student/professional?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<ChatMode>("initial");
  const [basicStep, setBasicStep] = useState<BasicStep>("gender");
  const [advancedStep, setAdvancedStep] = useState<AdvancedStep>("skills");
  const [basicData, setBasicData] = useState<any>({});
  const [advancedData, setAdvancedData] = useState<any>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: "user" | "bot", content: string, careerData?: any) => {
    setMessages((prev) => [...prev, { role, content, isCareerCard: !!careerData, careerData }]);
  };

  const handleBasicMode = async (userInput: string) => {
    const lowerInput = userInput.toLowerCase();

    switch (basicStep) {
      case "gender":
        const gender = lowerInput.includes("male") && !lowerInput.includes("female") ? 1 : 0;
        setBasicData((prev: any) => ({ ...prev, gender }));
        setBasicStep("job");
        addMessage("bot", "Do you have a part-time job? (yes/no)");
        break;

      case "job":
        const partTimeJob = lowerInput.includes("yes") ? 1 : 0;
        setBasicData((prev: any) => ({ ...prev, part_time_job: partTimeJob }));
        setBasicStep("absence");
        addMessage("bot", "How many days were you absent last month?");
        break;

      case "absence":
        const absenceDays = parseInt(userInput) || 0;
        setBasicData((prev: any) => ({ ...prev, absence_days: absenceDays }));
        setBasicStep("extracurricular");
        addMessage("bot", "Do you participate in extracurricular activities? (yes/no)");
        break;

      case "extracurricular":
        const extracurricular = lowerInput.includes("yes") ? 1 : 0;
        setBasicData((prev: any) => ({ ...prev, extracurricular_activities: extracurricular }));
        setBasicStep("study_hours");
        addMessage("bot", "How many hours do you study weekly?");
        break;

      case "study_hours":
        const studyHours = parseInt(userInput) || 0;
        setBasicData((prev: any) => ({ ...prev, weekly_self_study_hours: studyHours }));
        setBasicStep("scores");
        addMessage(
          "bot",
          "Please enter your subject scores separated by commas in this order: Math, History, Physics, Chemistry, Biology, English, Geography"
        );
        break;

      case "scores":
        const scores = userInput.split(",").map((s) => parseInt(s.trim()) || 0);
        if (scores.length !== 7) {
          addMessage("bot", "Please provide exactly 7 scores separated by commas.");
          return;
        }
        const finalData = {
          ...basicData,
          math_score: scores[0],
          history_score: scores[1],
          physics_score: scores[2],
          chemistry_score: scores[3],
          biology_score: scores[4],
          english_score: scores[5],
          geography_score: scores[6],
        };

        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:5000/basic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          });
          const data = await response.json();
          
          addMessage("bot", "Based on your profile, here's my recommendation:", data);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get career recommendations. Please try again.",
            variant: "destructive",
          });
          addMessage("bot", "I encountered an error. Please try again or contact support.");
        }
        setIsLoading(false);
        setBasicStep("complete");
        break;
    }
  };

  const handleAdvancedMode = async (userInput: string) => {
    switch (advancedStep) {
      case "skills":
        setAdvancedData((prev: any) => ({ ...prev, skills: userInput }));
        setAdvancedStep("interests");
        addMessage("bot", "What are your main interests? (e.g., Data Science, AI, Web Development)");
        break;

      case "interests":
        setAdvancedData((prev: any) => ({ ...prev, interests: userInput }));
        setAdvancedStep("top_k");
        addMessage("bot", "How many career recommendations would you like? (default is 5)");
        break;

      case "top_k":
        const topK = parseInt(userInput) || 5;
        const finalData = {
          ...advancedData,
          top_k: topK,
        };

        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:5000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(finalData),
          });
          const data = await response.json();
          
          if (data.recommendations && Array.isArray(data.recommendations)) {
            data.recommendations.forEach((career: any) => {
              addMessage("bot", `Here's a career option for you:`, career);
            });
          } else {
            addMessage("bot", "Based on your profile, here are your career recommendations:", data);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get career recommendations. Please try again.",
            variant: "destructive",
          });
          addMessage("bot", "I encountered an error. Please try again or contact support.");
        }
        setIsLoading(false);
        setAdvancedStep("complete");
        break;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    addMessage("user", userInput);
    setInput("");

    if (mode === "initial") {
      const lowerInput = userInput.toLowerCase();
      if (lowerInput.includes("school")) {
        setMode("basic");
        addMessage("bot", "Great! Let's start with some questions. What is your gender? (male/female)");
      } else if (lowerInput.includes("college") || lowerInput.includes("professional")) {
        setMode("advanced");
        addMessage("bot", "Perfect! Let's begin. What are your key skills? (e.g., Python, SQL, Machine Learning)");
      } else {
        addMessage("bot", "Please specify if you're a school student or college/professional.");
      }
    } else if (mode === "basic") {
      await handleBasicMode(userInput);
    } else if (mode === "advanced") {
      await handleAdvancedMode(userInput);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-24 pb-8 max-w-4xl">
        <div className="bg-card rounded-lg shadow-[var(--shadow-medium)] h-[calc(100vh-180px)] flex flex-col">
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-semibold">Career Discovery Chat</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Let's find your perfect career path together
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {message.isCareerCard ? (
                  <Card className="max-w-lg p-6 bg-accent/50 border-primary/20">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {message.careerData?.career_title || message.careerData?.Career || "Career Recommendation"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {message.careerData?.description || message.careerData?.Description || "No description available"}
                    </p>
                    {message.careerData?.pay_scale && (
                      <div className="mb-3">
                        <span className="text-sm font-medium">Pay Scale: </span>
                        <Badge variant="secondary">{message.careerData.pay_scale}</Badge>
                      </div>
                    )}
                    {message.careerData?.skills && (
                      <div className="mb-3">
                        <span className="text-sm font-medium mb-2 block">Required Skills:</span>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(message.careerData.skills) 
                            ? message.careerData.skills 
                            : message.careerData.skills.split(",")
                          ).map((skill: string, i: number) => (
                            <Badge key={i} variant="outline" className="bg-primary/10">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {message.careerData?.skill_gap && (
                      <div>
                        <span className="text-sm font-medium mb-2 block">Skills to Develop:</span>
                        <div className="flex flex-wrap gap-2">
                          {(Array.isArray(message.careerData.skill_gap)
                            ? message.careerData.skill_gap
                            : message.careerData.skill_gap.split(",")
                          ).map((skill: string, i: number) => (
                            <Badge key={i} variant="destructive" className="bg-destructive/20 text-destructive">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ) : (
                  <div
                    className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                      message.role === "user"
                        ? "bg-[hsl(var(--chat-user-bg))] text-foreground border border-border"
                        : "bg-[hsl(var(--chat-bot-bg))] text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-[hsl(var(--chat-bot-bg))] text-primary-foreground rounded-2xl px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-border">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
