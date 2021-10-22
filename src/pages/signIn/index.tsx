import { Form, Input, Button, Result } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { SigninPayload, signin } from '../../store/actions/auth.actions'
import { AppState } from '../../store/reduces'
import { AuthState } from '../../store/reduces/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Redirect } from 'react-router'

import './index.css'

const SignIn = () => {
  // 获取dispatch
  const dispatch = useDispatch()

  // 登录完成
  const onFinish = (value: SigninPayload) => {
    console.log('value', value)
    dispatch(signin(value))
  }
  // 获取登录结果
  const auth = useSelector<AppState, AuthState>((state) => state.auth)

  // 登录失败,显示错误信息
  const showError = () => {
    if (auth.signin.loaded && !auth.signin.success) {
      return <Result status="warning" title="登录失败" subTitle={auth.signin.message} />
    }
  }

  // 登录成功。跳转
  const redirectToDashboard = () => {
    const auth = isAuth()
    if (auth) {
      return <Redirect to="/home" />
    }
  }

  // 登录form 表单
  const signForm = () => {
    return (
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="login-root">
      {showError()}
      {redirectToDashboard()}
      {signForm()}
    </div>
  )
}

export default SignIn
