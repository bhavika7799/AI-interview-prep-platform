import { generateQuestions } from "../api/gemini";
import CategoryCard from "../components/CategoryCard";
import { useState } from "react";

function Home() {

  const categories = [
    {
      title: "Frontend",
      description: "React, JavaScript, HTML, CSS",
    },

    {
      title: "Backend",
      description: "Node.js, APIs, Databases",
    },

    {
      title: "DSA",
      description: "Arrays, Trees, Graphs, DP",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [aiQuestions, setAiQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerateQuestions = async () => {

    if (!selectedCategory) {
      alert("Please select a category first");
      return;
    }

    setLoading(true);

    const response = await generateQuestions(selectedCategory);

    const questionsArray = response
      .split(/\d+\./)
      .filter((q) => q.trim() !== "")
      .map((q) => q.trim());

    setAiQuestions(questionsArray);

    setCurrentQuestion(0);

    setLoading(false);

    setStarted(true);
  };

  if (started) {

    return (
      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">

          <h1 className="text-3xl font-bold text-gray-800">
            {selectedCategory} Interview Questions
          </h1>

          <p className="text-gray-500 mt-4">
            Question {currentQuestion + 1} of {aiQuestions.length}
          </p>

          <div className="w-full bg-gray-300 rounded-full h-3 mt-4">

            <div
              className="bg-black h-3 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / aiQuestions.length) * 100}%`,
              }}
            ></div>

          </div>

          <p className="text-sm text-gray-500 mt-2">
            {Math.floor(
              ((currentQuestion + 1) / aiQuestions.length) * 100
            )}% Completed
          </p>

          <div className="mt-6 bg-gray-100 p-6 rounded-xl whitespace-pre-wrap text-gray-800 leading-8">
            {aiQuestions[currentQuestion]}
          </div>

          <div className="flex gap-4 mt-6">

            <button
              disabled={currentQuestion === 0}
              onClick={() =>
                setCurrentQuestion(currentQuestion - 1)
              }
              className="bg-gray-300 px-6 py-3 rounded-xl disabled:opacity-50"
            >
              Previous
            </button>

            <button
              disabled={currentQuestion === aiQuestions.length - 1}
              onClick={() =>
                setCurrentQuestion(currentQuestion + 1)
              }
              className="bg-black text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              Next
            </button>

          </div>

          <button
            onClick={() => setStarted(false)}
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:opacity-90"
          >
            Back
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800">
          Hi Bhavika 👋
        </h1>

        <p className="text-gray-600 mt-2">
          Ready for your next interview practice session?
        </p>

        {selectedCategory && (
          <p className="mt-4 text-blue-600 font-medium">
            Selected Category: {selectedCategory}
          </p>
        )}

        <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm">

          <h2 className="text-2xl font-semibold text-gray-800">
            Start Mock Interview
          </h2>

          <p className="text-gray-500 mt-2">
            Practice AI-generated interview questions based on your role.
          </p>

          <button
            onClick={handleGenerateQuestions}
            className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90"
          >
            {loading ? "Generating..." : "Start Practice"}
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              description={category.description}
              onSelect={() => setSelectedCategory(category.title)}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;