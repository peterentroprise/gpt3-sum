import { useState } from "react";

export const VideoUploadForm = ({ className, children, ...props }) => {
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/uploadfile/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="space-y-14">
      <form
        className="flex flex-wrap gap-4"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          className=""
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          disabled={file == null}
          className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          Upload
        </button>
      </form>
      {data && <p>Distance: {data.distance}</p>}
    </div>
  );
};
