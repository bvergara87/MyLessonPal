"use client";
import { Container, VStack, Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Form from "./Form";
import Donation from "./Donation";
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
    <Container maxW={isFull ? "80vw" : "inherit"} pt={isFull ? "2%" : "8%"}>
      <VStack pb={10}>
        <Text
          borderRadius={20}
          color="#6971B2"
          px={4}
          py={1}
          mt={isFull ? 10 : 5}
          background="#ECF2FE"
        >
          #TeachersRock ❤️
        </Text>
        <Text
          fontSize={isFull ? "3xl" : "2xl"}
          textAlign="center"
          fontWeight="bold"
          color="#444444"
          my={2}
        >
          Classroom resources{" "}
          <span
            style={{
              background:
                "-webkit-linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            in seconds
          </span>
        </Text>
        <Text mb={2} textAlign="center" color="gray.600">
          Thousands of teachers and professors use MyLessonPal to create
          evidence-based classroom resources daily
        </Text>
        <Stack
          mt={2}
          mb={10}
          w="100%"
          flexDir={isFull ? "row" : "column"}
          sx={{
            alignItems: isFull ? "flex-start" : "center",
            justifyContent: isFull ? "center" : "center",
          }}
        >
          <Form
            userId={userId}
            isPro={metadata?.pro}
            onClose={() => {}}
            isFull={isFull}
          ></Form>
        </Stack>
        <Donation width={isFull ? "80%" : "full"} isFull={isFull} />
      </VStack>
    </Container>
  );
}
