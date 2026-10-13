interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({
  title,
}: PlaceholderPageProps) {
  return (
    <section aria-labelledby="page-title">
      <h1 id="page-title">{title}</h1>
      <p>This module will be implemented in a later phase.</p>
    </section>
  );
}