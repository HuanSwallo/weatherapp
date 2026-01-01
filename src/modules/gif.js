export function weatherToGif(main, isDay = true) {
    const m = (main || "").toLowerCase();
  const time = isDay ? "day" : "night";

  switch (m) {
    case "clear":
      return `clear weather ${time} background`;

    case "clouds":
      return `cloudy weather background`;

    case "rain":
    case "drizzle":
      return `rain weather city background`;

    case "thunderstorm":
      return `thunderstorm weather lightning background`;

    case "snow":
      return `snow weather falling background`;

    case "mist":
    case "fog":
    case "haze":
    case "smoke":
      return `fog weather street background`;

    default:
      return `weather ${time} background`;
  }
}