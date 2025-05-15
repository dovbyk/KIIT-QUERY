
import { useCommunities } from "@/context/CommunityContext";
import { useAuth } from "@/context/AuthContext";
import { BookOpen } from "lucide-react";

export default function TopSubjectsCard() {
  const { currentUser } = useAuth();
  const { getSubjectsByCommunitiesIds } = useCommunities();

  // Only in user's communities
  const subjects = currentUser
    ? getSubjectsByCommunitiesIds(currentUser.communities)
    : [];

  // Top 12 subjects
  const topSubjects = subjects.slice(0, 12);

  return (
    <div className="rounded-xl glass-morphism p-6 mb-6 shadow-lg bg-card/60 animate-fade-in w-full sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-primary h-6 w-6" />
        <span className="text-xl font-bold text-primary">Top Subjects</span>
      </div>
      <ol className="space-y-3">
        {topSubjects.map((subject, idx) => (
          <li key={subject.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <span className={`font-medium min-w-[24px] ${idx < 3 ? "text-accent" : "text-foreground/90"}`}>
              {idx + 1}.
            </span>
            <span className="text-base">{subject.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
