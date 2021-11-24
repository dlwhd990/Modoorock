import axios from "axios";
import React, { useEffect } from "react";

const KakaoRedirect = (props) => {
  const { Kakao } = window;

  function getParam(sname) {
    let params = window.location.search.substr(
      window.location.search.indexOf("?") + 1
    );

    let sval = "";

    params = params.split("&");
    console.log(params, "dasd");
    let temp;

    for (var i = 0; i < params.length; i++) {
      temp = params[i].split("=");

      if ([temp[0]] == sname) {
        sval = temp[1];
      }
    }

    return sval;
  }

  useEffect(() => {
    const login = (id, name, email, sns) => {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/user/loginsns`, {
          id,
          name,
          email,
          sns,
        })
        .then((response) => {
          if (response.data === "success") {
            window.alert("회원가입이 완료되었습니다. 다시 로그인 해주세요");
            window.location.href = "/modoorock/login";
          } else if (response.data === "loggedin") {
            window.location.href = "/";
          } else {
            window.alert(
              "에러가 발생했습니다. 새로고침 후에 다시 시도해주세요."
            );
          }
        })
        .catch((err) => console.error(err));
    };

    //토큰 로드
    const loadToken = async () => {
      return new Promise((resolve, reject) => {
        const code = getParam("code");
        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_JS_KEY}&redirect_uri=https://localhost:3000/modoorock/kakaoredirect&code=${code}`
        );
        xhr.onload = () => {
          if (xhr.status === 200) {
            let result = xhr.response;
            result = JSON.parse(result);
            console.log(result);
            resolve(result);
          }
        };
        xhr.send();
      });
    };

    //사용자 정보 받기
    const getUserData = async () => {
      Kakao.API.request({
        url: "/v2/user/me",
        success: function (res) {
          login(
            res.id.toString(),
            res.kakao_account.profile.nickname,
            res.kakao_account.email,
            2
          );
        },
        fail: function (error) {
          //
          window.alert("에러 발생");
        },
      });
    };
    loadToken().then((response) => {
      Kakao.Auth.setAccessToken(response.access_token);
      getUserData();
    });
  }, []);

  return <></>;
};

export default KakaoRedirect;
