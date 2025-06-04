"use client";

import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ClearAllIcon from "@mui/icons-material/ClearAll";

const NotificationCenter: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Sample notification data simulating API response
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New certification added!", timestamp: "2h ago" },
    { id: 2, message: "Your nomination has been approved.", timestamp: "5h ago" },
    { id: 3, message: "Reminder: Complete your pending certifications.", timestamp: "1d ago" },
  ]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={handleOpen}
        sx={{
          mr: 2,
          color: notifications.length > 0 ? "#1565c0" : "#9e9e9e", // Blue if notifications exist, gray otherwise
        }}
      >
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          mt: 2,
          "& .MuiPaper-root": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            minWidth: "300px",
          },
          "&::before": {
            content: '""',
            display: "block",
            position: "absolute",
            width: "0px",
            height: "0px",
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "8px solid white",
            top: "-8px",
            left: "20px",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Notifications ({notifications.length})
          </Typography>
          {notifications.length > 0 && (
            <Button
              startIcon={<ClearAllIcon />}
              size="small"
              onClick={handleClearAllNotifications}
              sx={{
                textTransform: "none",
                fontSize: "12px",
              }}
            >
              Clear All
            </Button>
          )}
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {notification.message}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.timestamp}
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={() => handleDeleteNotification(notification.id)}
                sx={{ ml: 1, color: "#d32f2f" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ px: 2, py: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No notifications at the moment
            </Typography>
          </Box>
        )}
      </Menu>
    </>
  );
};

export default NotificationCenter;
