import { Community, Subject } from "@/types";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CommunityContextType {
  communities: Community[];
  getCommunityById: (id: string) => Community | undefined;
  getSubjectById: (id: string) => Subject | undefined;
  getSubjectsByCommunitiesIds: (communityIds: string[]) => Subject[];
  getAllSubjects: () => Subject[];
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/communities/getcommunities`);
        if (!response.ok) throw new Error("Failed to fetch communities");
        const data: Community[] = await response.json();
        setCommunities(data);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
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

  const getAllSubjects = () => {
    return communities.flatMap(community => community.subjects);
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
