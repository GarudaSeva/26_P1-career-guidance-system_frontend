import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import rolesData from "@/data/roles.json";

const Careers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoles = rolesData.filter(
    (role) =>
      role.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedRoles = searchQuery ? filteredRoles : rolesData.slice(0, 9);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Explore <span className="text-primary">Career Opportunities</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
            Discover detailed information about various career paths and find
            the perfect role for you
          </p>

     <div className="relative max-w-2xl mx-auto mb-12">
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-900 h-5 w-5" />
  <Input
    type="text"
    placeholder="Search by job title or keywords..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-10 h-12 text-base border border-green-600 focus-visible:ring-0 focus:outline-none"
  />
</div>


          {/* Results */}
          {displayedRoles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">No records found</p>
              <p className="text-muted-foreground mt-2">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 max-w-6xl mx-auto">
              {displayedRoles.map((role) => (
                <Card
                  key={role?.id}
                  className="hover:shadow-lg transition-shadow "
                >
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold mb-2">
                      <span className="inline-block px-3 rounded-md bg-[#A2B35E] text-[#2D3A00]">
                        {role.job_title}
                      </span>
                    </CardTitle>

                    <CardDescription className="line-clamp-2 text-md mt-4">
                      {role.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm font-semibold mb-2">Key Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.skills_required.slice(0, 3).map((skill, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                        {role.skills_required.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{role.skills_required.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link
  to={`/careers/${encodeURIComponent(role.job_title)}`}
  className="text-green-600 font-medium hover:underline text-sm"
>
  Read More →
</Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
