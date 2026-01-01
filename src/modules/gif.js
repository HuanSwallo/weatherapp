export function weatherToGif(main, isDay = true) {
    console.log("weatherToGif called with:", main, isDay);
    const m = (main || "").toLowerCase();

    if (m === "clear") return isDay ? "sunny sky" : "night sky stars";
    if (m === "clouds") return "cloudy sky";
    if (m === "rain" || m === "drizzle") return "rainy city";
    if (m === "thunderstorm") return "thunderstorm lightning";
    if (m === "snow") return "snow falling";
    if (m === "mist" || m === "fog" || m === "haze" || m === "smoke") return "foggy street";

    return "weather";
}