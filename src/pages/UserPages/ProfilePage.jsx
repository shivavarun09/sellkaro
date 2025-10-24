// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import LogoutIcon from '@mui/icons-material/Logout';
// import API from './RenderBaseApi.js'
// import AddBankAccountForm from "./AddBankAccount";
// import {
//   Box,
//   Button,
//   Typography,
//   CssBaseline,
//   Modal,
//   Avatar,
//   Container,
//   Paper,
// } from "@mui/material";

// // Reusable modal style
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 3,
// };

// function Profile({userRole}) {
//   const [profile, setProfile] = useState(null);
//   const [bankAccounts, setBankAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [isBankDetailUpdated,setIsBankDetailsUpdated]= useState(false)

//   // Fetch profile & bank account data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//       const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;

//         if (!token) return;

        

//         // Fetch profile
//         const profileRes = await axios.get(`${API}/users/me`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile(profileRes.data);

//         // Fetch bank account
//         const bankRes = await axios.get(
//           `${API}/bankaccount/myaccount`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         // Wrap single object in array for consistent rendering
//         const accountData = bankRes.data?.data ? [bankRes.data.data] : [];
//         setBankAccounts(accountData);
//       } catch (error) {
//         console.error("Error fetching profile/bank data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isBankDetailUpdated]);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     window.location.href = "/login";
//   };

//   if (loading) return <Typography align="center">Loading...</Typography>;
//   if (!profile) return   ( <Box sx={{ m: 2, p: 2, textAlign: "center", backgroundColor: "beige", borderRadius: 2 }}>
//   <Typography variant="h4" sx={{ mb: 1 }}>
//     Welcome, Guest!
//   </Typography>
//   <Typography sx={{ mb: 1 }}>
//     Join SellKaro today and start turning your unused gift cards into instant cash.
//   </Typography>
//   <Button variant="contained" href="/login">
//     Get Started
//   </Button>
// </Box>)

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />

//       {/* Profile Card */}
//       <Box
//         sx={{
//           mt: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Avatar
//           alt={profile.name}
//           sx={{ mb: 1 }}
//           src="/static/images/avatar/1.jpg"
//         />
//         <Typography variant="h6" sx={{ mb: 1 }}>
//           {profile.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//           {profile.email}
//         </Typography>
//         <Button
//           size="small"
//           color="primary"
//           variant="contained"
//           onClick={handleLogout}
//         >
//           Logout  <LogoutIcon/>
//         </Button>
//       </Box>

//       {/* Bank Accounts Section */}
//       {userRole === "user" && (
//   <Box
//     sx={{
//       mt: 2,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       p: 3,
//       boxShadow: 3,
//       borderRadius: 2,
//     }}
//   >
//     <Typography variant="h6" sx={{ mb: 2 }}>
//       Your Bank Accounts
//     </Typography>

//     {bankAccounts.length === 0 ? (
//       <Typography sx={{ textAlign: "center" }}>
//         Please add bank account details for payout
//       </Typography>
//     ) : (
//       bankAccounts.map((account) => (
//         <Paper key={account._id} sx={{ p: 2, mb: 2, width: "100%" }}>
//           <Typography>
//             <strong>Account Holder:</strong> {account.accountHolderName}
//           </Typography>
//           <Typography>
//             <strong>Bank Name:</strong> {account.bankName}
//           </Typography>
//           <Typography>
//             <strong>Account Number:</strong> {account.accountNumber}
//           </Typography>
//           <Typography>
//             <strong>IFSC Code:</strong> {account.ifscCode}
//           </Typography>
//         </Paper>
//       ))
//     )}

//     {/* Add/Update Bank Account Button */}
//     <Button onClick={() => setOpen(true)} variant="contained" sx={{ mt: 2 }}>
//       {bankAccounts.length === 0 ? "Add Bank Details" : "Update Bank Details"}
//     </Button>
//   </Box>
// )}


//       {/* Add Bank Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ ...modalStyle, width: 350 }}>
//           <AddBankAccountForm bankAccounts={bankAccounts} isBankDetailUpdated={isBankDetailUpdated} setIsBankDetailsUpdated={setIsBankDetailsUpdated} onClose={() => setOpen(false)} />
//         </Box>
//       </Modal>
//     </Container>
//   );
// }

// export default Profile;

// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "./UserContext";
// import axios from "axios";
// import API from "./RenderBaseApi.js";
// import AddBankAccountForm from "./AddBankAccount";
// import {
//   Box,
//   Button,
//   Typography,
//   CssBaseline,
//   Modal,
//   Avatar,
//   Container,
//   Paper,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 3,
// };

// function Profile({ userRole }) {
//   const { profile, loading } = useContext(UserContext);
//   const [bankAccounts, setBankAccounts] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [isBankDetailUpdated, setIsBankDetailsUpdated] = useState(false);

//   // ✅ Load from localStorage first (cached data)
//   useEffect(() => {
//     const cached = localStorage.getItem("bankAccounts");
//     if (cached) {
//       setBankAccounts(JSON.parse(cached));
//     }
//   }, []);

//   // ✅ Fetch only if not cached OR after update
//   useEffect(() => {
//     const fetchBankAccounts = async () => {
//       try {
//         const token = JSON.parse(localStorage.getItem("userToken") || "{}")?.token;
//         if (!token) return;

//         const res = await axios.get(`${API}/bankaccount/myaccount`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const accountData = res.data?.data ? [res.data.data] : [];
//         setBankAccounts(accountData);

//         // ✅ Cache in localStorage so next time no refetch
//         localStorage.setItem("bankAccounts", JSON.stringify(accountData));
//       } catch (error) {
//         console.error("Error fetching bank account data:", error);
//       } finally {
//         setIsBankDetailsUpdated(false);
//       }
//     };

//     // ✅ Only fetch if user updated or cache empty
//     const cached = JSON.parse(localStorage.getItem("bankAccounts") || "[]");
//     if (cached.length === 0 || isBankDetailUpdated) {
//       fetchBankAccounts();
//     }
//   }, [isBankDetailUpdated]);

//   const handleLogout = () => {
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("bankAccounts"); // clear cache on logout
//     window.location.href = "/login";
//   };

//   if (loading) return <Typography align="center">Loading...</Typography>;

//   if (!profile)
//     return (
//       <Box
//         sx={{
//           m: 2,
//           p: 2,
//           textAlign: "center",
//           backgroundColor: "beige",
//           borderRadius: 2,
//         }}
//       >
//         <Typography variant="h4" sx={{ mb: 1 }}>
//           Welcome, Guest!
//         </Typography>
//         <Button variant="contained" href="/login">
//           Get Started
//         </Button>
//       </Box>
//     );

//   return (
//     <Container component="main" maxWidth="xs">
//       <CssBaseline />

//       {/* Profile Section */}
//       <Box
//         sx={{
//           mt: 2,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//         }}
//       >
//         <Avatar alt={profile.name} sx={{ mb: 1 }} src="/static/images/avatar/1.jpg" />
//         <Typography variant="h6" sx={{ mb: 1 }}>
//           {profile.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//           {profile.email}
//         </Typography>
//         <Button size="small" color="primary" variant="contained" onClick={handleLogout}>
//           Logout <LogoutIcon />
//         </Button>
//       </Box>

//       {/* Bank Account Section */}
//       {userRole === "user" && (
//         <Box
//           sx={{
//             mt: 2,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             p: 3,
//             boxShadow: 3,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Your Bank Accounts
//           </Typography>

//           {bankAccounts.length === 0 ? (
//             <Typography sx={{ textAlign: "center" }}>
//               Please add bank account details for payout
//             </Typography>
//           ) : (
//             bankAccounts.map((account) => (
//               <Paper key={account._id} sx={{ p: 2, mb: 2, width: "100%" }}>
//                 <Typography>
//                   <strong>Account Holder:</strong> {account.accountHolderName}
//                 </Typography>
//                 <Typography>
//                   <strong>Bank Name:</strong> {account.bankName}
//                 </Typography>
//                 <Typography>
//                   <strong>Account Number:</strong> {account.accountNumber}
//                 </Typography>
//                 <Typography>
//                   <strong>IFSC Code:</strong> {account.ifscCode}
//                 </Typography>
//               </Paper>
//             ))
//           )}

//           <Button onClick={() => setOpen(true)} variant="contained" sx={{ mt: 2 }}>
//             {bankAccounts.length === 0 ? "Add Bank Details" : "Update Bank Details"}
//           </Button>
//         </Box>
//       )}

//       {/* Modal */}
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={{ ...modalStyle, width: 350 }}>
//           <AddBankAccountForm
//             bankAccounts={bankAccounts}
//             isBankDetailUpdated={isBankDetailUpdated}
//             setIsBankDetailsUpdated={setIsBankDetailsUpdated}
//             onClose={() => setOpen(false)}
//           />
//         </Box>
//       </Modal>
//     </Container>
//   );
// }

// export default Profile;

import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import AddBankAccountForm from "./AddBankAccount";
import {
  Box,
  Button,
  Typography,
  CssBaseline,
  Modal,
  Avatar,
  Container,
  Paper,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function Profile({ userRole }) {
  const {
    profile,
    bankAccounts,
    loading,
    isBankDetailUpdated,
    setIsBankDetailsUpdated,
  } = useContext(UserContext);

  const [open, setOpen] = useState(false);
const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/logout")
  };

  if (loading) return <Typography align="center">Loading...</Typography>;

  if (!profile)
    return (
      <Box sx={{ m: 2, p: 2, textAlign: "center", backgroundColor: "beige", borderRadius: 2 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Welcome, Guest!</Typography>
        <Button variant="contained" href="/login">Get Started</Button>
      </Box>
    );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {/* Profile Section */}
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Avatar alt={profile.name} sx={{ mb: 1 }} src="/static/images/avatar/1.jpg" />
        <Typography variant="h6" sx={{ mb: 1 }}>{profile.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{profile.email}</Typography>
        <Button size="small" color="primary" variant="contained" onClick={handleLogout}>
          Logout <LogoutIcon />
        </Button>
      </Box>

      {/* Bank Account Section */}
      {userRole === "user" && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center", p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Your Bank Accounts</Typography>

          {bankAccounts.length === 0 ? (
            <Typography sx={{ textAlign: "center" }}>Please add bank account details for payout</Typography>
          ) : (
            bankAccounts.map((account) => (
              <Paper key={account._id} sx={{ p: 2, mb: 2, width: "100%" }}>
                <Typography><strong>Account Holder:</strong> {account.accountHolderName}</Typography>
                <Typography><strong>Bank Name:</strong> {account.bankName}</Typography>
                <Typography><strong>Account Number:</strong> {account.accountNumber}</Typography>
                <Typography><strong>IFSC Code:</strong> {account.ifscCode}</Typography>
              </Paper>
            ))
          )}

          <Button onClick={() => setOpen(true)} variant="contained" sx={{ mt: 2 }}>
            {bankAccounts.length === 0 ? "Add Bank Details" : "Update Bank Details"}
          </Button>
        </Box>
      )}

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ ...modalStyle, width: 350 }}>
          <AddBankAccountForm
            bankAccounts={bankAccounts}
            isBankDetailUpdated={isBankDetailUpdated}
            setIsBankDetailsUpdated={setIsBankDetailsUpdated}
            onClose={() => setOpen(false)}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default Profile;
