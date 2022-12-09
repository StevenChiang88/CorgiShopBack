import React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import ViewListIcon from "@mui/icons-material/ViewList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../store/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import Alertmodal from "../ui/AlertModal";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Navbar(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const logoutHandler = () => {
    navigate("/");
    dispatch(userLogOut());
    handleDrawerClose();
  };
  const [open, setOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const Links = [
    { linkName: "Home", Link: "/home" },
    { linkName: "Users", Link: "/users" },
    { linkName: "Orders", Link: "/orders" },
    { linkName: "Products", Link: "/products" },
  ];

  const renderIcon = (index) => {
    switch (index) {
      case 0:
        return <HomeIcon />;
      case 1:
        return <PersonIcon />;
      case 2:
        return <ArticleIcon />;
      case 3:
        return <ViewListIcon />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{ height: "4rem", backgroundColor: "#273156" }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Corgi Shop Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3F4F8B",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#273156",
          }}
        >
          <Typography sx={{ color: "white" }}>Corgi Shop Menu</Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {Links.map((item, index) => (
            <ListItem key={index}>
              <NavLink
                style={({ isActive }) => {
                  return isActive
                    ? { color: "#FF744F", textDecoration: "none" }
                    : { color: "white", textDecoration: "none" };
                }}
                to={item.Link}
              >
                <ListItemButton onClick={handleDrawerClose}>
                  <ListItemIcon>{renderIcon(index)}</ListItemIcon>
                  <ListItemText primary={item.linkName} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}

          {auth.isLogged && (
            <ListItem>
              <ListItemButton
                onClick={() => {
                  setModalShow(true);
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText style={{ color: "white" }} primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Box>{props.children}</Box>
        {modalShow && (
          <Alertmodal
            setModalShow={setModalShow}
            modalShow={modalShow}
            confirmHandler={logoutHandler}
          />
        )}
      </Main>
    </Box>
  );
}
