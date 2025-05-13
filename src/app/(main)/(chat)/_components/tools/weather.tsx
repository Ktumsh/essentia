"use client";

import { format, isWithinInterval } from "date-fns";
import { es } from "date-fns/locale";
import {
  CloudDrizzle,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  CloudSunRain,
  Cloudy,
  Moon,
  Sun,
  Wind,
} from "lucide-react";

import { MoonLoopIcon, SunLoopIcon } from "@/components/icons/interface";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import type { JSX } from "react";

interface WeatherAtLocation {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
  };
  daily_units: {
    time: string;
    sunrise: string;
    sunset: string;
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
}

const SAMPLE = {
  latitude: 37.763283,
  longitude: -122.41286,
  generationtime_ms: 0.027894973754882812,
  utc_offset_seconds: 0,
  timezone: "GMT",
  timezone_abbreviation: "GMT",
  elevation: 18,
  current_units: { time: "iso8601", interval: "seconds", temperature_2m: "°C" },
  current: { time: "2024-10-07T19:30", interval: 900, temperature_2m: 29.3 },
  hourly_units: { time: "iso8601", temperature_2m: "°C" },
  hourly: {
    time: [
      "2024-10-07T00:00",
      "2024-10-07T01:00",
      "2024-10-07T02:00",
      "2024-10-07T03:00",
      "2024-10-07T04:00",
      "2024-10-07T05:00",
      "2024-10-07T06:00",
      "2024-10-07T07:00",
      "2024-10-07T08:00",
      "2024-10-07T09:00",
      "2024-10-07T10:00",
      "2024-10-07T11:00",
      "2024-10-07T12:00",
      "2024-10-07T13:00",
      "2024-10-07T14:00",
      "2024-10-07T15:00",
      "2024-10-07T16:00",
      "2024-10-07T17:00",
      "2024-10-07T18:00",
      "2024-10-07T19:00",
      "2024-10-07T20:00",
      "2024-10-07T21:00",
      "2024-10-07T22:00",
      "2024-10-07T23:00",
      "2024-10-08T00:00",
      "2024-10-08T01:00",
      "2024-10-08T02:00",
      "2024-10-08T03:00",
      "2024-10-08T04:00",
      "2024-10-08T05:00",
      "2024-10-08T06:00",
      "2024-10-08T07:00",
      "2024-10-08T08:00",
      "2024-10-08T09:00",
      "2024-10-08T10:00",
      "2024-10-08T11:00",
      "2024-10-08T12:00",
      "2024-10-08T13:00",
      "2024-10-08T14:00",
      "2024-10-08T15:00",
      "2024-10-08T16:00",
      "2024-10-08T17:00",
      "2024-10-08T18:00",
      "2024-10-08T19:00",
      "2024-10-08T20:00",
      "2024-10-08T21:00",
      "2024-10-08T22:00",
      "2024-10-08T23:00",
      "2024-10-09T00:00",
      "2024-10-09T01:00",
      "2024-10-09T02:00",
      "2024-10-09T03:00",
      "2024-10-09T04:00",
      "2024-10-09T05:00",
      "2024-10-09T06:00",
      "2024-10-09T07:00",
      "2024-10-09T08:00",
      "2024-10-09T09:00",
      "2024-10-09T10:00",
      "2024-10-09T11:00",
      "2024-10-09T12:00",
      "2024-10-09T13:00",
      "2024-10-09T14:00",
      "2024-10-09T15:00",
      "2024-10-09T16:00",
      "2024-10-09T17:00",
      "2024-10-09T18:00",
      "2024-10-09T19:00",
      "2024-10-09T20:00",
      "2024-10-09T21:00",
      "2024-10-09T22:00",
      "2024-10-09T23:00",
      "2024-10-10T00:00",
      "2024-10-10T01:00",
      "2024-10-10T02:00",
      "2024-10-10T03:00",
      "2024-10-10T04:00",
      "2024-10-10T05:00",
      "2024-10-10T06:00",
      "2024-10-10T07:00",
      "2024-10-10T08:00",
      "2024-10-10T09:00",
      "2024-10-10T10:00",
      "2024-10-10T11:00",
      "2024-10-10T12:00",
      "2024-10-10T13:00",
      "2024-10-10T14:00",
      "2024-10-10T15:00",
      "2024-10-10T16:00",
      "2024-10-10T17:00",
      "2024-10-10T18:00",
      "2024-10-10T19:00",
      "2024-10-10T20:00",
      "2024-10-10T21:00",
      "2024-10-10T22:00",
      "2024-10-10T23:00",
      "2024-10-11T00:00",
      "2024-10-11T01:00",
      "2024-10-11T02:00",
      "2024-10-11T03:00",
    ],
    temperature_2m: [
      36.6, 32.8, 29.5, 28.6, 29.2, 28.2, 27.5, 26.6, 26.5, 26, 25, 23.5, 23.9,
      24.2, 22.9, 21, 24, 28.1, 31.4, 33.9, 32.1, 28.9, 26.9, 25.2, 23, 21.1,
      19.6, 18.6, 17.7, 16.8, 16.2, 15.5, 14.9, 14.4, 14.2, 13.7, 13.3, 12.9,
      12.5, 13.5, 15.8, 17.7, 19.6, 21, 21.9, 22.3, 22, 20.7, 18.9, 17.9, 17.3,
      17, 16.7, 16.2, 15.6, 15.2, 15, 15, 15.1, 14.8, 14.8, 14.9, 14.7, 14.8,
      15.3, 16.2, 17.9, 19.6, 20.5, 21.6, 21, 20.7, 19.3, 18.7, 18.4, 17.9,
      17.3, 17, 17, 16.8, 16.4, 16.2, 16, 15.8, 15.7, 15.4, 15.4, 16.1, 16.7,
      17, 18.6, 19, 19.5, 19.4, 18.5, 17.9, 17.5, 16.7, 16.3, 16.1,
    ],
    weather_code: [0, 1, 61],
  },
  daily_units: {
    time: "iso8601",
    sunrise: "iso8601",
    sunset: "iso8601",
  },
  daily: {
    time: [
      "2024-10-07",
      "2024-10-08",
      "2024-10-09",
      "2024-10-10",
      "2024-10-11",
    ],
    sunrise: [
      "2024-10-07T07:15",
      "2024-10-08T07:16",
      "2024-10-09T07:17",
      "2024-10-10T07:18",
      "2024-10-11T07:19",
    ],
    sunset: [
      "2024-10-07T19:00",
      "2024-10-08T18:58",
      "2024-10-09T18:57",
      "2024-10-10T18:55",
      "2024-10-11T18:54",
    ],
  },
};

const weatherIcons: {
  day: Record<string, JSX.Element>;
  night: Record<string, JSX.Element>;
} = {
  day: {
    clear: <Sun size={18} />,
    partlyCloudy: <CloudSun size={18} />,
    mostlyCloudy: <CloudSunRain size={18} />,
    overcast: <Cloudy size={18} />,
    drizzle: <CloudDrizzle size={18} />,
    rain: <CloudRainWind size={18} />,
    snow: <CloudSnow size={18} />,
    hail: <CloudHail size={18} />,
    fog: <CloudFog size={18} />,
    thunderstorm: <CloudLightning size={18} />,
    windy: <Wind size={18} />,
  },
  night: {
    clear: <Moon size={18} />,
    partlyCloudy: <CloudMoon size={18} />,
    mostlyCloudy: <CloudMoonRain size={18} />,
    overcast: <Cloudy size={18} />,
    drizzle: <CloudDrizzle size={18} />,
    rain: <CloudRain size={18} />,
    snow: <CloudSnow size={18} />,
    hail: <CloudHail size={18} />,
    fog: <CloudFog size={18} />,
    thunderstorm: <CloudLightning size={18} />,
    windy: <Wind size={18} />,
  },
};

const getWeatherCondition = (weatherCode: number): string => {
  if (weatherCode === 0) return "clear";
  if ([1, 2].includes(weatherCode)) return "partlyCloudy";
  if (weatherCode === 3) return "overcast";
  if ([45, 48].includes(weatherCode)) return "fog";
  if ([51, 53, 55].includes(weatherCode)) return "drizzle";
  if ([61, 63, 65].includes(weatherCode)) return "rain";
  if ([66, 67].includes(weatherCode)) return "hail";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "snow";
  if ([95, 96, 99].includes(weatherCode)) return "thunderstorm";
  return "clear";
};

function n(num: number): number {
  return Math.ceil(num);
}

export function Weather({
  weatherAtLocation = SAMPLE,
}: {
  weatherAtLocation?: WeatherAtLocation;
}) {
  const currentHigh = Math.max(
    ...weatherAtLocation.hourly.temperature_2m.slice(0, 24),
  );
  const currentLow = Math.min(
    ...weatherAtLocation.hourly.temperature_2m.slice(0, 24),
  );

  const isDay = isWithinInterval(new Date(weatherAtLocation.current.time), {
    start: new Date(weatherAtLocation.daily.sunrise[0]),
    end: new Date(weatherAtLocation.daily.sunset[0]),
  });

  const isMobile = useIsMobile();

  const hoursToShow = isMobile ? 5 : 6;

  // Find the index of the current time or the next closest time
  const currentTimeIndex = weatherAtLocation.hourly.time.findIndex(
    (time) => new Date(time) >= new Date(weatherAtLocation.current.time),
  );

  // Slice the arrays to get the desired number of items
  const displayTimes = weatherAtLocation.hourly.time.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow,
  );
  const displayTemperatures = weatherAtLocation.hourly.temperature_2m.slice(
    currentTimeIndex,
    currentTimeIndex + hoursToShow,
  );

  return (
    <div
      className={cn(
        "skeleton-gradient flex max-w-[500px] flex-col gap-4 rounded-2xl border border-transparent p-4 dark:border-indigo-900",
        {
          "bg-linear-to-tr from-blue-300 to-blue-400": isDay,
        },
        {
          "bg-linear-to-tr from-indigo-900 to-indigo-950 to-50%": !isDay,
        },
      )}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <div className="skeleton-div skeleton-svg size-10 rounded-full">
            {isDay ? (
              <SunLoopIcon className="size-10 text-yellow-300" />
            ) : (
              <MoonLoopIcon className="size-10 text-indigo-100" />
            )}
          </div>
          <div className="text-4xl font-medium text-blue-50">
            {n(weatherAtLocation.current.temperature_2m)}
            {weatherAtLocation.current_units.temperature_2m}
          </div>
        </div>

        <div className="text-blue-50">
          <strong className="mr-3">{n(currentHigh)}°</strong>
          {n(currentLow)}°
        </div>
      </div>

      <div className="flex flex-row justify-between">
        {displayTimes.map((time, index) => {
          const weatherCode =
            weatherAtLocation.hourly.weather_code[currentTimeIndex + index];
          const condition: keyof (typeof weatherIcons)["day"] =
            getWeatherCondition(weatherCode);

          const icon = weatherIcons[isDay ? "day" : "night"][condition] || (
            <Sun className="text-yellow-400" size={21} />
          );

          return (
            <div key={time} className="flex flex-col items-center gap-1">
              <div className="text-xs text-blue-100">
                {format(new Date(time), "p", { locale: es })}
              </div>
              <div
                className={cn(
                  "skeleton-div skeleton-svg grid size-7 place-content-center rounded-full bg-white/80",
                  {
                    "bg-white/80 text-blue-400": isDay,
                  },
                  {
                    "bg-indigo-200/80 text-indigo-950": !isDay,
                  },
                )}
              >
                {icon}
              </div>
              <div className="text-sm text-blue-50">
                {n(displayTemperatures[index])}
                {weatherAtLocation.hourly_units.temperature_2m}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
