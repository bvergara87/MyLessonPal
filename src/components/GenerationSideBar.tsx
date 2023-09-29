import { Output } from "@/app/gen/[id]/page";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import {
  VStack,
  HStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Code,
  Text,
  Textarea,
  Stack,
  MenuItem,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import GenerationNavBar from "./GenerationNavBar";

type Props = {
  selection: string;
  text: string;
  subject: string;
  outputs: Output[];
  selectedIndex: number;
  onCopy: () => void;
  onRegen: (
    event: any,
    context: string,
    selection?: string,
    adjustments?: string,
    regen?: boolean
  ) => void;
  screenSize: { height: number; width: number };
};

const GenerationSideBar = ({
  screenSize,
  onCopy,
  selectedIndex,
  selection,
  text,
  outputs,
  onRegen,
}: Props) => {
  const [adjustments, setAdjustments] = useState("");
  return (
    <VStack align="start" w="100%">
      <Text color="gray">
        Highlight any text you would like to change and/or request changes you
        wish to make to your resource.
      </Text>
      {selection !== "" && (
        <VStack w="100%" align="start">
          <Text mt={4}>Selected text:</Text>
          <Code maxH="30vh" w="100%" overflowY="scroll" whiteSpace="pre-wrap">
            {selection}
          </Code>
        </VStack>
      )}
      <Textarea
        rows={4}
        placeholder="e.g. Instead of 10 questions, make this quiz have 20 questions, Add more context about *topic* to this worksheet, etc."
        value={adjustments}
        onChange={(e) => setAdjustments(e.target.value)}
      />
      <Stack
        w="100%"
        justify="space-between"
        direction={screenSize.width > 1300 ? "row" : "column-reverse"}
      >
        {outputs && outputs[selectedIndex] && (
          <GenerationNavBar onCopy={onCopy} screenSize={screenSize} />
        )}
        <Button
          w={screenSize.width < 1300 ? "100%" : "125px"}
          type="submit"
          colorScheme="purple"
          transitionDuration=".2s"
          transitionTimingFunction="ease-in"
          bgGradient="linear-gradient(90deg, rgba(107,26,205,1) 0%, rgba(115,159,241,1) 100%)"
          onClick={() => onRegen(null, text, selection, adjustments, true)}
        >
          Regenerate
        </Button>
      </Stack>
    </VStack>
  );
};

export default GenerationSideBar;
