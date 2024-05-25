import React from 'react'
import { AuthType } from '../../../../enums/auth'
import { Button, Form, Input, message } from 'antd'
import styles from './Login.module.scss'
import { T_Login } from '../../../../types/auth'
import { useUserLogin } from '../../../../api/auth.hooks'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom'

/**
 * Login component to render the login form
 * @function handleSubmitLogin - to handle the login form submission
 * @param {React.Dispatch<React.SetStateAction<AuthType>>} setType - to set the type of auth component to render
 * @returns
 */

interface Props {
    setType: React.Dispatch<React.SetStateAction<AuthType>>
}

export default function Login({ setType }: Props) {
    const [loginForm] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = useUserLogin()
    const handleSubmitLogin = (values: T_Login) => {
        login.mutateAsync(values).then(async (data) => {
            dispatch(setUser({
                name: data.user?.displayName,
                email: data.user?.email,
                _id: data.user?.uid
            }))
            const token = await data.user?.getIdToken()
            localStorage.setItem("token", token!)
            localStorage.setItem("refreshToken", data?.user?.refreshToken ?? '')
            navigate('/')
            message.success('You are logged in successfully!')
        }).catch((err) => {
            message.error(err.message)
        })
    }
    return (
        <div className={styles.login_body} >
            <div className={styles.body}>
                <Form
                    layout="vertical"
                    form={loginForm}
                    name="basic"
                    onFinish={handleSubmitLogin}
                    data-testid="login-form"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input data-testid="email-input" size="large" placeholder="Email" type='email' />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password data-testid="password-input" size="large" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button data-testid="login-button" size="large" block type='primary' htmlType='submit' loading={login.isPending}>Login</Button>
                    </Form.Item>
                </Form>
                <p className={styles.account_para}>Don't have an account? <p data-testid="render-register" onClick={() => setType(AuthType.Register)}>Register</p></p>
            </div>
        </div>
    )
}
