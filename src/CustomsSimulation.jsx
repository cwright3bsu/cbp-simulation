import { useState } from "react";

const profiles = [
  {
    name: "Tourist",
    scenario: "I'm here on vacation with my family for two weeks.",
    redFlags: [],
    requiredQuestions: ["purpose", "length", "accommodations"],
  },
  {
    name: "Agriculture Risk",
    scenario: "I'm bringing some snacks and fruits from my home country.",
    redFlags: ["bringing food"],
    requiredQuestions: ["bringing", "agriculture", "food"],
  },
  {
    name: "Smuggler",
    scenario: "Just a quick business trip. Don’t have much with me.",
    redFlags: ["vague", "avoids detail"],
    requiredQuestions: ["luggage", "goods", "contraband"],
  },
  {
    name: "Visa Issue",
    scenario: "I'm visiting a friend, but I’m not sure how long I’ll stay.",
    redFlags: ["unclear plans", "no return ticket"],
    requiredQuestions: ["visa", "return ticket", "purpose"],
  },
  {
    name: "Terrorism Risk",
    scenario: "I’m here for a religious conference. I’m traveling alone and have no checked bags.",
    redFlags: ["no checked bags", "traveling alone from flagged country"],
    requiredQuestions: ["travel history", "affiliations", "conference"],
  },
  {
    name: "Restricted Country",
    scenario: "I'm visiting from a country currently under travel restrictions.",
    redFlags: ["restricted country", "no itinerary"],
    requiredQuestions: ["origin", "reason for visit", "supporting documents"],
  },
  {
    name: "Unauthorized Worker",
    scenario: "I’m here to visit family and maybe pick up some work while I’m here.",
    redFlags: ["working without visa"],
    requiredQuestions: ["work visa", "employment", "family details"],
  },
];

export default function CustomsSimulation() {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(null);

  const profile = profiles[Math.floor(Math.random() * profiles.length)];

  const handleQuestion = () => {
    const newLog = [...log, { type: "student", text: input }];
    const lower = input.toLowerCase();

    let scoreCount = 0;
    let feedback = [];

    profile.requiredQuestions.forEach((req) => {
      if (lower.includes(req)) {
        scoreCount += 10;
        feedback.push(`✅ Asked about: ${req}`);
      }
    });

    profile.redFlags.forEach((flag) => {
      if (lower.includes(flag)) {
        scoreCount += 15;
        feedback.push(`🚩 Identified red flag: ${flag}`);
      }
    });

    if (newLog.length > 4) {
      setScore({ total: scoreCount, feedback });
    } else {
      setLog([...newLog, { type: "traveler", text: profile.scenario }]);
    }

    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>Customs Officer Simulation</h1>

      <div style={{ backgroundColor: '#f3f3f3', padding: 10, marginTop: 10 }}>
        <p><strong>Traveler Profile:</strong> {profile.name}</p>
        <p><strong>Opening Statement:</strong> "{profile.scenario}"</p>
      </div>

      <div style={{ marginTop: 20 }}>
        {log.map((entry, index) => (
          <div key={index} style={{ color: entry.type === "student" ? "blue" : "black", marginBottom: 8 }}>
            <strong>{entry.type === "student" ? "You" : "Traveler"}:</strong> {entry.text}
          </div>
        ))}
      </div>

      {score ? (
        <div style={{ backgroundColor: '#e6ffe6', padding: 10, marginTop: 20 }}>
          <h2 style={{ fontSize: 18 }}>Simulation Complete</h2>
          <p>Your Score: <strong>{score.total}/100</strong></p>
          <ul>
            {score.feedback.map((f, idx) => (
              <li key={idx}>{f}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
          <input
            type="text"
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: 8 }}
          />
          <button onClick={handleQuestion} style={{ padding: '8px 16px' }}>Submit</button>
        </div>
      )}
    </div>
  );
}