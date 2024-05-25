import { Input, Box, Text, Container, Heading } from "@chakra-ui/react";
import { useAccount, useApi, useAlert } from "@gear-js/react-hooks";
import { web3FromSource } from "@polkadot/extension-dapp";
import { decodeAddress, ProgramMetadata } from "@gear-js/api";
import { Button } from "@gear-js/ui";

function ProductOwner() {
  const alert = useAlert();
  const { accounts, account } = useAccount();
  const { api } = useApi();

  // Add your programID
  const programIDFT =
    "0xe366d34eb97886cae854089e808f434ab963c7649cb204b1fe395909367e9b53"; // Example

  // Add your metadata.txt
  const meta = "Add your metadata.txt";

  const metadata = ProgramMetadata.from(meta);

  const message: any = {
    destination: programIDFT, // programId
    payload: {
      transfer: [decodeAddress("from:"), decodeAddress("to:"), 150],
    },
    gasLimit: 899819245,
    value: 0,
  };

  const signer = async () => {
    const localaccount = account?.address;
    const isVisibleAccount = accounts.some(
      (visibleAccount) => visibleAccount.address === localaccount
    );

    if (isVisibleAccount) {
      // Create a message extrinsic
      const transferExtrinsic = await api.message.send(message, metadata);

      const injector = await web3FromSource(accounts[0].meta.source);

      transferExtrinsic
        .signAndSend(
          account?.address ?? alert.error("No account"),
          { signer: injector.signer },
          ({ status }) => {
            if (status.isInBlock) {
              alert.success(status.asInBlock.toString());
            } else {
              if (status.type === "Finalized") {
                alert.success(status.type);
              }
            }
          }
        )
        .catch((error: any) => {
          console.log(":( transaction failed", error);
        });
    } else {
      alert.error("Account not available to sign");
    }
  };
  return (
    <Container w="100%" h="100%">
      <Heading mt="4rem">
        List your project to star selling bonds right away!
      </Heading>
      <Box mt="4rem">
        <Box>
          <Text>Project Name</Text>
          <Input placeholder="Project Name" />
        </Box>
        <Box>
          <Text>Project Website</Text>
          <Input placeholder="Project Website" />
        </Box>
        <Box>
          <Text>Project Bond Id</Text>
          <Input placeholder="Project Bond Id" />
        </Box>
        <Button text="Tranfer" onClick={signer} />;
      </Box>
    </Container>
  );
}

export { ProductOwner };
