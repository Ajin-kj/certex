"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewToggle from "./ViewToggle";
import NotificationCenter from "./NotificationCenter";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

const NavBar: React.FC = () => {
  const { user, profilePic, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [view, setView] = useState<string>("user");

  useEffect(() => {
    setView(pathname.includes("/AdminDashboard") ? "admin" : "user");
  }, [pathname]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        px: 3,
        height: "56px",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar disableGutters>
        {/* CertEx Logo */}
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            letterSpacing: ".2rem",
            color: "red",
            textDecoration: "none",
            fontSize: "22px",
          }}
        >
          CertEx
        </Typography>

        {/* Notification Center */}
        <NotificationCenter />

        {/* Admin/User Toggle */}
        <ViewToggle view={view} setView={setView} />

        {/* Spacer for Profile Icon */}
        <Box sx={{ width: "16px" }} />

        {/* Profile and Logout */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open menu">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              ) : (
                <img
                  src="/default-profile.png"
                  alt="Default Profile"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem disabled>
              <Typography
                textAlign="center"
                sx={{ fontWeight: "medium", fontSize: "16px" }}
              >
                Hi, {user?.name || "User"}
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => router.push("/Profile")}>Profile</MenuItem>
            <MenuItem onClick={() => router.push("/my-certifications")}>
              My Certifications
            </MenuItem>
            <MenuItem onClick={() => router.push("/nomination-history")}>
              Nomination History
            </MenuItem>
            <MenuItem onClick={() => router.push("/suggest-certification")}>
              Suggest Certification
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "black",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
