// furthest to nearest
const motivationMessages = [
  "Another month, time to wait longer.",
  "Slowly but surely...",
  "Close but still not here.",
  "You're getting there!",
  "It's here!",
];

export const getMotivationMessage = (percentage: number) => {
  if (percentage == 0) return motivationMessages[4];

  if (percentage >= 95) return motivationMessages[0];
  if (percentage >= 50) return motivationMessages[1];
  if (percentage >= 10) return motivationMessages[2];

  return motivationMessages[3];
};
