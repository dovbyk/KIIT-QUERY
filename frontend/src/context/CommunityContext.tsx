
import { Community, Subject } from "@/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { communities as mockCommunities } from "@/data/mockData";

interface CommunityContextType {
  communities: Community[];
  getCommunityById: (id: string) => Community | undefined;
  getSubjectById: (id: string) => Subject | undefined;
  getSubjectsByCommunitiesIds: (communityIds: string[]) => Subject[];
  getAllSubjects: () => Subject[]; // Add the missing method signature
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    // In a real app, we'd fetch from an API
    setCommunities(mockCommunities);
  }, []);

  const getCommunityById = (id: string) => {
    return communities.find(community => community.id === id);
  };

  const getSubjectById = (id: string) => {
    for (const community of communities) {
      const subject = community.subjects.find(subject => subject.id === id);
      if (subject) return subject;
    }
    return undefined;
  };

  const getSubjectsByCommunitiesIds = (communityIds: string[]) => {
    const subjects: Subject[] = [];
    for (const community of communities) {
      if (communityIds.includes(community.id)) {
        subjects.push(...community.subjects);
      }
    }
    return subjects;
  };
  
  // Implement the missing getAllSubjects method
  const getAllSubjects = () => {
    const allSubjects: Subject[] = [];
    for (const community of communities) {
      allSubjects.push(...community.subjects);
    }
    return allSubjects;
  };

  return (
    <CommunityContext.Provider value={{
      communities,
      getCommunityById,
      getSubjectById,
      getSubjectsByCommunitiesIds,
      getAllSubjects
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunities = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error("useCommunities must be used within a CommunityProvider");
  }
  return context;
};
