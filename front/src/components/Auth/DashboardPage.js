import React, { Component } from 'react';
import styles from './dashboardPage.module.css'


class DashboardPage extends Component {
  state = {
    isReg: true
  }
  render() {
    return (
      <div className={styles.dashboardContainer}>
        {
          this.state.isReg ?
            <form>
              <h1>Login Page</h1>
              <div class="inset">
                <p>
                  <label for="email">EMAIL ADDRESS</label>
                  <input placeholder="Enter email" type="text" name="email" id="email" />
                </p>
                <p>
                  <label for="password">PASSWORD</label>
                  <input placeholder="Enter password" type="password" name="password" id="password" />
                </p>
              </div>
              <div className={styles.buttonContainer}>
                <p class="p-container">
                  <input type="submit" name="go" id="go" value="Log in" />
                </p>
                <p class="p-container">
                  <button className={styles.loginButton} onClick={(event) => { event.preventDefault(); this.setState({ isReg: false }) }}>Sign Up</button>
                </p>
              </div>

            </form> :
            <form>
              <h1>Register Page</h1>
              <div className={styles.inset}>
                <p>
                  <label for="email">EMAIL ADDRESS</label>
                  <input placeholder="Enter email" type="text" name="email" id="email" />
                </p>
                <p>
                  <label for="password">PASSWORD</label>
                  <input placeholder="Enter password" type="password" name="password" id="password" />
                </p>
                <p>
                  <label for="conPassword">CONFIRM PASSWORD</label>
                  <input placeholder="Confirm password" type="text" name="conPassword" id="conPassword" />
                </p>
              </div>
              <div className={styles.buttonContainer}>
                <p class="p-container">
                  <input type="submit" name="go" id="go" value="Register" />
                </p>
                <p class="p-container">
                  <button className={styles.loginButton} onClick={(event) => { event.preventDefault(); this.setState({ isReg: true }) }}>Sign In</button>
                </p>
              </div>

            </form>
        }
      </div>
    );
  }
}

export default DashboardPage;
