import { Button, Result } from 'antd';

export default () => (
  <>
    <Result
      style={{ marginTop: 48 }}
      title='您要找的页面去火星了~'
      status='404'
      extra={
        <Button type='primary' href='/'>
          回到首页
        </Button>
      }
    />
  </>
);
