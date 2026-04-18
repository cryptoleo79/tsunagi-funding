interface CampaignStoryProps {
  story: string;
  creatorBio: string;
  creatorName: string;
}

export function CampaignStory({ story, creatorBio, creatorName }: CampaignStoryProps) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-base font-semibold text-zinc-100">Story</h2>
        <div className="mt-4 space-y-4">
          {story.split("\n\n").map((p, i) => (
            <p key={i} className="text-sm text-zinc-400 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold text-zinc-100">About the creator</h2>
        <div className="mt-4 flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-sm font-medium text-zinc-400">
            {creatorName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-200">{creatorName}</p>
            <p className="mt-1 text-sm text-zinc-500 leading-relaxed">{creatorBio}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
