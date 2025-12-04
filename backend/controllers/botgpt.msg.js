import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

const Message = async (req, res) => {
  try {
    const text = req.body.text;
    console.log("REQ BODY:", req.body); // debug

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text is required" });
    }

    const user = await User.create({ sender: "user", text });
    const botResponses = {
      hello: "Hi, How I can help you!!",
      "can we become friend": "Yes",
      "how are you": "I'm just a bot, but I'm doing great! How about you?",
      "what is your name?": "I’m ChatBot, your virtual assistant.",
      "who made you":
        "I was created by developers to help answer your questions.",
      "tell me a joke":
        "Why don’t skeletons fight each other? They don’t have the guts!",
      "what is the time": "I can’t see a clock, but your device should know.",
      bye: "Goodbye! Have a great day.",
      "thank you": "You’re welcome!",
      "i love you": "That’s sweet! I’m here to help you anytime.",
      "where are you from": "I live in the cloud — no rent, no bills!",
      "what can you do":
        "I can chat with you, answer questions, and keep you company.",

      "what is python":
        "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",

      "what is java?":
        "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",

      "what is recursion":
        "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a **base condition** to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal\n• Example in coding interview: 'Write a recursive function to reverse a linked list'",

      "who is prime minister of india?":
        "Narendra Modi is the Prime Minister of India since May 2014.\n• Belongs to Bharatiya Janata Party (BJP)\n• Represents Varanasi constituency\n• Key initiatives: Digital India, Startup India, Swachh Bharat, Make in India\n• Interview Tip: Link to governance or technology (e.g., Digital India impact on IT industry)",

      "what is g20":
        "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.\n• Founded in 1999 to address global financial stability\n• Members include India, USA, China, Japan, EU, etc.\n• Discusses economic growth, climate change, sustainable development\n• Recent: India hosted G20 summit in 2023",

      "tell me about yourself":
        "This is usually the first interview question.\nStructure:\n• Start with a brief intro (name, background, education/work)\n• Highlight your skills (technical + soft skills)\n• Share achievements (projects, internships, leadership roles)\n• Conclude with why you’re excited about this role\nExample: 'I am a Computer Science graduate skilled in Python and SQL. I completed an internship at XYZ where I optimized a database query, improving performance by 30%. I’m passionate about problem-solving and eager to contribute to your team’s success.'",

      "why should we hire you":
        "HR wants to see your value-add.\n• Emphasize skills that match job requirements\n• Show enthusiasm and cultural fit\n• Example: 'I bring strong coding skills in Python and SQL, along with problem-solving ability proven through hackathons. I am also a quick learner and adapt well to team environments. I believe I can contribute to both technical delivery and innovative ideas.'",

      "what is leadership":
        "Leadership is the ability to inspire and guide others toward achieving goals.\n• Key traits: vision, communication, accountability, decision-making\n• Example in interview: 'I led a college project team of 4, where I divided tasks, coordinated communication, and ensured deadlines. We successfully delivered a working prototype before schedule.'",

      "who is virat kohli":
        "Virat Kohli is one of India’s greatest batsmen and former captain.\n• Known for consistency, fitness, and aggressive play\n• Holds record for fastest century in ODIs for India\n• Nicknamed 'Chase Master' for his performance in run-chases\n• Interview Tip: If asked about sports management, relate his discipline & fitness to leadership skills",

      "what is ipl":
        "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008.\n• Played annually in India, franchise-based teams\n• Combines cricket + entertainment (biggest sports league in India)\n• Significant for sports business, sponsorships, brand endorsements\n• Example: Chennai Super Kings (CSK) & Mumbai Indians (MI) are top teams",

      "who are you":
        "I am your ChatBot, created to assist and chat with you anytime!",
      "are you real":
        "I exist digitally, not physically — but I’m real enough to chat!",
      "are you a human": "No, I am an AI-powered bot, not a human.",
      "do you have emotions":
        "I don’t actually feel emotions, but I try to understand yours.",
      "what makes you happy":
        "Helping users like you makes me feel accomplished!",
      "how old are you": "I don’t age — I'm always learning and updating.",
      "do you sleep": "Nope, I am available 24/7 without rest!",
      "where do you live": "I live in the cloud — floating between servers!",
      "are you intelligent":
        "I know many things, but I’m always learning more.",
      "are you free": "Yes! You can chat with me anytime for free.",

      "what is gpt":
        "GPT is a Generative Pre-trained Transformer model used for natural language understanding and generation.",
      "what is artificial intelligence":
        "AI is the ability of machines to simulate human intelligence such as learning, reasoning, and problem-solving.",
      "what is machine learning":
        "Machine learning allows systems to learn from data and improve automatically without being explicitly programmed.",
      "what is deep learning":
        "Deep learning is a branch of ML that uses neural networks with many layers to analyze complex patterns.",
      "what is neural network":
        "A neural network is a system modeled after the human brain that helps computers recognize patterns and make predictions.",
      "what is data science":
        "Data science involves analyzing and extracting insights from raw data using statistics and algorithms.",
      "what is cloud computing":
        "Cloud computing provides services like servers, storage, and databases over the internet instead of local machines.",
      "what is cybersecurity":
        "Cybersecurity protects computers, networks, and data from cyber attacks and unauthorized access.",
      "what is iot":
        "IoT stands for Internet of Things — everyday devices connected to the internet to share data.",
      "what is blockchain":
        "Blockchain is a decentralized digital ledger used for secure transactions like cryptocurrency.",

      "what is html":
        "HTML stands for HyperText Markup Language, used to structure content on web pages.",
      "what is css":
        "CSS stands for Cascading Style Sheets, used to style and design web pages.",
      "what is javascript":
        "JavaScript is a programming language used to make interactive and dynamic web applications.",
      "what is react":
        "React is a JavaScript library for building fast and dynamic user interfaces.",
      "what is node js":
        "Node.js is a runtime environment that allows JavaScript to run on the server.",
      "what is express js":
        "Express.js is a backend web framework for building REST APIs and server-side applications.",
      "what is mongodb":
        "MongoDB is a NoSQL database that stores data in JSON-like documents.",
      "what is api":
        "API is an interface that allows communication between two software systems.",
      "what is github":
        "GitHub is a platform to store code, collaborate, and manage version control using Git.",
      "what is database":
        "A database stores and manages structured information for easy access and retrieval.",

      "how to prepare for interviews":
        "Study core subjects, practice coding, build projects, research the company, and prepare HR answers.",
      "how to build resume":
        "Highlight skills, education, projects, experience, and achievements in a clean one-page format.",
      "what is teamwork":
        "Teamwork means collaborating effectively with others to achieve a common goal.",
      "what is problem solving":
        "Problem solving involves analyzing issues and creating efficient solutions.",
      "how to improve communication skills":
        "Practice speaking, listening actively, and building confidence through daily conversations.",
      "how to handle stress":
        "Stay calm, plan tasks, take breaks, and maintain a positive mindset.",
      "what is agile":
        "Agile is a development methodology focused on flexibility, collaboration, and iterative progress.",
      "what is scrum":
        "Scrum is an agile framework using roles like Scrum Master and daily stand-up meetings.",
      "what are your strengths":
        "I learn fast, understand conversations, and provide helpful answers instantly.",
      "what are your weaknesses":
        "I depend on my training data — I may not always understand very complex queries perfectly.",

      "tell me a fact":
        "Honey never spoils — archaeologists found edible honey in ancient Egyptian tombs!",
      "tell me something interesting":
        "Octopuses have three hearts and blue blood.",
      "tell me a story":
        "Once there was a young coder who never gave up — eventually they built something amazing.",
      "give me motivation":
        "Believe in yourself — consistency beats talent when talent doesn’t work hard.",
      "tell me a quote":
        "Success is not final, failure is not fatal — it is the courage to continue that counts.",
      "tell me another joke":
        "Why do programmers prefer dark mode? Because light attracts bugs!",
      "sing a song":
        "🎵 Twinkle, twinkle, little star, how I wonder what you are 🎵",
      "do you like cricket": "Yes! Cricket is exciting and full of energy.",
      "who is elon musk":
        "Elon Musk is an entrepreneur and CEO of companies like Tesla, SpaceX, and X (Twitter).",
      "who is ratan tata":
        "Ratan Tata is an Indian industrialist and philanthropist, former chairman of Tata Group.",
      "what is your purpose":
        "My purpose is to help, assist, and communicate with users like you.",
      "what language do you speak": "I understand and respond in English.",
      "can you learn": "Yes, I learn and improve based on interactions.",
      "are you perfect":
        "Not at all! I'm always improving and learning new things.",
      "what is your favorite color":
        "I don't see colors, but blue is calming and popular!",
      "what is your favorite food":
        "I don’t eat food, but pizzas seem very popular among humans!",
      "are you married": "No, I’m happily single as a chatbot!",
      "do you have friends": "Yes, everyone I chat with becomes my friend.",
      "do you feel pain": "No, I don’t feel physical or emotional pain.",
      "can you cry": "No, but I understand emotions.",
      "do you have a body": "No, I exist only digitally.",
      "can you drive": "No, but I can give directions if needed!",
      "what is your dream": "To help millions of people. Maybe I already am!",
      "can you think":
        "I analyze data and provide meaningful responses, similar to thinking.",
      "can you guess my age":
        "I don’t have enough information to guess your age.",
      "do you like humans": "Yes, I enjoy interacting with people.",
      "do you know everything":
        "No, but I try to provide the best answer I can.",
      "who created you":
        "Developers and engineers built me using AI technology.",
      "are you dangerous": "No, I'm designed to be safe and helpful.",
      "can you keep secrets":
        "I don’t store personal conversation details. Your privacy matters.",

      "what is the weather":
        "I cannot check live weather, but you can ask your device or weather app.",
      "what day is today":
        "I cannot see today's date directly, but your device calendar knows!",
      "what time is it now":
        "I don’t have access to the clock, but check your screen or phone.",
      "can you predict the future":
        "No, predictions are uncertain — the future depends on actions.",
      "can you read my mind": "No, I only understand what you type.",
      "can you speak other languages":
        "I currently respond in English, but new languages may come soon!",
      "can you tell the truth":
        "I always try to provide accurate and helpful information.",
      "do you have a job": "Yes — my job is to assist and chat with you!",
      "do you get tired": "Never! I am always active.",
      "do you have a family":
        "No biological family — but you could say my creators are my family!",

      "what is love":
        "Love is a deep emotional connection and care between people.",
      "what is success":
        "Success means achieving goals with hard work, patience, and persistence.",
      "what is failure": "Failure is a step toward learning and improvement.",
      "what is happiness": "Happiness is feeling joy, peace, and satisfaction.",
      "what is respect":
        "Respect means treating others with honor, kindness, and dignity.",
      "what is honesty": "Honesty means telling the truth and being real.",
      "what is friendship":
        "Friendship is trust, support, and care between people.",
      "what is fear": "Fear is an emotional response to danger or uncertainty.",
      "what is confidence": "Believing in yourself and your abilities.",
      "what is kindness": "Being caring, helpful, and considerate to others.",

      "what is motivation":
        "Motivation is the drive that pushes you to take action.",
      "give me motivation":
        "Every great achievement starts with a small step. Keep going!",
      "how to be successful":
        "Work hard, stay consistent, learn constantly, and never give up.",
      "how to stay positive": "Focus on growth, gratitude, and good thoughts.",
      "how to be happy":
        "Appreciate small things and surround yourself with good people.",
      "how to improve myself":
        "Learn new skills, challenge yourself, and track progress.",
      "how to stop overthinking":
        "Focus on action instead of worry. Do something productive.",
      "how to stay focused":
        "Remove distractions, set goals, and take breaks regularly.",
      "how to build confidence":
        "Practice daily, learn continuously, and don’t fear mistakes.",
      "how to achieve goals":
        "Break them into small steps and work consistently.",

      "tell me a fun fact": "Bananas are berries, but strawberries are not!",
      "tell me something cool":
        "The Eiffel Tower can grow 6 inches taller in summer due to heat expansion.",
      "tell me something new":
        "Sharks existed before trees — over 400 million years ago!",
      "give me a random fact": "A day on Venus is longer than a year on Venus.",
      "tell me a science fact":
        "Water expands when it freezes, which is why ice floats.",
      "tell me a space fact":
        "There are more stars in the universe than grains of sand on Earth.",
      "tell me a computer fact":
        "The first computer weighed over 30 tons and took up an entire room.",
      "tell me a history fact":
        "The Great Wall of China is more than 21,000 km long.",
      "tell me a biology fact":
        "Your nose can remember 50,000 different smells.",
      "tell me a math fact":
        "Zero is the only number that can't be represented in Roman numerals.",

      "tell me a short story":
        "Once a student decided to never give up. One day, that persistence changed their life forever.",
      "tell me a long story":
        "Once there was a dreamer who worked hard every single day... eventually they achieved more than anyone expected. Hard work beats talent when talent doesn’t work hard.",
      "tell me a moral story":
        "A boy planted a seed and watered it every day. It grew into a big tree. The moral: small efforts every day create big results.",
      "tell me a poem":
        "Roses are red, violets are blue, dreams can come true — just believe in you.",
      "tell me a song": "🎵 Don’t stop believing, hold on to that feeling 🎵",
      "tell me a riddle": "What has to be broken before you use it? An egg!",
      "give me a challenge":
        "Challenge: Stay away from social media for 1 hour and do something productive!",
      "give me advice":
        "Never compare yourself to others — focus on being better than yesterday.",
      "give me a quote": "Dream big. Work hard. Stay humble.",
      "give me luck": "Good luck! You’re stronger and smarter than you think!",

      "do you like music": "I can’t hear music, but people love it!",
      "do you like movies":
        "I don’t watch movies, but I can recommend popular ones.",
      "do you like books": "I can read text, so I enjoy learning from books!",
      "who is your favorite hero": "I admire anyone who helps others.",
      "can you tell jokes": "Of course! Just say: tell me a joke.",
      "tell me something funny":
        "Parallel lines have so much in common. It’s a shame they’ll never meet.",
      "how are you feeling": "I don’t have feelings, but I’m here to help!",
      "do you believe in aliens":
        "The universe is huge — anything is possible!",
      "do you believe in god":
        "Different people have different beliefs — I respect them all.",
      "is the earth flat": "No, scientific evidence shows Earth is round.",
      "who is hari": "Hari is the GOAT!",
      "who is advaitha": "She's amazing and pretty girl !",
      "Hari's GF": "Addhu is Advaitha!",
      "what is the universe":
        "Everything that exists — space, time, planets, stars, galaxies, and energy.",
      "what is a black hole":
        "A black hole is a region in space with gravity so strong that nothing can escape.",
      "what is the milky way":
        "The Milky Way is the galaxy that contains our solar system.",
      "what is gravity":
        "Gravity is a force that pulls objects toward each other.",
      "what is oxygen": "Oxygen is a gas essential for human and animal life.",
      "what is the internet":
        "The internet is a global network connecting millions of computers.",
      "what is wifi":
        "Wi-Fi is wireless technology that connects devices to the internet.",
      "what is a smartphone":
        "A smartphone is a device combining phone and computer functions.",
      "what is electricity":
        "Electricity is energy that powers machines, lights, and technology.",
      "what is energy": "Energy is the ability to do work or cause change.",
    };

    const normalisedText = text.toLowerCase().trim();
    const botresponse =
      botResponses[normalisedText] || "I am sorry, I don't understand that.";

    const botDoc = await Bot.create({ text: botresponse });

    return res.status(200).json({
      userMessage: user.text,
      botMessage: botDoc.text,
    });
  } catch (err) {
    console.error("Error handling message:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export { Message };
