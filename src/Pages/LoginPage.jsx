import { useState, useEffect } from "react";
import { postRequest } from "../Services";
import { useNavigate } from "react-router-dom";
import Form from "../Components/FormComponent";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/authSlice";
import AlertComponent from "../Components/AlertComponent";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const [alert, setAlert] = useState({ message: "", variant: "" });

  useEffect(() => {
    setFields([
      {
        id: "username",
        type: "input",
        label: "Username",
        placeholder: "Enter username",
        value: "",
      },
      {
        id: "password",
        type: "input",
        label: "Password",
        placeholder: "Enter password",
        value: "",
        inputType: "password",
      },
    ]);
  }, []);

  const handleSubmit = async (formData) => {
    const { username, password } = formData;

    try {
      const response = await postRequest("/auth/login", { username, password });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        dispatch(login(response.data));

        setAlert({ message: "Login successfully!", variant: "success" });

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setAlert({ message: response.msg || "Login failed", variant: "danger" });
      }
    } catch (err) {
      console.log(err);
      setAlert({ message: "Login failed. Please try again.", variant: "danger" });
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "380px", borderRadius: "15px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Login Page</h2>
          <p className="text-muted">Login to your account</p>
        </div>

        <AlertComponent
          message={alert.message}
          variant={alert.variant}
          onClose={() => setAlert({ message: "", variant: "" })}
        />

        <Form fields={fields} onSubmit={handleSubmit} formId="loginForm" />

        <div className="d-grid mt-3">
          <button
            type="submit"
            form="loginForm"
            className="btn btn-lg text-white"
            style={{ backgroundColor: "#6a11cb" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;