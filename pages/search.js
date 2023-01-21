import { SearchForm } from "../components/SearchForm";
import Link from "next/link";

const SearchPage = () => (
  <div className="h-screen mx-auto max-w-2xl pt-12 px-4">
    <div className="space-y-8">
      <p className="text-4xl font-medium">Transcript Search Demo</p>
      <Link
        className="underline text-indigo-600 hover:text-indigo-800 visited:text-indigo-600"
        href="/"
      >
        Retrieve GPT3 Demo
      </Link>
      <SearchForm />
    </div>
  </div>
);

export default SearchPage;
