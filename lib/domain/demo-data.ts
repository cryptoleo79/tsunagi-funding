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
    title: "Afrobeats on Chain: Debut EP by Kojo Asante",
    description:
      "Funding the recording, mixing, and on-chain release of a 6-track Afrobeats EP. All stems will be published as Cardano native assets, letting supporters own a piece of the music.",
    creatorName: "Kojo A.",
    goalUsd: 3000,
    pledgedAda: 15000,
    supporterCount: 68,
    closesAt: daysFromNow(8),
    status: "active",
    createdAt: daysAgo(22),
  },
  {
    id: "demo-2",
    title: "Cardano Community Summit — Accra 2026",
    description:
      "A two-day gathering for Cardano builders, stake pool operators, and newcomers in West Africa. Covers venue rental, speaker travel, livestream production, and translated materials.",
    creatorName: "Ama D.",
    goalUsd: 10000,
    pledgedAda: 12000,
    supporterCount: 31,
    closesAt: daysFromNow(3),
    status: "active",
    createdAt: daysAgo(28),
  },
  {
    id: "demo-3",
    title: "Open-Source Plutus Starter Kit",
    description:
      "Beginner-friendly Plutus smart contract templates with step-by-step guides, aimed at developers entering the Cardano ecosystem for the first time. Includes a validator, minting policy, and test harness.",
    creatorName: "Ravi M.",
    goalUsd: 5000,
    pledgedAda: 20000,
    supporterCount: 42,
    closesAt: daysFromNow(15),
    status: "active",
    createdAt: daysAgo(10),
  },
];

export function getDemoCampaign(id: string): Campaign | undefined {
  return demoCampaigns.find((c) => c.id === id);
}
