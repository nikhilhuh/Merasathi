import React from "react";
import PriyaImg from "../../assets/images/priya.webp";
import AmanImg from "../../assets/images/aman.png";
import ShikhaImg from "../../assets/images/shikha.webp";

const SuccessStories = () => {
  const stories = [
    {
      name: "Priya",
      image: PriyaImg,
      story:
        "I never thought I'd meet someone who shared my values so deeply. Thanks to MeraSathi, I found my soulmate. We’re now happily married and forever grateful.",
    },
    {
      name: "Aman",
      image: AmanImg,
      story:
        "The process was smooth, genuine, and felt very safe. I connected with someone who truly understands me. MeraSathi made it possible.",
    },
    {
      name: "Shikha",
      image: ShikhaImg,
      story:
        "I joined with hesitation, but I’m so glad I did. I found my partner, my best friend, and my future—all in one place. Thank you, MeraSathi!",
    },
  ];

  return (
    <section className="success-stories">
      <h1>Success Stories</h1>
      <div className="stories">
        {stories.map((story, index) => (
          <div className="story-card" key={index}>
            <img src={story.image} alt={story.name} />
            <p className="story-text">"{story.story}"</p>
            <p className="story-name">— {story.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
