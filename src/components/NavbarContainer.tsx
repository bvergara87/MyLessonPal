"use client";
import { metadata } from "@/app/layout";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Card,
  Image,
  HStack,
  Button,
  MenuButton,
  MenuItem,
  Menu,
  MenuList,
  VStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import Form from "./Form";
type Props = {};
function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
const NavbarCard = ({}: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const btnRef = useRef();
  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };
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
    <>
      <Modal isOpen={isOpen} size="2xl" onClose={onClose}>
        <ModalOverlay />

        <ModalContent position="relative">
          <ModalBody w="100%">
            <Form isFull={isFull} onClose={() => onClose()} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <HStack
        mt={isFull ? 2 : 6}
        w="100%"
        justifyContent="center"
        align="center"
      >
        <Card boxShadow="none" p={4} w={isFull ? "82%" : "100%"}>
          <HStack w="100%" align="center" justify="space-between">
            <Button px={0} variant="ghose" onClick={() => router.push("/")}>
              <Image
                src="/mlpdexter.png"
                alt="logo"
                width={isFull ? "150px" : "100px"}
              ></Image>
            </Button>
            <HStack>
              {/* <Link href="https://about.mylessonpal.com/">
                  <Button
                    fontWeight={400}
                    py={1}
                    px={3}
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                  >
                    About this Project
                  </Button>
                </Link> */}
              {/* <Link href="https://about.mylessonpal.com/for-schools">
                  <Button
                    fontWeight={400}
                    py={1}
                    px={3}
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                  >
                    For Schools
                  </Button>
                </Link>
                <Link href="https://about.mylessonpal.com/sponsors">
                  <Button
                    fontWeight={400}
                    py={1}
                    px={3}
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Sponsors
                  </Button>
                </Link>
                <Link href="https://about.mylessonpal.com/#contact">
                  <Button
                    fontWeight={400}
                    py={1}
                    px={3}
                    variant="ghost"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Contact Us
                  </Button>
                </Link> */}
              <Link href="https://www.every.org/dexter?utm_campaign=donate-link#/donate/card">
                <Button
                  fontWeight={400}
                  borderRadius={10}
                  size="sm"
                  _hover={{ opacity: 1 }}
                  bg="linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)"
                  color="white"
                >
                  Make a donation
                </Button>
              </Link>
            </HStack>
            {/* <Menu direction="rtl">
                {({ isOpen }) => (
                  <>
                    <MenuButton isActive={isOpen} as={Button}>
                      <HamburgerIcon />
                    </MenuButton>
                    <MenuList
                      p={5}
                      style={{
                        background: "#565656",
                        color: "white",
                        borderRadius: 10,
                      }}
                    >
                      <VStack align="start">
                        <Link href="https://about.mylessonpal.com/">
                          <Button
                            fontWeight={400}
                            variant="ghost"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                          >
                            About this Project
                          </Button>
                        </Link>
                        <Link href="https://about.mylessonpal.com/for-schools">
                          <Button
                            fontWeight={400}
                            variant="ghost"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                          >
                            For Schools
                          </Button>
                        </Link>
                        <Link href="https://about.mylessonpal.com/sponsors">
                          <Button
                            fontWeight={400}
                            variant="ghost"
                            color="white"
                            _hover={{ textDecoration: "underline" }}
                          >
                            Sponsors
                          </Button>
                        </Link>
                        <Link href="https://about.mylessonpal.com/#contact">
                          <Button
                            borderRadius={25}
                            fontWeight={400}
                            color="white"
                            variant="ghost"
                            _hover={{ textDecoration: "underline" }}
                          >
                            Contact Us
                          </Button>
                        </Link>
                        <HStack mt={2} justify="center">
                          <Link href="https://www.every.org/dexter?utm_campaign=donate-link#/donate/card">
                            <Button
                              fontWeight={400}
                              bg="linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)"
                              color="white"
                              _hover={{ opacity: 1 }}
                            >
                              Make a donation
                            </Button>
                          </Link>
                        </HStack>
                      </VStack>
                    </MenuList>
                  </>
                )}
              </Menu> */}
          </HStack>
        </Card>
      </HStack>
    </>
  );
};

export default NavbarCard;
