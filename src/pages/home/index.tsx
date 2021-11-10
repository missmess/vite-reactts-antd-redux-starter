import { useHistory } from 'react-router-dom';
import { Col, Divider, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useStoreApi';
import { selectUserInfo } from '@/store/user';
import { getItems } from '@/services';
import { Item } from '@/types';
import './index.scss';

export default () => {
  const userInfo = useAppSelector(selectUserInfo);
  const history = useHistory();
  if (userInfo == null) {
    setTimeout(() => {
      history.replace('/login');
    }, 1000);
    return <div className='main'>Unauthorized! Login Page redirecting...</div>;
  }

  const [data, setData] = useState([] as Item[]);
  useEffect(() => {
    getItems().then((value) => {
      setData(value);
    });
  }, []);

  return (
    <div className='main'>
      <h2>Welcome, {userInfo.nickname}!</h2>
      {data.length ? (
        data.map((v) => (
          <section key={v.id}>
            <Divider />
            <Row>
              <Col span={8}>{v.title}</Col>
              <Col span={12}>{v.body}</Col>
            </Row>
          </section>
        ))
      ) : (
        <Spin />
      )}
    </div>
  );
};
