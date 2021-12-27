import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import "./Header.css";
import ShoppingCart from "@material-ui/icons/ShoppingCart";

function UserOptions({ user }) {
  const [open, setOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const history = useHistory();
  const dispatch = useDispatch();
  const dashboard = () => {
    history.push("/dashboard");
  };
  const account = () => {
    history.push("/account");
  };

  const cart = () => {
    history.push("/cart");
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
    {
      name: `Cart ( ${cartItems.length} )`,
      icon: <ShoppingCart />,
      func: cart,
    },
    { name: "Logout", icon: <ExitToAppIcon />, func: logoutUser },
  ];
  if (user.role === "admin") {
    options.unshift({
      name: "Dashboard",
      icon: <DashboardIcon />,
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: 10 }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className="speedDial"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        icon={
          user.avatar.url ? (
            <img
              className="speedDialIcon"
              src={user.avatar.url}
              alt="Profile"
            />
          ) : (
            <PersonIcon />
          )
        }
        direction="down"
        style={{ zIndex: 11 }}
      >
        {options.map((option) => (
          <SpeedDialAction
            className="speedDialIcon"
            key={option.name}
            icon={option.icon}
            tooltipTitle={option.name}
            onClick={option.func}
            tooltipOpen={window.innerWidth < 600 ? true : false}
          />
        ))}
      </SpeedDial>
      <ToastContainer autoClose={2000} pauseOnHover={false} />
    </Fragment>
  );
}

export default UserOptions;
