export interface Query {
  id: string;
  title: string;
  content: string;
  subjectId: string;
  authorId: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  responses: Response[];
  comments: Comment[];
  imageUrl?: string;
  type?: 'query' | 'resource'; // Add the optional type property
  fileUrl?: string; // Add the optional fileUrl property
}

export interface Response {
  id: string;
  queryId: string;
  teacherId: string;
  resourceUrl: string;
  resourceType: "pdf" | "image";
  createdAt: string;
}

export interface Comment {
  id: string;
  queryId: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "student" | "teacher";
  communities: string[];
  responseCount?: number; // Add this property as optional
}

export type UserRole = "student" | "teacher"; // Add UserRole type

export interface Subject {
  id: string;
  name: string;
  communityId: string;
}

export interface Community {
  id: string;
  name: string;
  description?: string; // Add description property
  subjects: Subject[]; // Add subjects property
}

export interface TeacherResourceUploadProps {
  onAddResponse: (resourceUrl: string, resourceType: "pdf" | "image") => void;
  onUploadResource: (resourceTitle: string, resourceDescription: string, pdfFileName: string) => void;
  loading?: boolean;
}

export interface TeacherResource {
  id: string;
  teacherId: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: "pdf";
  createdAt: string;
}
