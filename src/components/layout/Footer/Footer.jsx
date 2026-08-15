import Container from "../../ui/Container/Container";
import Link from "next/link";
import Logo from "../../../assets/images/common/logo-antik.png";
import styles from "./Footer.module.css";
import LanguageSwitcher from "../../ui/LanguageSwitcher/LanguageSwitcher"; 

function Footer() {
    return (
        <footer className={styles.footer}>

            <img
                className={styles.backgroundLogo}
                src={Logo.src}
                alt=""
                aria-hidden="true"
            />

            <Container>

                <div className={styles.content}>

                    <nav className={styles.column}>
                        <h3 className={styles.heading}>Explore</h3>
                        <Link href="/">Home</Link>
                        <Link href="/surftrips">Trips</Link>
                        <Link href="/events">Events</Link>
                        <Link href="/shop">Shop</Link>
                        
                    </nav>

                    <section className={styles.column}>
                        <h3 className={styles.heading}>Contact</h3>

                        <a href="mailto:antiksurfclub@gmail.com">
                            antiksurfclub@gmail.com
                        </a>

                        <a href="https://wa.me/212644078565">
                            +212 644 078565
                        </a>

                        <a
                            href="https://instagram.com/antiksurfclub"
                            target="_blank"
                            rel="noreferrer"
                        >
                            @antiksurfclub
                        </a>
                    </section>

                    <address className={styles.column}>
                        <h3 className={styles.heading}>Location</h3>
                        
                        <a
                            href="https://www.google.com/maps/place/Antik+Surf+Club/@35.4655711,-6.0431202,17z/data=!3m1!4b1!4m6!3m5!1s0xd0b94e43dec7599:0xab1e76071e16bc12!8m2!3d35.4655668!4d-6.0405453!16s%2Fg%2F11gh48n4qx?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Rue Ben marzouk, Asilah, Morocco
                        </a>
                    </address>
              </div>

              <div className={styles.language}>
                <LanguageSwitcher />
              </div>

              <div className={styles.bottom}>
                
                   <p>
                        © 2026 Antik Surf Club · Website designed & developed by{" "}
                        <a href="https://nalabsolutions.com" target="_blank" rel="noopener noreferrer">
                        Nalabs
                        </a>
                    </p>
              </div>

            </Container>

        </footer>
    );
}

export default Footer;