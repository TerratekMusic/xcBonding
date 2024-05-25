import { Image } from "@chakra-ui/react";
import { Account } from "./account";
import styles from "./Header.module.scss";

import xcBondImage from "../../../assets/images/xcBonding.png";

type Props = {
  isAccountVisible: boolean;
};

function Header({ isAccountVisible }: Props) {
  return (
    <header className={styles.header}>
      <Image>{xcBondImage}</Image>
      {isAccountVisible && <Account />}
    </header>
  );
}

export { Header };
