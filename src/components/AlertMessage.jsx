import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const AlertMesssage = ({ title }) => {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      {title}
    </Alert>
  );
};

export default AlertMesssage;
