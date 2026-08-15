import Container from "../../ui/Container/Container";
import Brand from "../../ui/Brand/Brand";

import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.content}>

          <MobileMenu />

          <Brand />

          <CartButton />

        </div>
      </Container>
    </header>
  );
}

export default Header;