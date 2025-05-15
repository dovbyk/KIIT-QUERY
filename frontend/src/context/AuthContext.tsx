import { User, UserRole } from "@/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

interface RegisterPayload {
  name: string;
  email: string;
  avatar: string;
  rollNumber: string;
  role: UserRole;
  communities: string[];
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Load user from localStorage on mount
  const storedUser = localStorage.getItem("currentUser");
  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const [currentUser, setCurrentUser] = useState<User | null>(initialUser);

  // useEffect(() => {
  //   console.log("Auth state updated:", {
  //     currentUser,
  //     isAuthenticated: !!currentUser,
  //   });

  //   if (currentUser) {
  //     localStorage.setItem("currentUser", JSON.stringify(currentUser));
  //   } else {
  //     localStorage.removeItem("currentUser");
  //   }
  // }, [currentUser]);

useEffect(() => {
  const fetchUser = async () => {
    try {
      console.log("lets see");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, {
        withCredentials: true, // Needed to send cookies
      });
            
      console.log("Just Checkin");
      setCurrentUser(res.data);
      console.log(res.data);
    } catch (err) {
      console.log("User not logged in");
    }
  };

  if (!currentUser) {
    fetchUser();
  }
}, []);


  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");

    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  // Register
  const register = async ({
    name,
    email,
    avatar,
    rollNumber,
    role,
    communities,
  }: RegisterPayload): Promise<boolean> => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
        {
          name,
          email,
          avatar,
          rollNumber,
          role,
          communities,
        }
      );

      if (response.status === 201) {
        const newUser = response.data;
        setCurrentUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        toast({
          title: "Registration Successful",
          description: `Welcome to KIIT Query Connect, ${newUser.name}!`,
        });

        return true;
      } else {
        toast({
          title: "Registration Failed",
          description: "An error occurred during registration.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "An error occurred while contacting the server.",
        variant: "destructive",
      });
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated: !!currentUser, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
