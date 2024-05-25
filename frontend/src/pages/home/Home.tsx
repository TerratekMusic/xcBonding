import { Container, Button, Heading, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/main");
  };
  const goToProductO = () => {
    navigate("/productOwner");
  };
  return (
    <Container w="100%" h="100%">
      <Heading>Welcome to xcBonding</Heading>
      <Text>A bond marketplace</Text>
      <Flex justify="space-between">
        <Button onClick={goToMain}>Buy Bonds!</Button>
        <Button onClick={goToProductO}>List your project</Button>
      </Flex>
    </Container>
  );
}

export { Home };
