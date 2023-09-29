import {
  Card,
  Image,
  Box,
  Text,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
  isFull: boolean;
  width: string;
};

const Donation = ({ isFull, width }: Props) => {
  return (
    <VStack
      background="#ECF2FE"
      borderRadius={10}
      w={width}
      alignItems="center"
    >
      <VStack spacing={8} w="80%" py={8} align="start">
        <Text
          color="gray.600"
          fontSize={isFull ? "2xl" : "xl"}
          style={{ width: "100%", display: "inline-block" }}
        >
          Created by the team at{" "}
          <Link
            target="_blank"
            href="https://www.every.org/dexter?utm_campaign=donate-link#/donate/card"
          >
            <Image
              transform="translateY(6px)"
              ml={isFull ? 2 : 0}
              mr={2}
              display="inline-block"
              src="/DexterLogo.png"
              alt="logo"
              width="100px"
            ></Image>
          </Link>
          seeking to provide free resources for educators around the world.
        </Text>
        <Text color="gray.600" fontWeight={300} fontSize="lg">
          Projects like MLP would not be possible if not for our community of
          generous donors.
        </Text>
        <Text color="gray.600" fontWeight={300} fontSize="lg">
          If you would like to contribute to the development of MyLessonPal and
          other free tools, please consider making a donation to the Dexter
          Foundation.{" "}
        </Text>
        <HStack justify="center" w="full" mt={4}>
          <Link
            target="_blank"
            href="https://www.every.org/dexter?utm_campaign=donate-link#/donate/card"
          >
            <Button
              fontWeight={400}
              borderRadius={10}
              size={isFull ? "lg" : "md"}
              _hover={{ opacity: 1 }}
              bg="linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)"
              color="white"
            >
              Make a Tax-Deductible Donation
            </Button>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Donation;
