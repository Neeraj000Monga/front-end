import { Box, Paper, Stack, styled, TableCell } from "@mui/material";
import { NavLink } from "react-router-dom";

export const MainContainer = styled(Paper)(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  borderRadius: "0px",
  flexDirection: "column",
  justifyContent: "space-between",
  backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
}));

export const Link = styled(NavLink)(({ theme }) => ({
  fontSize: "14px",
  color: "aliceblue",
  fontFamily: "cursive",
  textDecoration: "none",
  "&:hover": {
    color: "#089090",
  },
}));

// ********* Wrapper *********
export const Wrapper = styled(Stack)({
  gap: "20px",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
});
export const Card = styled(Stack)({
  padding: "16px",
  borderRadius: "8px",
  alignItems: "center",
  background: "#212121",
});
export const InputWrapper = styled(Stack)({
  width: "100%",
});
export const TableCells = styled(TableCell)({
  padding: "8px"
});

export const Head = styled(Box)(({ theme }) => ({
  top: 0,
  zIndex: 9999,
  display: "flex",
  position: "fixed",
  padding: "5px 20px",
  width: "-webkit-fill-available",
  justifyContent: "space-between",
  backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#e8eced",
}));

export const FooterWrapper = styled(Box)(({ theme }) => ({
  padding: "15px 10px",
  backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#e8eced",
  width: "-webkit-fill-available",
}));
