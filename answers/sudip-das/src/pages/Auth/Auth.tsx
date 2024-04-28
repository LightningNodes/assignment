import { useState } from "react"
import styles from './Auth.module.scss'
import { AuthType } from "../../enums/auth";
import Login from "./components/Login";
import Register from "./components/Register";


/**
 * Auth component to render the login and register components
 * @constant {AuthType} type - to set the type of auth component to render
 * @function setType - to set the type of auth component to render
 * @returns 
 */

export default function Auth() {
    const [type, setType] = useState<AuthType>(AuthType.Login);
    
    return (
        <div className={styles.auth_body}>
            <div className={styles.auth_header}>
                <h1 className={styles.auth_heading}>
                    Get started with a free account
                </h1>
                <p className={styles.para}>
                    Get all realtime updates of trading and stocks 
                </p>
            </div>
            {
                type === AuthType.Login ? (
                    <div className={styles.wrapper} data-testid="login-component">
                        <Login setType={setType} />
                    </div>
                ) : (
                    <div className={styles.wrapper} data-testid="register-component">
                        <Register setType={setType} />
                    </div>
                )
            }
        </div>
    )
}
