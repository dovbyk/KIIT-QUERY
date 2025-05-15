
import { Community, Query, Subject, User } from "@/types";

export const communities: Community[] = [
  {
    id: "1",
    name: "Computer Science Engineering",
    description: "Community for CSE students and faculty",
    subjects: [
      { id: "s1", name: "Data Structures", communityId: "1" },
      { id: "s2", name: "Algorithms", communityId: "1" },
      { id: "s3", name: "Database Systems", communityId: "1" }
    ]
  },
  {
    id: "2",
    name: "Electrical Engineering",
    description: "Community for EE students and faculty",
    subjects: [
      { id: "s4", name: "Circuit Theory", communityId: "2" },
      { id: "s5", name: "Power Systems", communityId: "2" },
      { id: "s6", name: "Control Systems", communityId: "2" }
    ]
  },
  {
    id: "3",
    name: "Mechanical Engineering",
    description: "Community for ME students and faculty",
    subjects: [
      { id: "s7", name: "Thermodynamics", communityId: "3" },
      { id: "s8", name: "Fluid Mechanics", communityId: "3" },
      { id: "s9", name: "Machine Design", communityId: "3" }
    ]
  }
];

export const users: User[] = [
  {
    id: "u1",
    name: "Dr. Pradeep Kumar",
    email: "pradeep@kiit.ac.in",
    role: "teacher",
    avatar: "/placeholder.svg",
    communities: ["1"],
    responseCount: 42
  },
  {
    id: "u2",
    name: "Dr. Anita Patel",
    email: "anita@kiit.ac.in",
    role: "teacher",
    avatar: "/placeholder.svg",
    communities: ["1", "2"],
    responseCount: 37
  },
  {
    id: "u3",
    name: "Rahul Sharma",
    email: "rahul@kiit.ac.in",
    role: "student",
    avatar: "/placeholder.svg",
    communities: ["1"]
  },
  {
    id: "u4",
    name: "Neha Singh",
    email: "neha@kiit.ac.in",
    role: "student",
    avatar: "/placeholder.svg",
    communities: ["2"]
  }
];

export const queries: Query[] = [
  {
    id: "q1",
    title: "Understanding Binary Search Tree implementation",
    content: "I'm having trouble implementing a balanced BST. Can someone explain the rotation algorithms?",
    subjectId: "s1",
    authorId: "u3",
    createdAt: "2025-04-18T10:30:00Z",
    upvotes: 12,
    downvotes: 2,
    responses: [
      {
        id: "r1",
        queryId: "q1",
        teacherId: "u1",
        resourceUrl: "https://example.com/resources/bst-explained.pdf",
        resourceType: "pdf",
        createdAt: "2025-04-18T14:25:00Z"
      }
    ],
    comments: [
      {
        id: "c1",
        queryId: "q1",
        authorId: "u4",
        content: "I'm facing the same issue. Looking forward to the solution!",
        createdAt: "2025-04-18T11:45:00Z"
      }
    ]
  },
  {
    id: "q2",
    title: "Complexity analysis of Quick Sort",
    content: "Can someone explain why the average case time complexity of Quick Sort is O(n log n)?",
    subjectId: "s2",
    authorId: "u4",
    createdAt: "2025-04-17T15:20:00Z",
    upvotes: 8,
    downvotes: 1,
    responses: [
      {
        id: "r2",
        queryId: "q2",
        teacherId: "u2",
        resourceUrl: "https://example.com/resources/quicksort-analysis.jpg",
        resourceType: "image",
        createdAt: "2025-04-17T17:30:00Z"
      }
    ],
    comments: [
      {
        id: "c2",
        queryId: "q2",
        authorId: "u3",
        content: "The explanation is really helpful. Thanks!",
        createdAt: "2025-04-17T18:05:00Z"
      }
    ]
  }
];
