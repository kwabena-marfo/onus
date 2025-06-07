/* eslint-disable @typescript-eslint/no-explicit-any */
import bible from "@/data/bible.json";
import bibleVerses from "@/data/verses.json";

export default function groupVersesByBookOrdered() {
  const grouped: Record<
    string,
    { reference: string; verse: string; notes: string; tags: any }[]
  > = {};

  // Group memory verses by book
  bibleVerses.forEach((v) => {
    if (!grouped[v.book]) grouped[v.book] = [];
    grouped[v.book].push({
      reference: v.reference,
      verse: v.verse,
      notes: v.notes,
      tags: v.tags,
    });
  });

  // Create ordered result based on bibleBooks
  return bible
    .filter((book) => grouped[book.label]) // only include books that exist in verses
    .map((book) => ({
      book: book.label,
      verses: grouped[book.label],
    }));
}
