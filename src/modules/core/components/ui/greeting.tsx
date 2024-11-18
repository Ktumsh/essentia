"use client";

import { useState, useEffect } from "react";

const getCurrentGreeting = () => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Buenos días!";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Buenas tardes!";
  } else {
    return "Buenas noches!";
  }
};

const Greeting = () => {
  const [greeting, setGreeting] = useState(getCurrentGreeting());
  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getCurrentGreeting());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return greeting;
};

export default Greeting;
