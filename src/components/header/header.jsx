import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingSpinnerWhite from "../loadingSpinner/loadingSpinnerWhite/loadingSpinnerWhite";
import styles from "./header.module.css";

const Header = ({ user, userLogout }) => {
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
            <div
              className={`${
                aboutDropDown
                  ? `${styles.menu_item_title} ${styles.on}`
                  : `${styles.menu_item_title} ${styles.off}`
              }`}
            >
              소개
            </div>
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
                회사 소개
              </li>
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/introduce/service");
                  window.scrollTo({ top: 0 });
                }}
              >
                서비스 소개
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={programDropDownOn}>
            <div
              className={`${
                programDropDown
                  ? `${styles.menu_item_title} ${styles.on}`
                  : `${styles.menu_item_title} ${styles.off}`
              }`}
            >
              체험상품
            </div>
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
                  dropDownAllOff();
                  history.push("/programs/area");
                  window.scrollTo({ top: 0 });
                }}
              >
                상품 목록
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={fnqDropDownOn}>
            <div
              className={`${
                fnqDropDown
                  ? `${styles.menu_item_title} ${styles.on}`
                  : `${styles.menu_item_title} ${styles.off}`
              }`}
            >
              고객센터
            </div>
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
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/customer/notice");
                  window.scrollTo({ top: 0 });
                }}
              >
                공지사항
              </li>
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/customer/faq");
                  window.scrollTo({ top: 0 });
                }}
              >
                FAQ
              </li>
              <li
                className={styles.drop_down_menu_item}
                onClick={() => {
                  dropDownAllOff();
                  history.push("/customer/inquire");
                  window.scrollTo({ top: 0 });
                }}
              >
                문의게시판
              </li>
            </ul>
          </li>
          <li className={styles.menu_item} onMouseEnter={contactDropDownOn}>
            <div
              className={`${
                contactDropDown
                  ? `${styles.menu_item_title} ${styles.on}`
                  : `${styles.menu_item_title} ${styles.off}`
              }`}
            >
              Contact
            </div>
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
                  dropDownAllOff();
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
      {user === null ? (
        <div
          className={`${
            toggle
              ? `${styles.login_container} ${styles.toggle_on}`
              : `${styles.login_container} ${styles.toggle_off}`
          }`}
        >
          <LoadingSpinnerWhite />
        </div>
      ) : user ? (
        <div
          className={`${
            toggle
              ? `${styles.login_container} ${styles.toggle_on}`
              : `${styles.login_container} ${styles.toggle_off}`
          }`}
          onClick={onToggleHandler}
        >
          <div
            className={styles.profile_container}
            onClick={() => {
              history.push("/mypage/main");
              window.scrollTo({ top: 0 });
            }}
          >
            <i className={`${styles.user_icon} far fa-user`}></i>
            <span className={styles.signup}>마이페이지</span>
          </div>
          <span
            className={styles.logout}
            onClick={() => {
              userLogout();
            }}
          >
            로그아웃
          </span>
        </div>
      ) : (
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
      )}
    </section>
  );
};

export default Header;
