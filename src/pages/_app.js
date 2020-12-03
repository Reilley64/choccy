import { ThemeProvider } from "react-jss";
import "sanitize.css";

const theme = {
  palette: {
    primary: "rgb(121, 85, 72)",
  },
};

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
