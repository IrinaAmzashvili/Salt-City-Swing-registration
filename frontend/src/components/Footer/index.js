import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <h2>Hello from footer</h2>
        <div className={styles.designerDiv}>
          <i class="far fa-copyright"> 2021 Irina Amzashvili</i>
          <a
            className={styles.iconAnchor}
            href="https://github.com/IrinaAmzashvili"
            target="_blank"
          >
            <i
              className={`fab fa-github ${(styles.githubIcon, styles.icon)}`}
            ></i>
          </a>
          <a
            className={styles.iconAnchor}
            href="https://www.linkedin.com/in/irina-amzashvili-683136211/"
            target="_blank"
          >
            {/* <i class="fab fa-linkedin-in"></i> */}
            <i
              className={`fab fa-linkedin ${
                (styles.linkedinIcon, styles.icon)
              }`}
            ></i>
          </a>
        </div>
        <div className={styles.linksDiv}>
          <a
            className={styles.scsSite}
            href="https://saltcityswing.org/"
            target="_blank"
          >
            Salt City Swing website
          </a>
          <div className={styles.linkIcons}>
            <a
              className={styles.iconAnchor}
              href="https://www.instagram.com/salt.city.swing/"
              target="_blank"
            >
              <i
                className={`fab fa-instagram ${
                  (styles.instagramIcon, styles.icon)
                }`}
              ></i>
            </a>
            <a
              className={styles.iconAnchor}
              href="https://www.facebook.com/slcswing"
              target="_blank"
            >
              <i
                className={`fab fa-facebook-square ${
                  (styles.facebookIcon, styles.icon)
                }`}
              ></i>
            </a>
            {/* <i className="fab fa-facebook"></i> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
