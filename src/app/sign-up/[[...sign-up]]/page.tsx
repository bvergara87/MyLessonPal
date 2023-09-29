"use client";
import {
  Card,
  Stack,
  Button,
  VStack,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import { useEffect, useState } from "react";
function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
export default function Page() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const isFull = screenSize.width > 1200;
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  return (
    <Stack
      w="100%"
      mt="5%"
      align="center"
      direction={isFull ? "row" : "column"}
    >
      <VStack w={isFull ? "50%" : "80%"} align="center" justify="center">
        <VStack align="center">
          <Text fontSize={isFull ? "2xl" : "lg"} fontWeight="bold">
            Create classroom resources without limits
          </Text>
          <Text fontSize={isFull ? "lg" : "sm"} fontWeight={300}>
            7-day Free Trial, only $7.99 per month after. Cancel at anytime.
          </Text>

          <Card w="100%" my={2} bg="gray.100" p={4} boxShadow="none">
            <HStack align="center">
              <Text mr={4} fontSize={45}>
                🚀
              </Text>
              <VStack align="start">
                <Text fontSize={isFull ? "lg" : "md"} fontWeight={500}>
                  Faster resource generation.
                </Text>
                <Text fontSize={isFull ? "md" : "sm"} fontWeight={300}>
                  Save time and generate more resources. Speeds up to 2x faster.
                </Text>
              </VStack>
            </HStack>
          </Card>
          <Card w="100%" bg="gray.100" p={4} my={2} boxShadow="none">
            <HStack align="center">
              <Text mr={4} fontSize={45}>
                🧠
              </Text>
              <VStack align="start">
                <Text fontSize={isFull ? "lg" : "md"} fontWeight={500}>
                  Additional Notes.
                </Text>
                <Text fontSize={isFull ? "md" : "sm"} fontWeight={300}>
                  Add additional context to your resources to get exactly what
                  you want.
                </Text>
              </VStack>
            </HStack>
          </Card>
          <Card w="100%" bg="gray.100" mt={2} mb={4} p={4} boxShadow="none">
            <HStack align="center">
              <Text mr={4} fontSize={45}>
                📞
              </Text>
              <VStack align="start">
                <Text fontSize={isFull ? "lg" : "md"} fontWeight={500}>
                  Direct support
                </Text>
                <Text
                  fontSize={isFull ? "md" : "sm"}
                  fontWeight={300}
                  whiteSpace="pre-wrap"
                >
                  {`Can't seem to generate what you're looking for?\nWe're here to help.`}
                </Text>
              </VStack>
            </HStack>
          </Card>
        </VStack>
      </VStack>
      <VStack w={isFull ? "50%" : "100%"} align="center" justify="center">
        <SignUp></SignUp>
      </VStack>
    </Stack>
  );
}
