"use client";
import { Container, VStack, Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

type Props = {
  userId?: string;
  metadata?: any;
};
export default function LandingPage({ userId, metadata }: Props) {
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    const updateDimension = () => {
      setIsFull(getCurrentDimension().width > 1000);
    };
    window.addEventListener("resize", updateDimension);
    updateDimension();
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [isFull]);

  return (
    <Container
      maxW={isFull ? "80vw" : "inherit"}
      pt={isFull ? "2%" : "8%"}
    ></Container>
  );
}
