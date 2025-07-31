import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password2: "",
    tc: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.password2)
      newErrors.password2 = "Passwords do not match";
    if (!formData.tc) newErrors.tc = "You must agree to the terms";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/register/",
        formData
      );
      alert("Registration successful!");
      console.log("Registration response:", response.data);
      navigate("/Loginpage");
    } catch (error) {
      console.error("Registration error:", error.response?.data);
      setErrors({ server: "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {errors.server && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {errors.server}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}

            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
            {errors.password2 && (
              <p className="text-sm text-red-600">{errors.password2}</p>
            )}

            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                name="tc"
                checked={formData.tc}
                onChange={handleChange}
                className="mr-2"
              />
              I agree to the terms and conditions
            </label>
            {errors.tc && <p className="text-sm text-red-600">{errors.tc}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to="/Loginpage"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
