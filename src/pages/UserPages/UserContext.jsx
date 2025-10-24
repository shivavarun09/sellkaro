import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "./RenderBaseApi.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBankDetailUpdated, setIsBankDetailsUpdated] = useState(false);

  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userToken") || "{}")?.token || null
  );
  const [userRole, setUserRole] = useState(
    JSON.parse(localStorage.getItem("userToken") || "{}")?.role || null
  );

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get(`${API}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  // Fetch bank accounts
  useEffect(() => {
    const fetchBankAccounts = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${API}/bankaccount/myaccount`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const accounts = res.data?.data ? [res.data.data] : [];
        setBankAccounts(accounts);
        localStorage.setItem("bankAccounts", JSON.stringify(accounts));
        setIsBankDetailsUpdated(false);
      } catch (err) {
        console.error("Error fetching bank accounts:", err);
      }
    };

    const cached = JSON.parse(localStorage.getItem("bankAccounts") || "[]");
    if (cached.length === 0 || isBankDetailUpdated) {
      fetchBankAccounts();
    } else {
      setBankAccounts(cached);
    }
  }, [token, isBankDetailUpdated]);

  // Clear all user data on logout
  const clearData = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("bankAccounts");
    setProfile(null);
    setBankAccounts([]);
    setToken(null);
    setUserRole(null); // important for NAVIGATION update
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        bankAccounts,
        setBankAccounts,
        loading,
        token,
        setToken,
        userRole,
        setUserRole,
        isBankDetailUpdated,
        setIsBankDetailsUpdated,
        clearData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
