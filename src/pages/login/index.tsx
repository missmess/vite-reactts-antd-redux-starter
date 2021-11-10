import { Form, Input, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useStoreApi';
import { setUser } from '@/store/user';

declare type FormObj = {
  username: string;
  password: string;
};

export default () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const onFinish = (values: FormObj) => {
    // 登录成功设置user
    dispatch(setUser({ userId: 1, nickname: values.username }));
    history.replace('/');
  };

  return (
    <div style={{ padding: '30px 40px' }}>
      <Form<FormObj> name='login' onFinish={onFinish} autoComplete='off'>
        <Form.Item
          label='Username'
          name='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
