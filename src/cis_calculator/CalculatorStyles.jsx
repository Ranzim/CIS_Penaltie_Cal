import { styled } from "@mui/system";

export const useStyles = {
  container: styled('div')({
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  formContainer: styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(10px)',
    webkitBackdropFilter: 'blur(10px)',
  }),
  title: styled('h1')({
    marginBottom: '20px',
  }),
  textField: styled(TextField)({
    width: '300px',
    marginBottom: '10px',
  }),
  button: styled(Button)({
    width: '300px',
  }),
};
