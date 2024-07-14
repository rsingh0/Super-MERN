import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "../components/hooks/useForm";
import { useNavigate } from "react-router-dom";
import { REGISTER_MUTATION } from "../queries/Login";
import Spinner from "../components/other/Spinner";

const Register = () => {
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const { onChange, onSubmit, formData } = useForm(registerCallBack, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  async function registerCallBack() {
    console.log("User Registration Details", formData);
    const { username, email, password, confirmPassword } = formData;

    try {
      const result = await register({
        variables: { username, email, password, confirmPassword },
      });
      console.log("Registered User", result);

      if (
        result &&
        result.data &&
        result.data.register &&
        result.data.register.id
      ) {
        console.log("Registered User token:", result.data.register.token);

        // Pass User data to Auth Context
        login(result.data.register);
        navigate("/home");
      } else {
        console.log(
          "GraphQl Error",
          error.graphQLErrors[0].extensions.exception.errors
        );
        setErrors(error.graphQLErrors[0].extensions.exception.errors);
        login(null);
      }
    } catch (err) {
      console.log("Error", err);
      setErrors({
        GeneralError: err.message,
        GraphqlError: error.graphQLErrors[0].extensions.exception.errors,
      });
      login(null);
    }
  }

  return (
    <div className="form-container p-32">
      <form onSubmit={onSubmit} noValidate>
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <h1 className="text-3xl my-4 text-cyan-400">Registration</h1>
          {loading ? <Spinner /> : ""}
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username ..."
              className="border-2 border-gray-500 px-4 py-2 w-full"
              onChange={onChange}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              placeholder="Email ..."
              className="border-2 border-gray-500 px-4 py-2 w-full"
              onChange={onChange}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password ..."
              className="border-2 border-gray-500 px-4 py-2  w-full "
              onChange={onChange}
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password ..."
              className="border-2 border-gray-500 px-4 py-2 w-full "
              onChange={onChange}
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" type="submit">
            Register
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

export default Register;
