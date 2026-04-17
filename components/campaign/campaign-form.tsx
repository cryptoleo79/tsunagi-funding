"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CampaignForm() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    // In the full version this would persist to a backend.
    // For now, redirect to a demo campaign to show the flow.
    setTimeout(() => router.push("/campaigns/demo-1"), 600);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Field label="Campaign Title" name="title" placeholder="e.g. Community Dev Fund for Lagos" required />
      <Field
        label="Short Description"
        name="description"
        placeholder="What will this campaign fund? Who does it help?"
        multiline
        required
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field
          label="Goal (USD)"
          name="goalUsd"
          type="number"
          placeholder="10000"
          required
        />
        <Field
          label="Closing Date"
          name="closesAt"
          type="date"
          required
        />
      </div>
      <Field
        label="Creator Name (optional)"
        name="creatorName"
        placeholder="Your name or handle"
      />

      <button
        type="submit"
        disabled={submitted}
        className="w-full rounded-lg bg-zinc-100 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-white disabled:opacity-50"
      >
        {submitted ? "Creating..." : "Create Campaign"}
      </button>

      <p className="text-xs text-zinc-600">
        This demo does not persist data. The form redirects to a sample
        campaign to demonstrate the full flow.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  multiline,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}) {
  const baseClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none";

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-zinc-300 mb-2">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={baseClass + " resize-none"}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
