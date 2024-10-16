import { Button, styled } from "@mui/material";

export const MainButton = styled(Button)({
  background: "#00aeae",
  borderRadius: "10px",
  textTransform: "none",
  fontWeight: "bold",
  marginTop: "20px",
  width: "100%",
  "&:hover": {
    backgroundColor: "#089090",
  },
});
