import type { Campaign } from "./types";

const now = new Date();

function daysFromNow(days: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d;
}

export const demoCampaigns: Campaign[] = [
  {
    id: "demo-1",
    title: "Cardano Developer Toolkit for East Africa",
    description:
      "Building an open-source toolkit to help developers in Kenya and Ethiopia build on Cardano. Includes documentation in Swahili, local meetup funding, and starter templates for common dApp patterns.",
    creatorName: "Amara K.",
    goalUsd: 15000,
    pledgedAda: 22400,
    supporterCount: 47,
    closesAt: daysFromNow(12),
    status: "active",
    createdAt: daysAgo(18),
  },
  {
    id: "demo-2",
    title: "Podcast: Voices from the Cardano Ecosystem",
    description:
      "A 12-episode season interviewing builders, stake pool operators, and community members from underrepresented regions. Audio production, editing, and transcription costs.",
    creatorName: "Hiroshi T.",
    goalUsd: 5000,
    pledgedAda: 9200,
    supporterCount: 23,
    closesAt: daysFromNow(3),
    status: "active",
    createdAt: daysAgo(25),
  },
];

export function getDemoCampaign(id: string): Campaign | undefined {
  return demoCampaigns.find((c) => c.id === id);
}
