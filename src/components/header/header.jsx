import React, { useState } from "react";
import { useHistory } from "react-router";
import { useEffect } from "react/cjs/react.development";
import styles from "./header.module.css";

const Header = (props) => {
  const [aboutDropDown, setAboutDropDown] = useState(false);
  const [programDropDown, setProgramDropDown] = useState(false);
  const [fnqDropDown, setFnqDropDown] = useState(false);
  const [contactDropDown, setContactDropDown] = useState(false);
  const [navbarMouseEnter, setNavbarMouseEnter] = useState(false);
  const [dropDownMouseEnter, setDropDownMouseEnter] = useState(false);

  const history = useHistory();

  const aboutDropDownOn = () => {
    setAboutDropDown(true);
    setProgramDropDown(false);
    setFnqDropDown(false);
    setContactDropDown(false);
  };

  const programDropDownOn = () => {
    setAboutDropDown(false);
    setProgramDropDown(true);
    setFnqDropDown(false);
    setContactDropDown(false);
  };

  const fnqDropDownOn = () => {
    setAboutDropDown(false);
    setProgramDropDown(false);
    setFnqDropDown(true);
    setContactDropDown(false);
  };

  const contactDropDownOn = () => {
    setAboutDropDown(false);
    setProgramDropDown(false);
    setFnqDropDown(false);
    setContactDropDown(true);
  };

  const dropDownAllOff = () => {
    setAboutDropDown(false);
    setProgramDropDown(false);
    setFnqDropDown(false);
    setContactDropDown(false);
  };

  useEffect(() => {
    if (!dropDownMouseEnter && !navbarMouseEnter) {
      setAboutDropDown(false);
      setProgramDropDown(false);
      setFnqDropDown(false);
      setContactDropDown(false);
    }
  }, [dropDownMouseEnter, navbarMouseEnter]);

  return (
    <section className={styles.header}>
      <div className={styles.logo_container}>
        <span
          className={styles.logo}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        >
          모두락
        </span>
      </div>
      <nav
        className={styles.navbar}
        onMouseEnter={() => {
          setNavbarMouseEnter(true);
        }}
        onMouseLeave={() => {
          setNavbarMouseEnter(false);
        }}
      >
        <ul className={styles.menu_list}>
          <li className={styles.menu_item} onMouseEnter={aboutDropDownOn}>
            <div className={styles.menu_item_title}>About</div>
            <ul
              className={`${
                aboutDropDown
                  ? `${styles.drop_down_menu} ${styles.on}`
                  : `${styles.drop_down_menu} ${styles.off}`
              }`}
              onMouseEnter={() => {
                setDropDownMouseEnter(true);
              }}
              onMouseLeave={() => {
                setDropDownMouseEnter(false);
              }}
            >
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/about");
                  window.scrollTo({ top: 0 });
                }}
              >
                회사소개
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={programDropDownOn}>
            <div className={styles.menu_item_title}>Program</div>
            <ul
              className={`${
                programDropDown
                  ? `${styles.drop_down_menu} ${styles.on}`
                  : `${styles.drop_down_menu} ${styles.off}`
              }`}
              onMouseEnter={() => {
                setDropDownMouseEnter(true);
              }}
              onMouseLeave={() => {
                setDropDownMouseEnter(false);
              }}
            >
              <li className={styles.drop_down_menu_item}>프로그램소개</li>
              <li className={styles.drop_down_menu_item}>미정</li>
              <li className={styles.drop_down_menu_item}>미정</li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={fnqDropDownOn}>
            <div className={styles.menu_item_title}>F&Q</div>
            <ul
              className={`${
                fnqDropDown
                  ? `${styles.drop_down_menu} ${styles.on}`
                  : `${styles.drop_down_menu} ${styles.off}`
              }`}
              onMouseEnter={() => {
                setDropDownMouseEnter(true);
              }}
              onMouseLeave={() => {
                setDropDownMouseEnter(false);
              }}
            >
              <li className={styles.drop_down_menu_item}>공지사항</li>
              <li className={styles.drop_down_menu_item}>문의게시판</li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={contactDropDownOn}>
            <div className={styles.menu_item_title}>Contact</div>
            <ul
              className={`${
                contactDropDown
                  ? `${styles.drop_down_menu} ${styles.on}`
                  : `${styles.drop_down_menu} ${styles.off}`
              }`}
              onMouseEnter={() => {
                setDropDownMouseEnter(true);
              }}
              onMouseLeave={() => {
                setDropDownMouseEnter(false);
              }}
            >
              <li className={styles.drop_down_menu_item}>연락처</li>
            </ul>
          </li>
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
