import React, { Fragment, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/styles";
// import { doLogin } from "../../services/thunks";
// import { handleError } from "../../services/auth/actions";
import {useDispatch} from 'react-redux'
import { primaryColor } from "../../assets/jss/materialStyles";
import { withRouter } from "react-router-dom";
import { loginAdmin, getDashboardData } from "../../services/auth/actions";
import { push } from "connected-react-router";

const ErrorDialog = (props) => {

  const dispatch = useDispatch()
  return (
    <Dialog
      open={props.show}
      onClose={props.handleClose}>
      <DialogTitle>
        {'Auth Error'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'The credentials entered are wrong, please check and try again.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* <Button onClick={() => dispatch(handleError(false))} color={primaryColor[0]}> */}
        <Button onClick={() => dispatch()} color={primaryColor[0]}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  paper: {
    marginTop: 80,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: 10
  },
  submit: {
    margin: "30 0 20",
    boxShadow: "none"
  },
  forgot: {
    textAlign: "left"
  },
  forgotContainer: {
    marginTop: 20
  },
  loginProgress: {
    margin: 5
  },
  loginText: {
    fontWeight: 400
  },
  forget: {
    cursor: 'pointer'
  }
};

const LoginPage = (props) => {
    const [alertDialog, setAlertDialog] =  useState(false)
    const [userID, setUserID]= useState("")
    const [password, setPassword]= useState("")

    useEffect(() => {
        //props.isLoggedIn && props.dispatch(push("/admin/dashboard"));
    })

    return (
      <Fragment>
        {!props.isLoggedIn ? (
          <Container component="main" maxWidth="xs" style={{minHeight: "100vh"}}>
            <CssBaseline />
            <div className={props.classes.paper}>
              <Typography
                component="h1"
                variant="h5"
                className={props.classes.loginText}
              >
                Admin Login
              </Typography>
              <form className={props.classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled={props.isLoggingIn}
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                  label="Username"color={primaryColor[0]}   
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"color={primaryColor[0]}
                  margin="normal"
                  required
                  disabled={props.isLoggingIn}
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color={primaryColor[0]} />}
                  className={props.classes.forgot}
                  label="Remember Me"
                />
                <Button
                  onClick={e => {
                    e.preventDefault();
                    props.dispatch(
                        loginAdmin({
                            username: userID, 
                            password: password
                        })
                    );
                  }}
                  type="submit"
                  fullWidth
                  disabled={props.isLoggingIn}
                  size="large"
                  variant="outlined"
                  color={primaryColor[0]}
                  className={props.classes.submit}
                >
                  {props.isLoggingIn ? (
                    <CircularProgress
                      className={props.classes.loginProgress}
                      size={24}
                      thickness={4}
                    />
                  ) : (
                "LOGIN"                  )}
                </Button>
                <Grid container className={props.classes.forgotContainer}>
                  <Grid item xs>
                    <Typography
                      color={primaryColor[0]}
                      onClick={() => setAlertDialog(true) }
                      variant="body2"
                      className={props.classes.forget}
                    >
                      Forgot Password?
                    </Typography>
                  </Grid>
                  <Dialog
                    open={alertDialog}
                    onClose={() => setAlertDialog(false) }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle>
                      {"Forgot Your Password?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Please contact your supervisior, in case you're a
                        employee or contact us in case you're the restaurant
                        Admin
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => setAlertDialog(false)}
                        color={primaryColor[0]}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setAlertDialog(false)}
                        color={primaryColor[0]}
                        autoFocus
                      >
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </form>
            </div>
          </Container>
        ) : (
          "Go to DashBoard"
        )}
        <ErrorDialog show={props.isLoginFailed} />
      </Fragment>
    );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    isLoggedIn: state.auth.isLoggedIn,
    isLoginFailed: state.auth.isLoginFalied,
  };
}

function mapDispatchToProps(dispatch) {
  let actions = bindActionCreators({});
  return { ...actions, dispatch };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(LoginPage))
);
