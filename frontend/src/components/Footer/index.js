import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.designerDiv}>
          <i class="far fa-copyright"> 2021 Salt City Swing</i>
          <div className={styles.designerInfo}>
          <p className={styles.designer}>Irina Amzashvili</p>
          <a
            className={styles.iconAnchor}
            href="https://github.com/IrinaAmzashvili"
            target="_blank"
            rel="noreferrer"
            >
            <i
              className={`fab fa-github ${(styles.githubIcon, styles.icon)}`}
              ></i>
          </a>
          <a
            className={styles.iconAnchor}
            href="https://www.linkedin.com/in/irina-amzashvili-683136211/"
            target="_blank"
            rel="noreferrer"
            >
            {/* <i class="fab fa-linkedin-in"></i> */}
            <i
              className={`fab fa-linkedin ${
                (styles.linkedinIcon, styles.icon)
              }`}
              ></i>
          </a>
              </div>
        </div>
        <div className={styles.linksDiv}>
          <a
            className={styles.scsSite}
            href="https://saltcityswing.org/"
            target="_blank"
            rel="noreferrer"
          >
            Salt City Swing website
          </a>
          <div className={styles.linkIcons}>
            <a
              className={styles.iconAnchor}
              href="https://www.instagram.com/salt.city.swing/"
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
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
