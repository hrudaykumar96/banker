import { useEffect, useState } from "react";
import Login from "./Login";
import Accounts from "../components/Accounts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ChangePassword from "../forms/ChangePassword";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { usersdata } from "../../redux/getdata";
import propTypes from "prop-types";
import Spinner from "../effects/Spinner";
const Home = ({ showalert }) => {
  const [token, setToken] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [cngform, setCngform] = useState(false);
  const loading = useSelector((state) => state.userdata.loading);
  const data = useSelector((state) => state.userdata.data);
  const navigate = useNavigate();
  const closecngform = () => {
    setCngform(false);
  };
  const opencngform = () => {
    setCngform(true);
  };
  useEffect(() => {
    if (token.token === undefined) {
      setAuth(false);
      navigate("/");
    } else {
      setAuth(true);
      navigate("/home");
      dispatch(usersdata());
      setToken;
    }
  }, [token]);
  return (
    <div>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          {auth ? (
            <>
              <Header
                opencngform={opencngform}
                showalert={showalert}
                data={data}
              />
              <Accounts data={data} />
              {cngform ? (
                <>
                  <ChangePassword
                    closecngform={closecngform}
                    data={data}
                    showalert={showalert}
                  />
                </>
              ) : null}

              <Footer />
            </>
          ) : (
            <>
              <Login />
            </>
          )}
        </>
      )}
    </div>
  );
};
Home.propTypes = {
  showalert: propTypes.func,
};
export default Home;