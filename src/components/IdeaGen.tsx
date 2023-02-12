import { useState } from "react";
import toast from "react-hot-toast";

const IdeaGen = () => {
  const [topic, setTopic] = useState("");
  const [for_, setFor] = useState("");
  const [res, setRes] = useState("");

  const generate = async () => {
    if (!topic || !for_) {
        toast.error("Topic and Purpose are required!");
        return;
    }
    toast.promise(fetch(`http://localhost:5000/${localStorage.getItem("gpttoken")}/generate/ideas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({topic: topic, for: for_})
    }), {
        success: (res) => { res.json().then(data => setRes(data.text)); return "Generated ideas!" },
        error: "Failed to generate ideas!",
        loading: "Generating ideas..."
    })
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row justify-between items-center">
        <div className="text-4xl font-bold">Idea Generator</div>
        <button className="rounded-full px-3 py-1.5 bg-[#6128fc]" onClick={generate}>Generate</button>
      </div>
      <div className="grid w-[70vw] grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
            <label className="font-medium">Enter Topic/Field</label>
            <input
                value={topic}
                placeholder="Enter topic"
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
            />
        </div>
        <div className="flex flex-col gap-2">
            <label className="font-medium">What to generate for?</label>
            <input
                value={for_}
                placeholder="What to generate the idea for? For example, business, hackathon, etc."
                onChange={(e) => setFor(e.target.value)}
                className="w-full rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none"
            />
        </div>
      </div>
    <div className="h-full w-full min-h-[55vh] rounded-md bg-gray-300 px-3 py-2 font-medium text-black outline-none">{res}</div>
    </div>
  );
};

export default IdeaGen;
