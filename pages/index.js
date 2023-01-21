import { Form } from "../components/Form";
import Link from "next/link";

const Index = () => (
  <div className="h-screen mx-auto max-w-2xl pt-12 px-4">
    <div className="space-y-8">
      <p className="text-4xl font-medium">Retrieve GPT3 Demo</p>
      <Link
        className="underline text-indigo-600 hover:text-indigo-800 visited:text-indigo-600"
        href="/search"
      >
        Transcript Search Demo
      </Link>
      <Form />
    </div>
  </div>
);

export default Index;
