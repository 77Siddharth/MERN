import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
function UserOptions({ user }) {
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const dashboard = () => {
    history.push("/dashboard");
  };
  const account = () => {
    history.push("/account");
  };
  const orders = () => {
    history.push("/orders");
  };
  const logoutUser = () => {
    dispatch(logout());
    toast("Logout Successfull");
    history.push("/");
  };

  const options = [
    { name: "Account", icon: <PersonIcon />, func: account },
    { name: "Orders", icon: <ListAltIcon />, func: orders },
    { name: "Logout", icon: <ExitToAppIcon />, func: logoutUser },
  ];
  console.log("User", user.role === "admin");
  if (user.role === "admin") {
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
        {options.map((option) => (
          <SpeedDialAction
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
          />
        ))}
      </SpeedDial>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </Fragment>
  );
}

export default UserOptions;
