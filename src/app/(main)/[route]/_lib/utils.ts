export const getEstimatedReviewTime = (questionCount: number) =>
  Math.ceil((questionCount * 46) / 60);

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const getFeedbackDescription = (percentage: number) => {
  switch (true) {
    case percentage === 100:
      return "🏆 ¡Puntuación perfecta! Has dominado este tema";
    case percentage >= 80:
      return "🎉 ¡Gran esfuerzo! Has demostrado un buen dominio del tema";
    case percentage >= 50:
      return "✨ ¡Buen intento! Pero aún hay espacio para mejorar";
    default:
      return "💡 ¡No te desanimes! Cada intento es una oportunidad de aprender y mejorar";
  }
};

export const getScoreText = (score: number) => {
  switch (true) {
    case score === 100:
      return "Con una puntuación perfecta de ";
    case score >= 60:
      return "Con una puntuación aprobatoria del ";
    default:
      return "";
  }
};
