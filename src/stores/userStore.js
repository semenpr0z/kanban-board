import { defineStore } from "pinia";
import { auth } from "@/firebase/index.js";
import router from "@/router.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  updatePhoneNumber,
} from "firebase/auth";

console.log("запуск");

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null,
    userInfoPending: false,
    userAlerts: [],
    verificationInProgress: false,
    userAuthPending: false
  }),
  actions: {
    async logIn(user) {
      this.userAuthPending = true
      const { email, password } = user;

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case "auth/user-not-found":
            alert("Пользователь не найден");
            break;
          case "auth/wrong-password":
            alert("Неправльный пароль");
            break;
          default:
            alert(error.massage);
        }
        this.userAuthPending = false
        return;
      }

      this.user = auth.currentUser;
      console.log(this.user);

      localStorage.setItem("user", JSON.stringify(this.user));

      this.userAuthPending = false
      router.push("/");
    },
    async register(user) {
      this.userAuthPending = true
      const { name, email, password } = user;

      try {
        // Создание пользователя с электронной почтой и паролем
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        // Обновление профиля пользователя с именем
        await updateProfile(user, {
          displayName: name,
        });

        console.log("Пользователь успешно зарегистрирован и имя сохранено");
        this.user = auth.currentUser;
        localStorage.setItem("user", JSON.stringify(this.user));
        this.userAuthPending = false;
        router.push("/");
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            alert("Пользователь с таким email уже существует");
            break;
          case "auth/invalid-email":
            alert("Неправильный email");
            break;
          case "auth/operation-not-allowed":
            alert("Операция не разрешена");
            break;
          case "auth/weak-password":
            aler("Слишком простой пароль");
            break;
          default:
            alert(error.massage);
        }
        this.userAuthPending = false;
        return;

      }
    },
    async clearUser() {
      await signOut(auth);
      localStorage.removeItem("user");

      router.push("/");

      this.user = null;
    },
    initializeUserFromLocalStorage() {
      this.userInfoPending = true;

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("Обновленные данные пользователя:", user);
          this.user = user;
          this.userInfoPending = false;
        } else {
          this.userInfoPending = false;
        }
      });
    },
    async checkPassword(password) {
      const email = this.user.email;
      // console.log({ email: email, password: password });
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return true
      } catch (error) {
        return false
      }
    },
    async sendEmailVerification() {
      const user = auth.currentUser;

      try {
        await sendEmailVerification(user);
        // console.log("Письмо с подтверждением электронной почты отправлено");
        this.userAlerts.push({
          header: "Подтверждение отправлено",
          mainText: "Пожалуйста, проверьте свою электронную почту",
        });
      } catch (error) {
        console.log(
          "Ошибка отправки письма с подтверждением электронной почты:",
          error
        );
      }
    },
    deleteAlert(index) {
      this.userAlerts.splice(index, 1);
    },
    // async updatePhoneNumber(newPhoneNumber) {
    //   const user = auth.currentUser;
    //   const numericPhoneNumber = newPhoneNumber.replace(/\D/g, "");
    //   console.log(user);
    //   try {
    //     await updatePhoneNumber(user, numericPhoneNumber);
    //     // Успешное обновление телефона
    //     console.log("Телефон пользователя успешно изменен");
    //   } catch (error) {
    //     // Обработка ошибок
    //     console.error("Ошибка при изменении телефона пользователя:", error);
    //   }
    // }
  },
});
