export function mapIconToWeatherIcon(iconCode) {
  const isDay = iconCode.endsWith("d");

  const baseMap = {
    "01": isDay ? "wi-day-sunny" : "wi-night-clear",
    "02": isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy",
    "03": "wi-cloud",
    "04": "wi-cloudy",
    "09": "wi-showers",
    "10": isDay ? "wi-day-rain" : "wi-night-alt-rain",
    "11": "wi-thunderstorm",
    "13": "wi-snow",
    "50": "wi-fog"
  };

  const key = iconCode.slice(0, 2); // removes last character (d or n)
  return baseMap[key] || "wi-na";
}