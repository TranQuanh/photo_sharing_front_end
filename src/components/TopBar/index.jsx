import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

import "./styles.css";

function TopBar() {
  const location = useLocation();
  const [contextText, setContextText] = useState("");

  useEffect(() => {
    const pathParts = location.pathname.split("/").filter(Boolean);
    let userId = null;
    let contextType = "list";

    if (pathParts[0] === "photos" && pathParts[1]) {
      userId = pathParts[1];
      contextType = "photos";
    } else if (pathParts[0] === "users" && pathParts[1]) {
      userId = pathParts[1];
      contextType = "user";
    }

    if (userId) {
      fetchModel(`http://localhost:8081/user/${userId}`)
        .then((user) => {
          if (user && user.first_name && user.last_name) {
            if (contextType === "photos") {
              setContextText(`Photos of ${user.first_name} ${user.last_name}`);
            } else if (contextType === "user") {
              setContextText(`${user.first_name} ${user.last_name}`);
            }
          } else {
            setContextText(
              contextType === "photos" ? "Photos" : "User Detail"
            );
          }
        })
        .catch(() =>
          setContextText(contextType === "photos" ? "Photos" : "User Detail")
        );
    } else {
      setContextText("User List");
    }
  }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="topbar-toolbar">
        <Typography variant="h5" className="topbar-title" color="inherit">
          Trần Quang Anh
        </Typography>
        <Typography variant="h6" className="topbar-context" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
