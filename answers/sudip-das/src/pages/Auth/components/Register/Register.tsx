import React from 'react'
import { AuthType } from '../../../../enums/auth'
import styles from './Register.module.scss'
import { Button, Form, Input, message } from 'antd'
import { useUserRegister } from '../../../../api/auth.hooks'
import { T_Register } from '../../../../types/auth'

interface Props {
    setType: React.Dispatch<React.SetStateAction<AuthType>>
}


export default function Register({ setType }: Props) {
    const [registerForm] = Form.useForm()
    const register = useUserRegister()
    const handleRegister = (values: T_Register) => {
        register.mutateAsync(values).then(() => {
            setType(AuthType.Login)
            message.success('You are registered successfully!')
            setTimeout(() => {
                message.info('Please login to continue!')
            }, 2000);
        }).catch((err) => {
            message.error(err.message)
        })
    }
    return (
        <div className={styles.register_body}>
            <div className={styles.body}>
                <Form
                    layout="vertical"
                    form={registerForm}
                    name="basic"
                    onFinish={handleRegister}
                    data-testid="register-form"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input data-testid="name-input" size="large" placeholder="Name" />
                    </Form.Item>
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
                        <Button size="large" data-testid="register-button" block type='primary' htmlType='submit' loading={register.isPending}>Register</Button>
                    </Form.Item>
                </Form>
                <p className={styles.account_para}>Already have an account? <p data-testid="render-login" onClick={() => setType(AuthType.Login)}>Login</p></p>
            </div>
        </div>
    )
}
