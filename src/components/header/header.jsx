import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./header.module.css";

const Header = (props) => {
  const [aboutDropDown, setAboutDropDown] = useState(false);
  const [programDropDown, setProgramDropDown] = useState(false);
  const [fnqDropDown, setFnqDropDown] = useState(false);
  const [contactDropDown, setContactDropDown] = useState(false);
  const [navbarMouseEnter, setNavbarMouseEnter] = useState(false);
  const [dropDownMouseEnter, setDropDownMouseEnter] = useState(false);
  const [toggle, setToggle] = useState(false);

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
    setToggle(false);
  };

  const onToggleHandler = () => {
    setToggle(!toggle);
    console.log("SD");
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
      <div className={styles.toggle_container} onClick={onToggleHandler}>
        <i className={`${styles.toggle_button} fas fa-bars`}></i>
      </div>

      <div className={styles.logo_container}>
        <img
          src="/Modoorock/images/logo_dark.png"
          alt="logo"
          className={styles.logo}
          onClick={() => {
            history.push("/");
            window.scrollTo({ top: 0 });
          }}
        />
      </div>

      <nav
        className={`${
          toggle
            ? `${styles.navbar} ${styles.toggle_on}`
            : `${styles.navbar} ${styles.toggle_off}`
        }`}
        onMouseEnter={() => {
          setNavbarMouseEnter(true);
        }}
        onMouseLeave={() => {
          setNavbarMouseEnter(false);
        }}
      >
        <ul className={styles.menu_list}>
          <li className={styles.menu_item} onMouseEnter={aboutDropDownOn}>
            <div className={styles.menu_item_title}>소개</div>
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
                  history.push("/introduce/about");
                  window.scrollTo({ top: 0 });
                }}
              >
                회사소개
              </li>
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/introduce/service");
                  window.scrollTo({ top: 0 });
                }}
              >
                서비스소개
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={programDropDownOn}>
            <div className={styles.menu_item_title}>프로그램</div>
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
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  history.push("/programs");
                  window.scrollTo({ top: 0 });
                }}
              >
                프로그램소개
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={fnqDropDownOn}>
            <div className={styles.menu_item_title}>고객센터</div>
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
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  history.push("/contact");
                  window.scrollTo({ top: 0 });
                }}
              >
                연락처
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div
        className={`${
          toggle
            ? `${styles.login_container} ${styles.toggle_on}`
            : `${styles.login_container} ${styles.toggle_off}`
        }`}
        onClick={onToggleHandler}
      >
        <span
          className={styles.login}
          onClick={() => {
            history.push("/login");
            window.scrollTo({ top: 0 });
          }}
        >
          로그인
        </span>
        <span
          className={styles.signup}
          onClick={() => {
            history.push("/signup");
            window.scrollTo({ top: 0 });
          }}
        >
          회원가입
        </span>
      </div>
    </section>
  );
};

export default Header;
