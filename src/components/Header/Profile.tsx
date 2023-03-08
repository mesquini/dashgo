import { Flex, Avatar, Box, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align={"center"}>
      {showProfileData && (
        <Box mr="4" textAlign={"right"}>
          <Text>Victor Mesquini</Text>
          <Text color="gray.300" fontSize={"small"}>
            mesquini@live.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Victor Mesquini"
        src="https://github.com/mesquini.png"
      />
    </Flex>
  );
}
