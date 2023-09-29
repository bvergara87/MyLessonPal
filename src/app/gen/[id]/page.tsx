"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Text,
  Stack,
  Button,
  HStack,
  useToast,
  VStack,
  Box,
  Card,
  Spinner,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import "./TextModal.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import GenerationSideBar from "@/components/GenerationSideBar";
import GenerationNavBar from "@/components/GenerationNavBar";
import WaitModal from "@/components/WaitModal";
import Link from "next/link";
let EditorNoSSR: any;
EditorNoSSR = dynamic(() => import("../../../components/EditorNoSSR"), {
  ssr: false,
});

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export type Output = {
  type: string;
  text: string;
  subject: string;
  topic: string;
  gradeLevel: string;
  additionalNotes: string;
};
const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const toast = useToast();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isInit, setIsInit] = useState(false);
  const [preview, setPreview] = useState("");
  const [nonHTML, setNonHTML] = useState("");
  const [selection, setSelection] = useState("");
  const [outputs, setOutputs] = useState<Output[]>([]);
  const [responseData, setResponseData] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [regenerating, setRegenerating] = useState(false);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);
    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  const toolbar =
    screenSize.width > 1000
      ? [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline"],
          ["image"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ]
      : [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline"],
          ["image"],
          [{ indent: "-1" }, { indent: "+1" }],
        ];

  const modules = {
    toolbar,
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(nonHTML);
    toast({
      title: "Text copied.",
      description: "The text has been copied to your clipboard.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSelection = (value: string) => {
    setSelection(value);
  };

  const handleRegen = async (
    event: any,
    context?: string,
    selection?: string,
    adjustments?: string,
    regen?: boolean
  ) => {
    event && event.preventDefault();
    setResponseData(null);
    setRegenerating(true);
    try {
      const response = await axios.post("/api/generate", {
        promptInput: {
          subject: outputs[selectedIndex].subject,
          gradeLevel,
          topic: outputs[selectedIndex].topic,
          additionalNotes: adjustments,
          selectedTypes: [outputs[selectedIndex].type],
          context: nonHTML,
          selection,
          regen: true,
        },
      });
      setRegenerating(false);
      toast({
        render: () => (
          <Card p={4} bg="gray.200">
            <Text>Resource regenerated, please view in other tab!</Text>
            <Text fontWeight={300} fontSize="13px" my="10px">
              If your resource does not pop up, click{" "}
              <Link
                style={{ color: "dodgerblue !important" }}
                href={`${window.location.origin}/gen/${response.data.id}`}
                target="_blank"
              >
                here
              </Link>
            </Text>
            <HStack w="100%" justify="end">
              <Button
                size="sm"
                onClick={() => {
                  router.push(`/gen/${response.data.id}`);
                  toast.closeAll();
                }}
              >
                Go To Resource
              </Button>
              <Button
                size="sm"
                colorScheme="telegram"
                onClick={() => {
                  window.open(
                    `${window.location.origin}/gen/${response.data.id}`,
                    "_blank"
                  );
                  toast.closeAll();
                }}
              >
                Open in a new tab
              </Button>
            </HStack>
          </Card>
        ),
        isClosable: true,
        duration: 10000,
      });
      window.open(
        `${window.location.origin}/gen/${response.data.id}`,
        "_blank"
      );
    } catch (error) {
      console.error("Error creating form: ", error);
      toast({
        title: "Error",
        description: `An error occurred. Please try again.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onChange = (content: any, editor: any) => {
    console.log(editor.selection.getContent());
    setNonHTML(editor.getContent({ format: "text" }));
  };

  useEffect(() => {
    if (id) {
      setIsInit(true);
      fetch("/api/db/getGeneration", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          id,
        }),
      })
        .then(async (res) => {
          const arr = await res.json();
          setOutputs(arr);
        })
        .finally(() => {
          setIsInit(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (outputs && outputs.length > 0 && outputs[selectedIndex]) {
      setPreview(outputs[selectedIndex].text);
      setGradeLevel(outputs[selectedIndex].gradeLevel);
      setSubject(outputs[selectedIndex].subject);
      setTopic(outputs[selectedIndex].topic);
      setSelectedTypes([outputs[selectedIndex].type]);
      setAdditionalNotes(outputs[selectedIndex].additionalNotes);
    }
  }, [selectedIndex, outputs, setPreview]);

  return (
    <>
      {regenerating && (
        <WaitModal
          max={30}
          selectedTypes={selectedTypes}
          isOpen={regenerating}
          initCount={30}
          isFull={screenSize.width > 1200}
          handleClose={() => setRegenerating(false)}
          responseData={responseData}
        ></WaitModal>
      )}
      {isInit ? (
        <VStack pt="10%">
          <Spinner thickness="4px" speed="0.65s" color="#815FFE" size="xl" />
        </VStack>
      ) : (
        <VStack mt={screenSize.width > 1000 ? "2%" : "5%"}>
          {outputs && outputs.length > 0 && (
            <HStack w="100%" mt={4}>
              <Text fontSize="md">
                {outputs[selectedIndex].type}{" "}
                {`(${selectedIndex + 1} of ${outputs.length})`}
              </Text>
              {outputs.length > 1 && (
                <HStack mb={2}>
                  <Button
                    size="sm"
                    onClick={() =>
                      setSelectedIndex(
                        (selectedIndex - 1 + outputs.length) % outputs.length
                      )
                    }
                  >
                    <ChevronLeftIcon />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      setSelectedIndex((selectedIndex + 1) % outputs.length)
                    }
                  >
                    <ChevronRightIcon />
                  </Button>
                </HStack>
              )}
            </HStack>
          )}
          <Box w="100%" h={screenSize.width > 1000 ? "80vh" : "70vh"}>
            <Stack
              direction={screenSize.width > 1000 ? "row" : "column"}
              h="100%"
              w="100%"
              pos="relative"
            >
              <VStack
                align="start"
                w={screenSize.width > 1000 ? "66%" : "100%"}
                h="100%"
              >
                <Card w="100%" h="100%" bg="white">
                  {EditorNoSSR && (
                    <EditorNoSSR
                      onSelect={handleSelection}
                      onChange={onChange}
                      text={preview}
                    />
                  )}
                  {screenSize.width < 1000 && (
                    <VStack align="start" mt={4}>
                      <GenerationNavBar
                        screenSize={screenSize}
                        onCopy={handleCopy}
                      />
                    </VStack>
                  )}
                </Card>
              </VStack>

              {screenSize.width > 1000 && (
                <VStack width="33%" px={2}>
                  <Card p={4} backgroundColor="gray.50" w="100%">
                    <GenerationSideBar
                      onCopy={handleCopy}
                      screenSize={screenSize}
                      outputs={outputs}
                      selectedIndex={selectedIndex}
                      subject={subject}
                      selection={selection}
                      text={preview}
                      onRegen={handleRegen}
                    ></GenerationSideBar>
                  </Card>
                </VStack>
              )}
            </Stack>
          </Box>
        </VStack>
      )}
    </>
  );
};

export default Page;
