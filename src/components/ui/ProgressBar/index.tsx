import './index.css'
import { useEffect } from "react";
import { useNavigation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false }); 

const ProgressBar = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === "loading") NProgress.start();
    else NProgress.done();
  }, [navigation.state]);

  return null;
};

export default ProgressBar;