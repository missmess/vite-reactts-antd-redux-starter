import { useHistory } from 'react-router-dom';
import { Button, Col, Divider, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreApi';
import { selectUserInfo, setUser } from '@/store/user';
import { getItems } from '@/services';
import { Item } from '@/types';
import './index.scss';

export default () => {
  const userInfo = useAppSelector(selectUserInfo);
  const history = useHistory();

  const [data, setData] = useState([] as Item[]);
  useEffect(() => {
    getItems().then((value) => {
      setData(value);
    });
  }, []);

  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (userInfo == null) {
      setTimeout(() => {
        history.replace('/login');
      }, 1000);
    }
  });

  return userInfo ? (
    <div className='main'>
      <h2 className='head'>
        <span>Welcome, {userInfo.nickname}!</span>
        <Button onClick={logout}>logout</Button>
      </h2>
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
  ) : (
    <div className='main'>Unauthorized! Login Page redirecting...</div>
  );
};
