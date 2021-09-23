import React from "react";
import styles from "./header.module.css";

const Header = (props) => {
  return (
    <section className={styles.header}>
      <div className={styles.logo_container}>
        <span className={styles.logo}>모두락</span>
      </div>
      <nav className={styles.navbar}>
        <ul className={styles.menu_list}>
          <li className={styles.menu_item}>About</li>
          <li className={styles.menu_item}>Program</li>
          <li className={styles.menu_item}>F&Q</li>
          <li className={styles.menu_item}>Contact</li>
        </ul>
      </nav>
      <div className={styles.login_container}>
        <img
          src="/images/default_profile_image.jpeg"
          alt="profile_image"
          className={styles.profile_image}
        />
        <button className={styles.login_button}>Login</button>
      </div>
    </section>
  );
};

export default Header;
