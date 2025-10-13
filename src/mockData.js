export const mockTeams = [
  {
    id: "team123",
    name: "They Hack a Tons",
    leader: "cassia@example.com",
    members: ["lucas@example.com", "anish@example.com", "mathew@example.com", "ananya@example.com"],
    description: "A great team doing their best",
    logo: "https://via.placeholder.com/120",
    presentationTime: "Day 4, 2:30 PM at Mirvish Hall",
  },
  {
    id: "team456",
    name: "Hack Stars",
    leader: "lucas@example.com",
    members: ["cassia@example.com", "anish@example.com"],
    description: "Another awesome team",
    logo: "https://via.placeholder.com/120",
    presentationTime: "Day 3, 11:00 AM at Hall B",
  },
  {
    id: "team432",
    name: "They Hack a Tons",
    leader: "cassia@example.com",
    members: [
      "lucas@example.com",
      "anish@example.com",
      "mathew@example.com",
      "ananya@example.com"
    ],
    description: "A great team doing their best",
    logo: "https://via.placeholder.com/120",
    mentor: { name: "Dr. John Mentor", email: "mentor@nct.ca" },
    presentationTime: "Day 4, 2:30 PM at Mirvish Hall"
  }
];

// For leaderboard mock
export const mockLeaderboard = [
  { teamName: "They Hack a Tons", score: 95 },
  { teamName: "Hack Stars", score: 87 },
  { teamName: "Code Ninjas", score: 80 },
];