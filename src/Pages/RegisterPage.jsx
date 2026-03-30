// import { useState } from "react";
// import { postRequest } from "../Services";
// import { useNavigate } from "react-router-dom";
// import Form from "../Components/FormComponent";

// const RegisterPage = () => {
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const fields = [
//     {
//       id: "username",
//       type: "input",
//       label: "Username",
//       placeholder: "Enter Username",
//       value: "",
//     },
//     {
//       id: "email",
//       type: "input",
//       label: "Email",
//       placeholder: "Enter email",
//       value: "",
        // inputType: "email", 
//     },
//     {
//       id: "password",
//       type: "input",
//       label: "Password",
//       placeholder: "Enter password",
//       value: "",
        // inputType: "password",
//     },
//   ];

//   const validateForm = (formData) => {
//     if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
//       setError("All fields are required");
//       return false;
//     }

//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Invalid email format");
//       return false;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return false;
//     }

//     setError("");  
//     return true;
//   };

  
//   const handleRegister = async (formData) => {
//     if (!validateForm(formData)) return;

//     try {
//       const response = await postRequest("/users", {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       });

//       console.log("Registered Successfully!", response);

//       const userData = {
//         username: formData.username,
//         email: formData.email,
//         password: formData.password,
//       };

//       localStorage.setItem("user", JSON.stringify(userData));

//       alert("Registration Successful");

//       navigate("/");

//     } catch (err) {
//       console.log(err);
//       setError("Registration failed");
//     }
//   };

//   return (
//     <>
//       <div className="container-fluid d-flex vh-100 justify-content-center align-items-center">
//         <div className="card shadow-lg p-4" style={{ width: "380px", borderRadius: "15px" }}>

//           <div className="text-center mb-4">
//             <h2 className="fw-bold">Registration Page</h2>
//             <p className="text-muted">Create an account to get started.</p>
//           </div>

//           {error && <p className="text-danger text-center">{error}</p>}

//           <Form fields={fields} onSubmit={handleRegister} />

//           <div className="text-center mt-3">
//             <p className="text-muted">
//               Already have an account?
//               <a
//                 href="/"
//                 className="ms-1 fw-bold text-decoration-none"
//                 style={{ color: "#6a11cb" }}
//               >
//                 Login
//               </a>
//             </p>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default RegisterPage;