import type { MDXComponents } from "mdx/types";

// Shared styling for core-lesson MDX prose. Kept small on purpose:
// lesson structure comes from the Concept schema, MDX only carries explanation text.
const components: MDXComponents = {
  p: (props) => <p className="leading-7 [&:not(:first-child)]:mt-3" {...props} />,
  ul: (props) => <ul className="mt-3 ml-5 list-disc space-y-1" {...props} />,
  ol: (props) => <ol className="mt-3 ml-5 list-decimal space-y-1" {...props} />,
  strong: (props) => <strong className="font-semibold" {...props} />,
  code: (props) => <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm" {...props} />,
  h3: (props) => <h3 className="mt-5 text-base font-semibold" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
