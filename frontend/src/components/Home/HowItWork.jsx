import React from "react";
import { Notebook, User, HeartHandshake, HandHeart } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      image: <Notebook size={50} color="#7e2d2d" />,
      title: "Register",
      description:
        "Create your account quickly and for free. It only takes a few minutes to get started with your matrimony journey.",
    },
    {
      image: <User size={50} color="#7e2d2d" />,
      title: "Fill Profile",
      description:
        "Add personal details, preferences, and a photo to complete your profile. A well-filled profile increases your match potential.",
    },
    {
      image: <HandHeart size={50} color="#7e2d2d" />,
      title: "Find Matches",
      description:
        "Explore profiles that align with your values and preferences. Use smart filters to discover truly compatible matches.",
    },
    {
      image: <HeartHandshake size={50} color="#7e2d2d" />,
      title: "Connect",
      description:
        "Send interests or messages to those you like. Start conversations and take the first step toward a meaningful relationship.",
    },
  ];

  return (
    <section className="how-it-works">
      <h1>How It Works</h1>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="icon">{step.image}</div>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
