type MemoryVerse = {
  book: string; // e.g. "Genesis"
  reference: string;
  verse: string;
  notes: string;
  tags: [];
};

export default function groupVersesByBookOrdered(
  verses: MemoryVerse[],
  orderedBooks: { label: string }[]
) {
  const grouped: Record<
    string,
    { reference: string; verse: string; notes: string; tags: [] }[]
  > = {};

  // Group memory verses by book
  verses.forEach((v) => {
    if (!grouped[v.book]) grouped[v.book] = [];
    grouped[v.book].push({
      reference: v.reference,
      verse: v.verse,
      notes: v.notes,
      tags: v.tags,
    });
  });

  // Create ordered result based on bibleBooks
  return orderedBooks
    .filter((book) => grouped[book.label]) // only include books that exist in verses
    .map((book) => ({
      book: book.label,
      verses: grouped[book.label],
    }));
}
