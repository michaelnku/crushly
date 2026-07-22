export interface MockProfile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  verified: boolean;
  online: boolean;
  compatibility: number;
  interests: string[];
  image: string;
}

export const mockProfiles: MockProfile[] = [
  {
    id: 1,
    name: "Emily",
    age: 24,
    location: "2 km away",
    bio: "Coffee lover ☕ • Weekend hiker 🥾 • Looking for genuine connections.",
    verified: true,
    online: true,
    compatibility: 98,
    interests: ["Travel", "Coffee", "Music"],
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80",
  },

  {
    id: 2,
    name: "Sophia",
    age: 26,
    location: "5 km away",
    bio: "Gym mornings 💪 • Beach sunsets 🌅 • Dog mom 🐶",
    verified: true,
    online: false,
    compatibility: 95,
    interests: ["Fitness", "Dogs", "Movies"],
    image:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=80",
  },

  {
    id: 3,
    name: "Olivia",
    age: 23,
    location: "3 km away",
    bio: "Designer 🎨 • Loves sushi 🍣 • Hopeless romantic 💕",
    verified: false,
    online: true,
    compatibility: 96,
    interests: ["Art", "Food", "Photography"],
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80",
  },

  {
    id: 4,
    name: "Mia",
    age: 25,
    location: "1 km away",
    bio: "Always planning my next adventure ✈️ Let's make memories.",
    verified: true,
    online: true,
    compatibility: 99,
    interests: ["Adventure", "Travel", "Nature"],
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80",
  },

  {
    id: 5,
    name: "Ava",
    age: 22,
    location: "7 km away",
    bio: "Bookworm 📚 • Night drives 🌙 • Match my playlist.",
    verified: true,
    online: false,
    compatibility: 93,
    interests: ["Reading", "Music", "Gaming"],
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=80",
  },
];

export const floatingBadges = [
  {
    id: 1,
    text: "98% Match",
    emoji: "❤️",
    position: "left-top",
  },
  {
    id: 2,
    text: "Verified",
    emoji: "✨",
    position: "right-top",
  },
  {
    id: 3,
    text: "New Like",
    emoji: "💬",
    position: "right-bottom",
  },
] as const;

export const typingMessages = [
  "Emily is typing...",
  "Sophia liked your profile ❤️",
  "You have a new match 🎉",
  "Olivia sent a wave 👋",
];

export const matchMessages = [
  "💖 It's a Match!",
  "Someone liked you!",
  "New Connection!",
  "You both liked each other!",
];
