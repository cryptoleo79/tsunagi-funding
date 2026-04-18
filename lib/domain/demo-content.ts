import type { CampaignContent } from "./types";

const now = new Date();

function daysAgo(days: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d;
}

const content: Record<string, CampaignContent> = {
  "demo-1": {
    story:
      "This EP has been three years in the making. I grew up in Osu, Accra, surrounded by highlife and hip-hop, but it was the first time I heard Afrobeats fused with electronic production that everything clicked. Since then I've been writing, recording demos in my bedroom, and saving up to get into a proper studio.\n\nTSUNAGI lets me set a clear funding target in USD while supporters pledge in ADA — and at close, the live oracle decides the outcome. No middlemen, no platform fees skimming 10%. Just creators and the people who believe in them.\n\nThe six tracks on this EP blend Twi-language vocals with Afrobeats rhythms and ambient synth textures. Every stem — vocals, drums, bass, synths — will be minted as Cardano native assets, so supporters literally own a piece of the music. Think of it as a decentralized album credits page.\n\nFunds go directly toward studio time at Sandbox Studios in East Legon, professional mixing by Kwame Boateng, mastering at Sterling Sound, and CNFT minting costs. Whatever remains covers promotion and a small listening-party event in Accra.",

    creatorBio:
      "Kojo Asante is a singer-songwriter and producer from Accra, Ghana. He's been part of the Accra electronic music scene since 2022, performing at Chale Wote and collaborating with producers across West Africa. This is his debut solo release.",

    updates: [
      {
        date: daysAgo(3),
        title: "Studio sessions underway",
        body: "We started tracking at Sandbox Studios this week. Drums and bass for the first three songs are done. The energy in the room is unreal — the session musicians are adding fills and textures I never imagined. Four more days of tracking to go.",
      },
      {
        date: daysAgo(12),
        title: "Mixing engineer confirmed",
        body: "Kwame Boateng has confirmed he'll handle mixing for all six tracks. He mixed Amaarae's last project and understands how to balance Afrobeats low end with the ambient elements I'm going for.",
      },
      {
        date: daysAgo(18),
        title: "Campaign launched",
        body: "We're live! Thank you to everyone who's pledged in the first 48 hours. The response has been overwhelming. I'll be posting updates as we hit milestones in the studio.",
      },
    ],

    supporters: [
      {
        name: "Esi K.",
        amountAda: 500,
        message: "Been following your SoundCloud for a year. So excited to see this happen on Cardano.",
        date: daysAgo(1),
      },
      {
        name: "Marcus T.",
        amountAda: 1000,
        message: "Music + blockchain done right. The stem-as-CNFT idea is genius.",
        date: daysAgo(5),
      },
      {
        name: "Akua M.",
        amountAda: 200,
        message: "Supporting from Kumasi! Can't wait for the listening party.",
        date: daysAgo(8),
      },
      {
        name: "David L.",
        amountAda: 2000,
        message: "The Cardano music scene needs more projects like this. Let's go.",
        date: daysAgo(14),
      },
      {
        name: "Nana A.",
        amountAda: 300,
        message: "Your Chale Wote set was incredible. Throwing my ADA behind this.",
        date: daysAgo(19),
      },
    ],

    useOfFunds: [
      { category: "Studio time & session musicians", percentage: 40 },
      { category: "Mixing & mastering", percentage: 25 },
      { category: "CNFT minting & metadata", percentage: 15 },
      { category: "Promotion & listening party", percentage: 20 },
    ],

    faq: [
      {
        question: "When will supporters receive the stem CNFTs?",
        answer: "Within 30 days of the campaign reaching its goal. Each supporter receives a set of six stem tokens — one per track — proportional to their pledge amount.",
      },
      {
        question: "What happens if the campaign doesn't reach its goal?",
        answer: "At close, the live Charli3 ADA/USD oracle determines the USD value of pledged ADA. If the goal isn't met, all ADA is returned to supporters automatically.",
      },
      {
        question: "Can I listen to demos before pledging?",
        answer: "Yes — two demo tracks are available on my SoundCloud. The final EP will have significantly higher production quality thanks to professional studio recording and mixing.",
      },
    ],
  },

  "demo-2": {
    story:
      "West Africa has one of the fastest-growing Cardano communities in the world, but there's never been a dedicated in-person event for builders in the region. That changes now.\n\nThe Cardano Community Summit in Accra brings together stake pool operators, DApp developers, governance delegates, and newcomers for two days of talks, workshops, and networking. We're hosting at the Accra International Conference Centre with simultaneous translation in English, French, and Twi.\n\nThe summit isn't a corporate conference — it's a community event. Speakers include local SPOs, Catalyst fund recipients, and developers who've shipped real projects on mainnet. We're also running a half-day Plutus workshop for developers who want hands-on experience writing validators.\n\nWe chose TSUNAGI because the oracle-based settlement gives our supporters confidence. They know exactly how the outcome is determined — no ambiguity, no trust required. If we fall short, they get their ADA back. If we hit the target, the funds go directly to making this event happen.",

    creatorBio:
      "Ama Darko is a community organizer and Catalyst proposal reviewer based in Accra. She's coordinated three Cardano meetups in Ghana and helped onboard over 200 new wallet holders through local education workshops.",

    updates: [
      {
        date: daysAgo(5),
        title: "Venue contract signed",
        body: "We've signed the contract with AICC for both days. The main hall seats 400 and we have breakout rooms for workshops. Catering is included in the venue cost.",
      },
      {
        date: daysAgo(15),
        title: "First speakers confirmed",
        body: "Three confirmed speakers so far: a Catalyst fund recipient from Lagos, an SPO from Nairobi, and a governance delegate from Accra. We're aiming for 12 speakers total across two tracks.",
      },
    ],

    supporters: [
      {
        name: "Kofi B.",
        amountAda: 1500,
        message: "Finally an event in our region. Count me in as both a supporter and attendee.",
        date: daysAgo(2),
      },
      {
        name: "Fatima S.",
        amountAda: 800,
        message: "Will there be a livestream? I'm in Lagos and want to participate remotely.",
        date: daysAgo(10),
      },
      {
        name: "Joseph O.",
        amountAda: 500,
        message: "Great initiative. The West Africa Cardano community deserves this.",
        date: daysAgo(20),
      },
    ],

    useOfFunds: [
      { category: "Venue & catering", percentage: 35 },
      { category: "Speaker travel & accommodation", percentage: 25 },
      { category: "Livestream production", percentage: 20 },
      { category: "Translated materials & signage", percentage: 10 },
      { category: "Contingency", percentage: 10 },
    ],

    faq: [
      {
        question: "Will the summit be livestreamed?",
        answer: "Yes. All main-stage talks will be streamed live with English captions. Workshop sessions are in-person only due to the interactive format.",
      },
      {
        question: "How are funds handled if the goal isn't met?",
        answer: "At campaign close, the Charli3 ADA/USD oracle determines the USD value of pledged ADA. If the total falls short of the $10,000 goal, all pledges are automatically returned to supporters.",
      },
      {
        question: "Is this affiliated with the Cardano Foundation?",
        answer: "No. This is an independent community event organized by local Cardano community members. We're not affiliated with IOG, the Cardano Foundation, or Emurgo.",
      },
      {
        question: "When and where exactly is the summit?",
        answer: "The summit is planned for Q3 2026 at the Accra International Conference Centre. Exact dates will be announced once funding is confirmed.",
      },
    ],
  },

  "demo-3": {
    story:
      "Learning Plutus is hard. The documentation assumes you already know Haskell, the tooling changes every few months, and most tutorials are outdated by the time they're published. I've been through that pain myself, and I want to make it easier for the next wave of developers.\n\nThe Plutus Starter Kit is a collection of production-ready smart contract templates with step-by-step guides written for developers who know TypeScript or Python but are new to Cardano. Each template includes a validator, off-chain code, and a test harness that runs on preprod.\n\nThe kit covers four core patterns: a simple payment validator, a time-locked vesting contract, a minting policy with redeemer logic, and a basic escrow. Each comes with a written walkthrough explaining not just what the code does, but why it's structured that way.\n\nEverything will be open source under MIT. The guides will be hosted as a free Gitbook. Funding covers my time to write, review, and maintain the templates for at least six months after release.",

    creatorBio:
      "Ravi Mehta is a developer educator and Plutus Pioneer Program alumni (Cohort 3). He currently maintains two open-source Cardano libraries and has contributed to the Aiken compiler documentation.",

    updates: [
      {
        date: daysAgo(2),
        title: "Payment validator template complete",
        body: "The first template — a simple payment validator with datum-based authorization — is done and tested on preprod. The walkthrough guide is drafted and in review. Three more templates to go.",
      },
      {
        date: daysAgo(6),
        title: "Testing framework chosen",
        body: "After evaluating several options, we're using Aiken's built-in test runner for on-chain logic and a custom TypeScript harness for off-chain integration tests. This gives developers the best debugging experience.",
      },
      {
        date: daysAgo(9),
        title: "Campaign launched",
        body: "The Plutus Starter Kit is now live on TSUNAGI. I've been overwhelmed by the early support. Special thanks to the Cardano developers Discord for spreading the word.",
      },
    ],

    supporters: [
      {
        name: "Chen W.",
        amountAda: 3000,
        message: "I've been waiting for something like this. Plutus documentation is a real barrier to entry.",
        date: daysAgo(1),
      },
      {
        name: "Sarah N.",
        amountAda: 1500,
        message: "As a TypeScript developer trying to learn Cardano, this is exactly what I need.",
        date: daysAgo(3),
      },
      {
        name: "Tomás R.",
        amountAda: 800,
        message: "Open source + good docs = the future of Cardano development. Backed.",
        date: daysAgo(5),
      },
      {
        name: "Aisha K.",
        amountAda: 500,
        message: "Would love to see an escrow template. That pattern comes up constantly.",
        date: daysAgo(7),
      },
    ],

    useOfFunds: [
      { category: "Template development", percentage: 45 },
      { category: "Documentation & guides", percentage: 25 },
      { category: "Code review & security audit", percentage: 15 },
      { category: "Hosting & maintenance (6 months)", percentage: 15 },
    ],

    faq: [
      {
        question: "Will this be open source?",
        answer: "Yes. All templates, guides, and test harnesses will be released under the MIT license on GitHub.",
      },
      {
        question: "What Plutus version does this target?",
        answer: "The templates target Plutus V2 on Cardano mainnet and preprod. We'll update to V3 as the ecosystem tooling stabilizes.",
      },
      {
        question: "Can I contribute templates after launch?",
        answer: "Absolutely. The repo will accept pull requests. Contributors who add well-documented templates will be credited in the project README.",
      },
    ],
  },
};

export function getCampaignContent(id: string): CampaignContent | undefined {
  return content[id];
}
