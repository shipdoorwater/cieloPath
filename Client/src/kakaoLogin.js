import axios from "axios";

const kakaoHeader = {
  Authorization: "d5533cb32006dfc0c432fe4d62633b4e", // admin
  "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
};

const getKakaoToken = async (code) => {
  try {
    const data = {
      grant_type: "authorization_code",
      client_id: "ad632cadfa2b4394ddf002a933bb5958", // rest api
      redirect_uri: "http://localhost:8080/login",
      code: code
    };

    const queryString = Object.keys(data)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
      .join("&");

    const result = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      queryString,
      { headers: kakaoHeader }
    );
    console.log(result);

    console.log("카카오 토큰", queryString);
    return result;
  } catch (e) {
    return e;
  }
};

export { getKakaoToken };
