import { useState, useEffect } from "react";
import { UISelectMenu } from "./UISelectMenu";

export const VoiceIdSelection = ({ voiceId, setVoiceId }) => {
  const [isLoading, setLoading] = useState(false);
  const [items, setItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState(false);
  const handleVoiceIdChange = (event) => {
    setVoiceId(event.target.value);
  };

  const handleDeleteVoices = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/deleteAllVoices/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    console.log(items[0].id);
    setVoiceId(items[0].id);
  };

  const handleSetNewVoiceId = (item) => {
    console.log(item);
    setSelectedItem(item);
    setVoiceId(item.id);
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/getAllVoices/`)
      .then((response) => response.json())
      .then((data) => {
        const things = data.voices.map((item) => {
          return { id: item["voice_id"], title: item["name"] };
        });
        setItems(things);

        const newSelectedItem = things
          ? things.filter((item) => item.id == voiceId)
          : null;
        setSelectedItem(newSelectedItem[0]);
        console.log("newSelectedItem");
        console.log(newSelectedItem);
      });
  }, [voiceId]);

  return (
    <div className="space-y-4 py-8">
      {items && (
        <UISelectMenu
          placeholderText="Use Existing Voice ID"
          items={items}
          selectedItem={selectedItem}
          setSelectedItem={handleSetNewVoiceId}
        />
      )}
      <button
        onClick={handleDeleteVoices}
        className="disabled:opacity-25 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Delete All Custom Voice Models
      </button>
      <div>
        <label
          htmlFor="voiceId"
          className="block text-sm font-medium text-gray-700"
        >
          Voice Id
        </label>
        <div className="mt-1">
          <input
            value={voiceId}
            onChange={handleVoiceIdChange}
            type="text"
            name="voiceId"
            id="voiceId"
            className="disabled:opacity-25 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};
