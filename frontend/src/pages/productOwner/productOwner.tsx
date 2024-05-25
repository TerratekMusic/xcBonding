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
  const meta =
    "00020001000000000001030000000105000000000000000000ad03180010106773746418636f6d6d6f6e287072696d6974697665731c4163746f724964000004000401205b75383b2033325d0000040000032000000008000800000503000c0808696f18416374696f6e00010824427579546f6b656e73080118616d6f756e7410010c753634000148626f6e64696e675f70726f6772616d5f696400011c4163746f72496400000044536574426f6e64696e6750726f6772616d040000011c4163746f72496400010000100000050600140808696f144576656e7400010830546f6b656e73426f75676874040010010c7536340000002c4d65737361676553656e7400010000";

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
