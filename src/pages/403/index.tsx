import { Button, Result } from 'antd';

export default () => {
  return (
    <>
      <Result
        style={{ marginTop: 48 }}
        title='您没有此页面的访问权限哦~'
        status='403'
        extra={
          <Button type='primary' href='/'>
            回到首页
          </Button>
        }
      />
    </>
  );
};
