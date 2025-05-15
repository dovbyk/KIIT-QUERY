import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCommunities } from "@/context/CommunityContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRole } from "@/types";

const Register = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [role, setRole] = useState<UserRole>("student");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [googleInfo, setGoogleInfo] = useState({ name: "", email: "", avatar: "" });

  const { register } = useAuth();
  const { communities } = useCommunities();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const avatar = params.get("avatar") || "";
    setGoogleInfo({ name, email, avatar });
  }, [location.search]);

  const handleCommunityChange = (communityId: string, checked: boolean) => {
    if (checked) {
      setSelectedCommunities((prev) => [...prev, communityId]);
    } else {
      setSelectedCommunities((prev) => prev.filter((id) => id !== communityId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!rollNumber.trim()) {
      alert("Please enter your Roll Number.");
      return;
    }

    if (selectedCommunities.length === 0) {
      alert("Please select at least one community.");
      return;
    }

    setIsLoading(true);

    const success = await register({
      name: googleInfo.name,
      email: googleInfo.email,
      avatar: googleInfo.avatar,
      rollNumber,
      role,
      communities: selectedCommunities,
    });

    setIsLoading(false);

    if (success) {
      console.log("Registration successful, redirecting to feed");
      setTimeout(() => navigate("/feed"), 500);
    }
  };

  return (
    <div className="container max-w-md mx-auto py-12">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Complete Registration</CardTitle>
          <CardDescription>
            Choose your role and communities to get started.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                placeholder="Enter your Roll Number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label>I am a:</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label>Select Communities</Label>
              <div className="grid gap-2">
                {communities.map((community) => (
                  <div key={community.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`community-${community.id}`}
                      checked={selectedCommunities.includes(community.id)}
                      onCheckedChange={(checked) =>
                        handleCommunityChange(community.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`community-${community.id}`}>{community.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </Button>
            <p className="mt-4 text-center text-sm">
              Already registered?{" "}
              <Link to="/feed" className="text-accent underline">
                Go to Feed
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
