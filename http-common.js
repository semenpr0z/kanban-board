import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;

export default axios.create({
  baseURL: `https://translate.api.cloud.yandex.net/`,
  headers: {
    "Content-Type": "application/json",
    // 'Authorization': 'Bearer t1.9euelZqdicecyMbJnouPic2MnpWRke3rnpWamI6MypKJmc6TmMaOjMyVycfl9PdSJWVZ-e8CJiiH3fT3ElRiWfnvAiYoh83n9euelZqQz5aNlovIj5Oax8ack86Riu_8xeuelZqQz5aNlovIj5Oax8ack86Rig.bflxA4ErVvkBa_S9QleMbKYkI2E0NMf23s8KPoXRleiApWZLYl3Gl41CZfaCned_XaycRXnDtEeYV8TZc_hjDA',
    Authorization: "Api-Key AQVNx78TaJp1CkkH228LAI0_3a8cPNGjHpQ193Ri",
  },
});

// "serviceAccountId": "ajefsdf5rskbhn2l42u3"
