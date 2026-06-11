import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {

  try {

    const userMessage = req.body.message;

    let text = "";

    if (userMessage.includes("Frontend")) {

      text = `
1. What is React?
Answer: React is a JavaScript library for building user interfaces.

2. What is Virtual DOM?
Answer: Virtual DOM is a lightweight copy of the real DOM.

3. Difference between props and state?
Answer: Props are read-only while state is mutable.

4. What is JSX?
Answer: JSX allows writing HTML inside JavaScript.

5. What is useState?
Answer: useState is a React Hook for managing state.
`;

    }

    else if (userMessage.includes("Backend")) {

      text = `
1. What is Node.js?
Answer: Node.js is a JavaScript runtime.

2. What is Express.js?
Answer: Express.js is a backend framework.

3. What is REST API?
Answer: REST API allows communication between systems.

4. What is middleware?
Answer: Middleware processes requests before responses.

5. What is MongoDB?
Answer: MongoDB is a NoSQL database.
`;

    }

    else if (userMessage.includes("DSA")) {

      text = `
1. What is a stack?
Answer: Stack follows LIFO.

2. What is a queue?
Answer: Queue follows FIFO.

3. What is recursion?
Answer: Recursion is a function calling itself.

4. What is Big O notation?
Answer: Big O measures algorithm complexity.

5. What is binary search?
Answer: Binary search works on sorted arrays.
`;

    }

    else {

      text = "No category matched.";

    }

    res.json({
      reply: text,
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message,
    });

  }

});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
