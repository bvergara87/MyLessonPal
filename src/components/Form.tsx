import {
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  useToast,
  Checkbox,
  CheckboxGroup,
  Stack,
  Card,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import WaitModal from "./WaitModal";
import Link from "next/link";
type Props = {
  onClose: () => void;
  isPro?: boolean;
  userId?: string;
  isFull: boolean;
};

const types = [
  "Worksheet",
  "Plan",
  "Script",
  "Activity",
  "Project",
  "Quiz",
  "Test",
];
const subjects = [
  "Math",
  "Science",
  "English",
  "Social Studies",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science",
  "Foreign Languages",
  "Custom",
];

const gradeLevels = [
  "Pre-K",
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "College Level",
];

const Form = ({ isFull, onClose, isPro, userId }: Props) => {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [otherSubject, setOtherSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<any>(null);
  const timer = 30;

  const handleSubmit = async (
    event: any,
    context?: string,
    selection?: string,
    adjustments?: string,
    regen?: boolean
  ) => {
    event && event.preventDefault();
    setResponseData(null);
    setLoading(true);
    try {
      const response = await axios.post("/api/generate", {
        promptInput: {
          subject:
            subject === "Custom" && otherSubject && otherSubject !== ""
              ? otherSubject
              : subject,
          gradeLevel,
          topic,
          additionalNotes: adjustments || additionalNotes,
          selectedTypes,
          context,
          selection,
          regen,
        },
      });
      setLoading(false);
      onClose();
      toast({
        render: () => (
          <Card p={4} bg="gray.200">
            <HStack>
              <CloseButton onClick={() => toast.closeAll()} />
            </HStack>
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
        description: `An error occurred while creating your resource. Please try again.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      {loading && (
        <WaitModal
          max={timer * selectedTypes.length}
          selectedTypes={selectedTypes}
          isOpen={loading}
          isFull={isFull}
          initCount={timer * selectedTypes.length}
          handleClose={() => setLoading(false)}
          responseData={responseData}
        ></WaitModal>
      )}

      <form
        style={{ width: "100%", maxWidth: "625px" }}
        onSubmit={handleSubmit}
      >
        <VStack spacing={4} mt={4} w="100%">
          <Select
            size="lg"
            isRequired
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </Select>
          {subject === "Custom" && (
            <Input
              placeholder="Custom Subject"
              isRequired
              max={100}
              value={otherSubject}
              onChange={(e) => setOtherSubject(e.target.value.slice(0, 100))}
            />
          )}
          <Select
            size="lg"
            isRequired
            placeholder="Grade Level"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
          >
            {gradeLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </Select>
          <VStack w="100%">
            <Input
              height="48px"
              fontSize="18px"
              placeholder="Topic"
              isRequired
              max={100}
              value={topic}
              onChange={(e) => setTopic(e.target.value.slice(0, 100))}
            />
          </VStack>
          <HStack>
            <CheckboxGroup
              colorScheme="purple"
              value={selectedTypes}
              onChange={(value: string[]) => setSelectedTypes(value)}
            >
              <Stack spacing={[1, 5]} direction={["column", "row"]}>
                {types.map((type, index) => (
                  <Checkbox
                    size={isFull ? "md" : "lg"}
                    key={index}
                    value={type}
                  >
                    {type}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </HStack>
          <VStack w="100%" position="relative">
            <Textarea
              rows={4}
              // isDisabled={!isPro}
              placeholder={`Add details (e.g number of questions, educational standards to align with, etc.)`}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            />
          </VStack>
        </VStack>
        <HStack justify="center" mt={4}>
          <Button
            type="submit"
            colorScheme="purple"
            transitionDuration=".2s"
            transitionTimingFunction="ease-in"
            bgGradient="linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)"
            size="lg"
          >
            Generate
          </Button>
        </HStack>
      </form>
    </>
  );
};

export default Form;
