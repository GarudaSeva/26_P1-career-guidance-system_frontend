import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Home = () => {
  const navigate = useNavigate();
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [recommendations, setRecommendations] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:5000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      console.log("Fetched user data:", data);
      if (data.recommendations) setRecommendations(data.recommendations);
    };

    if (user?.email) fetchUserData();
  }, [user?.email]);

  // PIE CHART DATA
  const pieChartData = {
    labels: recommendations.map((r) => r.career_opportunity),
    datasets: [
      {
        data: recommendations.map((r) => (r.similarity * 100).toFixed(0)),
        backgroundColor: ["#4f46e5", "#0d9488", "#f59e0b", "#ef4444", "#8b5cf6"],
      },
    ],
  };

  // BAR CHART DATA
  const barChartData = {
    labels: recommendations.map((r) => r.career_opportunity),
    datasets: [
      {
        label: "Skills You Have",
        data: recommendations.map((r) => {
          const matched = r.matched_skills?.length || 0;
          const total = matched + (r.skill_gap?.length || 0);
          return total > 0 ? ((matched / total) * 100) : 0;
        }),
        backgroundColor: "rgba(16, 185, 129, 0.8)",
      },
      {
        label: "Skills You Need",
        data: recommendations.map((r) => {
          const gap = r.skill_gap?.length || 0;
          const matched = r.matched_skills?.length || 0;
          const total = matched + gap;
          return total > 0 ? ((gap / total) * 100) : 0;
        }),
        backgroundColor: "rgba(239, 68, 68, 0.8)",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-12">
        {/* CHARTS SECTION */}
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          
          {/* Pie Chart */}
<Card className="w-full md:w-1/2 h-[380px] shadow-xl p-4 flex flex-col">
  <CardHeader>
    <CardTitle className="text-center">Career Match Analysis</CardTitle>
  </CardHeader>

  <CardContent className="flex-grow flex justify-between items-center gap-4">
    {/* Actual Pie Chart */}
    <div className="w-56 h-56 flex justify-center items-center">
      <Doughnut 
        data={pieChartData} 
        options={{
          plugins: { legend: { display: false } }   // hide default legend
        }} 
      />
    </div>

    {/* Custom Legend on Right */}
    <div className="flex flex-col gap-2 text-sm">
      {recommendations.map((r, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: pieChartData.datasets[0].backgroundColor[index] }}
          ></div>
          <span className="font-medium capitalize">{r.career_opportunity}</span>
        </div>
      ))}
    </div>
  </CardContent>
</Card>


          {/* Bar Chart */}
          <Card className="w-full md:w-1/2 h-[380px] shadow-xl p-2 flex flex-col">
            <CardHeader>
              <CardTitle className="text-center">Skills You Have vs Need</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex justify-center items-center">
              <Bar
                data={barChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                  scales: { y: { beginAtZero: true, max: 100 } },
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* RECOMMENDATIONS SECTION BELOW */}
        <h2 className="text-3xl font-bold mb-6 text-center">
          Your Career Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {recommendations.map((rec, index) => (
    <Card
      key={index}
      className="shadow-lg p-6 rounded-2xl border hover:shadow-2xl transition-all"
    >
      {/* TITLE + MATCH SIDE BY SIDE */}
      <div className="flex justify-between items-center mb-2">
        <CardTitle className="text-2xl font-extrabold text-primary capitalize">
          {rec.career_opportunity}
        </CardTitle>

        <div className="bg-blue-600 text-white font-bold text-lg px-4 py-2 rounded-xl text-center leading-tight">
          {(rec.similarity * 100).toFixed(0)}%
          <div className="text-xs font-semibold">Match</div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-base text-gray-700 mb-3 leading-relaxed">
        {rec.description}
      </p>

      {/* PAY SCALE */}
      <Badge className="mb-4 bg-purple-600 text-white text-sm px-3 py-1 w-fit">
        {rec.pay_scale}
      </Badge>

      {/* SKILLS SECTION */}
      <div className="mb-2">
        <span className="font-bold text-lg mr-2">Skills:</span>
        <span className="flex flex-wrap gap-2">
          {rec.matched_skills?.length > 0 ? (
            rec.matched_skills.map((skill: string, i: number) => (
              <Badge key={i} className="bg-green-200 text-green-900 px-2 py-1 rounded-md text-sm">
                {skill}
              </Badge>
            ))
          ) : (
            <span className="text-gray-500">None</span>
          )}
        </span>
      </div>

      {/* SKILL GAPS SECTION */}
      <div className="mb-4">
        <span className="font-bold text-lg mr-2">Skill Gaps:</span>
        <span className="flex flex-wrap gap-2">
          {rec.skill_gap?.map((skill: string, i: number) => (
            <Badge key={i} className="bg-red-200 text-red-900 px-2 py-1 rounded-md text-sm">
              {skill}
            </Badge>
          ))}
        </span>
      </div>

      {/* BUTTON BOTTOM RIGHT */}
      <div className="flex justify-end">
        <Button
          className="px-5 py-2 text-sm font-semibold rounded-md bg-primary hover:bg-primary/80"
          onClick={() =>
  navigate(`/careers/${encodeURIComponent(rec.career_opportunity)}`, {
    state: { rec }
  })
}
        >
          See Details
        </Button>
      </div>
    </Card>
  ))}
</div>


        <div className="mt-10 flex justify-center gap-4">
          <Button onClick={() => navigate("/chat")}>Open Chat</Button>
          <Button variant="outline" onClick={() => navigate("/ProfileForm")}>Update Profile</Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
