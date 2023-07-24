export function isValidPassword(password) {
  // Проверка длины пароля (не менее 8 символов)
  // if (password.length < 8) {
  //   return false;
  // }

  // Проверка сложности пароля (наличие строчных и прописных букв, цифр и специальных символов)
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const digitRegex = /[0-9]/;
  const specialCharRegex = /[^a-zA-Z0-9]/;

  // if (
  //   password.length < 8 ||
  //   !lowercaseRegex.test(password) ||
  //   !uppercaseRegex.test(password) ||
  //   !digitRegex.test(password) ||
  //   !specialCharRegex.test(password)
  // ) {
    return [
      { name: "Наличие строчных букв.", status: !lowercaseRegex.test(password) },
      { name: "Наличие заглавных букв.", status: !uppercaseRegex.test(password) },
      { name: "Наличие цифр.", status: !digitRegex.test(password) },
      { name: "Наличие спец. символов, например: !@#$%^&*.", status: !specialCharRegex.test(password) },
      { name: "Длина не менее 8 символов.", status: password.length < 8 },
    ];
  // }

  // return false;
}
