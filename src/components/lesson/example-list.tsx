import { PlayButton } from "@/components/audio/play-button";
import type { Example } from "@/content/schema";

export function ExampleList({ examples }: { examples: Example[] }) {
  return (
    <ul className="divide-y rounded-lg border">
      {examples.map((ex, i) => (
        <li key={i} className="flex items-start gap-2 p-3">
          <PlayButton text={ex.de} className="-mt-0.5 -ml-1" />
          <div className="min-w-0 flex-1">
            <p lang="de" className="font-medium">
              {ex.de}
            </p>
            <p className="text-sm">{ex.en}</p>
            {ex.gloss && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span className="font-medium">Word by word:</span> {ex.gloss}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
