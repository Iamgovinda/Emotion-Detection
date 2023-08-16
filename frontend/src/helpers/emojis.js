const emojiMap = {
  angry: "angry",
  disgusted: "grin-tongue-squint",
  fear: "grimace",
  happy: "grin",
  neutral: "meh",
  sad: "sad-tear",
  surprise: "surprise",
  male: "male",
  female: "female",
};

export const mapExpressionToEmoji = expression => emojiMap[expression];
