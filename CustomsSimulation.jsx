import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customs Officer Simulation</h1>
      <Card className="mb-4">
        <CardContent className="space-y-2">
          <p><strong>Traveler Profile:</strong> {profile.name}</p>
          <p><strong>Opening Statement:</strong> "{profile.scenario}"</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {log.map((entry, index) => (
          <div key={index} className={entry.type === "student" ? "text-blue-700" : "text-gray-700"}>
            <strong>{entry.type === "student" ? "You" : "Traveler"}:</strong> {entry.text}
          </div>
        ))}
      </div>

      {score ? (
        <Card className="mt-4">
          <CardContent>
            <h2 className="text-xl font-semibold">Simulation Complete</h2>
            <p className="mt-2">Your Score: <strong>{score.total}/100</strong></p>
            <ul className="list-disc pl-5 mt-2">
              {score.feedback.map((f, idx) => (
                <li key={idx}>{f}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ) : (
        <div className="flex items-center gap-2 mt-4">
          <Input
            placeholder="Type your question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleQuestion}>Submit</Button>
        </div>
      )}
    </div>
  );
}