import { getMethod, postMethod } from "../../utils/axiosInstance/axiosInstance";
// import { useNavigate } from "react-router-dom";

export function registrationSuccess(value = false) {
 return value;
}

export function setRole(userDetails, role, isAuth) {
 return {
  type: "SET-ROLE",
  payload: { userDetails: userDetails, role: role, isAuth: isAuth },
 };
}

export function setLogout() {
 return {
  type: "SET-LOGOUT",
  payload: true,
 };
}
export function setLoginState(loginData) {
 return {
  type: "SET-LOGIN-STATE",
  payload: loginData,
 };
}

export function thunkFunction(methodName, data) {
 return async function (dispatch) {
  switch (methodName) {
   case "Login":
    {
     let { email, password, role } = data;
     role = role.toLowerCase();
     let result;
     console.log(email, password, role);

     if (role === "participant")
      result = await getMethod(
       `https://hackfolic-vb-8.onrender.com/participants?email=${email}&password=${password}&roles[0]=${role}`
      );
     else if (role === "host")
      result = await getMethod(
       `https://hackfolic-vb-8.onrender.com/hosts?email=${email}&password=${password}&roles[0]=${role}`
      );
     else if (role === "admin")
      result = await getMethod(
       `https://hackfolic-vb-8.onrender.com/admin?email=${email}&password=${password}&roles[0]=${role}`
      );
     // Dispatch an action based on the result if needed

     if (result.success === true) {
      console.log(role);
      dispatch(setRole(result.data, role, true));
      registrationSuccess(true);
     }
    }
    break;

   case "Register":
    let { id, name, email, password, role } = data;
    role = role.toLowerCase();
    let result;
    console.log(name, email, password, role);

    const newUser = {
     id: id,
     firstName: name,
     email: email,
     password: password,
     roles: [role],
     gender: "",
     pastHackathons: [],
     phoneNumber: "",
     wonHackathons: [],
    };

    if (role === "participant")
     result = await postMethod(
      `https://hackfolic-vb-8.onrender.com/participants`,
      JSON.stringify(newUser)
     );
    else if (role === "host")
     result = await postMethod(
      `https://hackfolic-vb-8.onrender.com/hosts`,
      JSON.stringify(newUser)
     );

    if (result.success) {
     registrationSuccess(true);
    }

   default:
    break;
  }
 };
}
