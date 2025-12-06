// src/pages/Profile.tsx
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const storedUser = sessionStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("http://localhost:5000/get-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();
      if (data.profile) setProfile(data.profile);
    };

    if (user?.email) fetchUserData();
  }, [user?.email]);

  if (!profile) {
    return (
      <div className="text-center mt-40 text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <Card className="shadow-lg p-6 rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">
              Your Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-5 text-lg">
            <p><strong>Email: </strong>{profile.email}</p>
            <p><strong>Age: </strong>{profile.age || "Not Provided"}</p>
            <p><strong>Gender: </strong>{profile.gender || "Not Provided"}</p>
            <p><strong>Weekly Study Hours: </strong>{profile.weeklyStudyHours || "Not Provided"}</p>
            <p><strong>Absence Days: </strong>{profile.absenceDays || "Not Provided"}</p>
            <p><strong>Part-Time Job: </strong>{profile.partTimeJob || "No"}</p>
            <p><strong>Extracurricular Activities: </strong>{profile.extracurricularActivities || "Not Provided"}</p>

            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.skills ? (
                  profile.skills.split(",").map((skill: string, i: number) => (
                    <Badge key={i} className="bg-green-200 text-green-900 px-2 py-1">
                      {skill.trim()}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </div>
            </div>

            <div>
              <strong>Interests:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.interests ? (
                  profile.interests.split(",").map((intr: string, i: number) => (
                    <Badge key={i} className="bg-blue-200 text-blue-900 px-2 py-1">
                      {intr.trim()}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500">None</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => window.location.href = '/ProfileForm'}>
            Edit Profile
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
