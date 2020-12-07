const shouldRedirecToGroceryList = () =>
  !!localStorage.getItem(APP_CONSTANTS.currentUser);

if (shouldRedirecToGroceryList()) window.location.href = "../index.html";
const signInBtn = document.getElementById("signInBtn");

const isUserPresent = (name) =>
  !!localStorage.getItem(APP_CONSTANTS.users) &&
  JSON.parse(localStorage.getItem(APP_CONSTANTS.users)).find(
    (user) => user.name === name
  );

const setCurrentUser = (name) =>
  localStorage.setItem(APP_CONSTANTS.currentUser, name);

const isPasswordCorrect = (name, password) =>
  JSON.parse(localStorage.getItem(APP_CONSTANTS.users)).find(
    (user) => user.name === name
  )?.password === password;

const onSignInClick = (event) => {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (isUserPresent(userName) && isPasswordCorrect(password)) {
    setCurrentUser(userName);
    window.location.href = "../index.html";
  } else {
    const newUsers = JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
      ? JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
      : [];

    if (newUsers.length === 3) {
      localStorage.removeItem(newUsers[newUsers.length - 1].name);
      newUsers.splice(newUsers.length - 1, 1);
    }
    newUsers.push({ name: userName, password });
    localStorage.setItem(APP_CONSTANTS.users, JSON.stringify(newUsers));
    setCurrentUser(userName);
    window.location.href = "../index.html";
  }
};
signInBtn.addEventListener("click", onSignInClick);
