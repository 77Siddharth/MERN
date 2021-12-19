import React from "react";
import { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserOptions({ user }) {
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const dashboard = () => {
    history.push("/dashboard");
  };
  const account = () => {
    history.push("/account");
  };
  const orders = () => {
    history.push("/orders");
  };
  const logout = () => {
    console.log("construct Logout fucntion");
    toast("Logout Successfull");
    // history.push("/logout");
  };

  const options = [
    { name: "Account", icon: <PersonIcon />, func: account },
    { name: "Orders", icon: <ListAltIcon />, func: orders },
    { name: "Logout", icon: <ExitToAppIcon />, func: logout },
  ];

  if (user.role == "admin") {
    options.unshift({
      name: "Dashboard",
      icon: <DashboardIcon />,
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        icon={<PersonIcon />}
        direction="down"
      >
        <SpeedDialAction
          icon={<DashboardIcon />}
          tooltipTitle="Dashboard"
          onClick={() => dashboard()}
        />
        {options.map((option) => (
          <SpeedDialAction
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={true}
        pauseOnHover={false}
      />
    </Fragment>
  );
}

export default UserOptions;
