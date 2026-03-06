import Book from "./components/Book";
import { getAllBooks } from "./lib/microcms/client";
import { BookType } from "./types/types";


// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  
  const { contents } = await getAllBooks();

  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book key={book.id} book={book} />
        ))}
      </main>
    </>
  );
}