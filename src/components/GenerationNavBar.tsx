import {
  ExternalLinkIcon,
  CopyIcon,
  ChevronDownIcon,
  DownloadIcon,
} from "@chakra-ui/icons";
import {
  HStack,
  Tooltip,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";

type Props = {
  onCopy: () => void;
  screenSize: { width: number; height: number };
};

const GenerationNavBar = ({ onCopy, screenSize }: Props) => {
  const toast = useToast();
  return (
    <Stack
      direction={screenSize.width > 1300 ? "row" : "column"}
      w="100%"
      align="center"
    >
      <Button
        colorScheme="green"
        _hover={{ opacity: 1 }}
        w={screenSize.width < 1300 ? "100%" : "100px"}
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "Resource link copied!",
            duration: 3000,
            status: "success",
            isClosable: true,
          });
        }}
      >
        Share <ExternalLinkIcon ml={2} />
      </Button>
      <Button
        w={screenSize.width < 1300 ? "100%" : "100px"}
        colorScheme="telegram"
        _hover={{ opacity: 1 }}
        minW={100}
        onClick={onCopy}
      >
        Copy <CopyIcon ml={2} />
      </Button>
      {/* <Tooltip label="Download">
          <Button
            colorScheme="green"
            onClick={onDownloadDoc}
            isLoading={downloadLoading}
          >
            {!isFull ? "Download" : <DownloadIcon />}
          </Button>
        </Tooltip> */}
      {/* <Menu>
          <Tooltip label="Download">
            <MenuButton
              colorScheme="green"
              bg="#37A169"
              isLoading={downloadLoading}
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              {!isFull ? "Download" : <DownloadIcon />}
            </MenuButton>
          </Tooltip>

          <MenuList>
            <MenuItem onClick={onPDF}>PDF</MenuItem>
            <MenuItem
              onClick={onDownloadDoc}
            >{`Docx (no formatting)`}</MenuItem>
          </MenuList>
        </Menu> */}
    </Stack>
  );
};

export default GenerationNavBar;
