export const generateQuestions = async (category) => {

  try {

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        message: category,
      }),
    });

    const data = await response.json();

    return data.reply;

  } catch (error) {

    console.log(error);

    return "Failed to generate questions";
  }
};