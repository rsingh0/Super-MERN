import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../components/hooks/useForm";
import { useMutation } from "@apollo/client";
import Spinner from "../components/other/Spinner";
import { LOGIN_MUTATION } from "../queries/Login";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);
  const { onChange, onSubmit, formData } = useForm(loginCallBack, {
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  async function loginCallBack() {
    console.log("User Login Details", formData);
    const { username, password } = formData;
    try {
      const result = await login({ variables: { username, password } });
      console.log("User logged in", result);

      if (result && result.data && result.data.login && result.data.login.id) {
        console.log("User token:", result.data.login.token);

        // Pass User data to Auth Context
        context.login(result.data.login);
        navigate("/home");
      } else {
        console.log(
          "GraphQl Error",
          error.graphQLErrors[0].extensions.exception.errors
        );
        setErrors(error.graphQLErrors[0].extensions.exception.errors);
        context.login(null);
      }
    } catch (err) {
      console.log("Error", err);
      setErrors({
        GeneralError: err.message,
        GraphqlError: error.graphQLErrors[0].extensions.exception.errors,
      });
      context.login(null);
    }
  }

  return (
    <div className="form-container p-32">
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          
          {loading ? <Spinner /> : ""}
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Username</label>
            <input
              type="text"
              label="Username"
              name="username"
              value={formData.username}
              placeholder="Username ..."
              className="border-2 border-gray-500 px-4 py-2 w-full"
              onChange={onChange}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Password</label>
            <input
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              placeholder="Password ..."
              className="border-2 border-gray-500 px-4 py-2  w-full "
              onChange={onChange}
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" type="submit">
            Login
          </button>
        </div>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
 