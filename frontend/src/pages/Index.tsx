
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Index = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  useScrollAnimation();
  
  useEffect(() => {
    console.log("Index page rendered with auth state:", { isAuthenticated, currentUser });
  }, [isAuthenticated, currentUser]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-gradient-primary drop-shadow-[0_4px_12px_rgba(61,77,139,0.27)]">
        KIIT
      </h1>

      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-foreground/80">
        A platform for KIIT University students to connect with teachers,
        ask academic queries, and receive expert solutions.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {!isAuthenticated ? (
          <>
            <Button size="lg" variant="outline" className="font-bold px-8 shadow-lg border-accent" onClick={() => {  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
}}>
              Login
            </Button>
          </>
        ) : (
          <Button 
            size="lg" 
            className="btn-primary font-bold px-8 shadow-lg" 
            onClick={() => {
              console.log("Navigating to feed from index");
              navigate("/feed");
            }}
          >
            Go to Feed
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl w-full">
        <div className="index-gradient-card" style={{ transitionDelay: '0.1s' }}>
          <h3 className="text-xl font-bold mb-3">Ask Queries</h3>
          <p>Post your academic questions and get answers from expert teachers.</p>
        </div>

        <div className="index-gradient-card" style={{ transitionDelay: '0.3s' }}>
          <h3 className="text-xl font-bold mb-3">Community Support</h3>
          <p>Join communities based on your branch and interact with peers.</p>
        </div>

        <div className="index-gradient-card" style={{ transitionDelay: '0.5s' }}>
          <h3 className="text-xl font-bold mb-3">Resource Sharing</h3>
          <p>Teachers share educational resources as PDFs or images.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
