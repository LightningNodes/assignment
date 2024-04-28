import { useState } from "react"
import styles from './Auth.module.scss'
import { AuthType } from "../../enums/auth";
import Login from "./components/Login";
import Register from "./components/Register";


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
