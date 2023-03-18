import React from 'react';
import { Grid, Text, Box, Flex, ListItem, UnorderedList, HStack } from '@chakra-ui/react';

export const Assets: React.FC = () => (
  <Grid
    padding="10px"
    p={{ base: '14px', ml: '25px', md: '25px' }}
    templateRows="repeat(4, auto)"
    templateColumns="repeat(2, 1fr)"
    gap={4}
    background="rgba(0, 18, 183, 0.35)"
    borderRadius="8px"
    width="340px"
    height="400px"
    maxWidth="100%"
    marginRight="10px"
  >
    <Text
      fontFamily="Futura MD BT"
      fontWeight="light"
      fontSize="24px"
      color="#FFFFFF"
      textAlign="center"
      paddingRight="30px"
      gridColumn="1 / 3"
    >
      Ibc & Eth Assets
    </Text>
    <Flex direction="column">
      <Text
        fontFamily="Futura MD BT"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Monthly In
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="18px"
        color="#FFFFFF"
      >
        $12,652,193
      </Text>
    </Flex>
    <Flex direction="column">
      <Text
        fontFamily="Futura MD BT"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Monthly Out
      </Text>
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="18px"
        color="#FFFFFF"
      >
        $6,111,235
      </Text>
    </Flex>
    <Flex direction="column">
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        $65,000
      </Text>
      <Text
        fontFamily="Futura MD BT"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Daily In
      </Text>
    </Flex>
    <Flex direction="column">
      <Text
        fontFamily="futura"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        $12,248
      </Text>
      <Text
        fontFamily="Futura MD BT"
        fontWeight="light"
        fontSize="20px"
        textTransform="capitalize"
        color="#FFFFFF"
      >
        Daily Out
      </Text>
    </Flex>
    <Box
      borderRadius="1px"
      width="100%"
      height="4px"
      background="linear-gradient(270deg, #ff0000 0%, #00ff38 100%)"
      gridColumn="1 / 3"
    />
  <Text
    fontFamily="Futura MD BT"
    fontWeight="light"
    fontSize="20px"
    textTransform="capitalize"
    color="#FFFFFF"
    gridColumn="1 / 3"
  >
    Biggest Movers
  </Text>
  <HStack ml="30px" spacing={12} gridColumn="1 / 3">
    <UnorderedList
      listStyleType="none"
      ml={0}
      pl={0}
      fontFamily="futura"
      fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      <ListItem>1. USDC</ListItem>
      <ListItem>2. ETH</ListItem>
      <ListItem>3. CANTO</ListItem>
      <ListItem>4. ATOM</ListItem>
    </UnorderedList>
    <UnorderedList
      listStyleType="none"
      ml={0}
      pl={0}
      fontFamily="futura"
      fontWeight="light"
      fontSize="18px"
      textTransform="capitalize"
      color="#FFFFFF"
    >
      <ListItem>5. DAI</ListItem>
      <ListItem>6. WETH</ListItem>
      <ListItem>7. Example</ListItem>
      <ListItem>8. Example</ListItem>
    </UnorderedList>
  </HStack>
  </Grid>
);