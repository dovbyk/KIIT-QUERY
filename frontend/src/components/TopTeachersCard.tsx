
import { users } from "@/data/mockData";
import { User } from "@/types";
import { Award, Star } from "lucide-react";

export default function TopTeachersCard() {
  // Filter only teachers with responseCount
  const topTeachers = users
    .filter(user => user.role === "teacher" && typeof user.responseCount === "number")
    .sort((a, b) => (b.responseCount ?? 0) - (a.responseCount ?? 0))
    .slice(0, 8) as User[];

  return (
    <div className="rounded-xl glass-morphism p-6 mb-6 shadow-lg bg-card/60 animate-fade-in w-full sticky top-4">
      <div className="flex items-center gap-2 mb-6">
        <Award className="text-yellow-400 h-6 w-6" />
        <span className="text-xl font-bold text-primary">Top Teachers</span>
      </div>
      <ol className="space-y-4">
        {topTeachers.map((teacher, idx) => (
          <li key={teacher.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <span className={`font-medium min-w-[24px] ${idx < 3 ? "text-yellow-500" : "text-foreground/90"}`}>
              {idx + 1}.
            </span>
            <img
              src={teacher.avatar || "/placeholder.svg"}
              alt={teacher.name}
              className="h-10 w-10 rounded-full border border-border object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="font-medium">{teacher.name}</span>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                {teacher.responseCount} responses
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
