import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Home, BookPlus, FileText, User, LogOut } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
const Navbar = () => {
  const {
    currentUser,
    isAuthenticated,
    logout
  } = useAuth();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <nav className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 py-3 border-b border-primary/20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-gray-300">
            KIIT Query Connect
          </span>
        </Link>
        
        <div className="flex items-center gap-1 md:gap-3">
          <ThemeToggle />
          {isAuthenticated ? <>
              <Link to="/feed" className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${isActive('/feed') ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'}`}>
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {currentUser?.role === "student" && <Link to="/ask" className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${isActive('/ask') ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'}`}>
                  <BookPlus className="h-4 w-4" />
                  <span>Ask Query</span>
                </Link>}
              
              {currentUser?.role === "teacher" && <Link to="/share-materials" className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${isActive('/share-materials') ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-foreground/80 hover:text-foreground'}`}>
                  <FileText className="h-4 w-4" />
                  <span>Share Resources</span>
                </Link>}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full overflow-hidden ml-2 border border-primary/20">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 overflow-hidden border-primary/20">
                  <div className="flex items-center gap-2 p-2 border-b border-border">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium truncate">{currentUser?.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{currentUser?.email}</span>
                    </div>
                  </div>
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </> : <>
              <Link to="/login">
                <Button variant="ghost" className="border border-primary/10 hover:bg-primary/5">Login</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary/90 hover:bg-primary">Register</Button>
              </Link>
            </>}
        </div>
      </div>
    </nav>;
};
export default Navbar;