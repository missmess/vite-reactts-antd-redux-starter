import { Link } from 'react-router-dom';

export default () => {
  return (
    <div style={{ backgroundColor: 'antiquewhite', height: '100vh' }}>
      <span>welcome</span>
      <Link to='/car/sale/rank' style={{ marginLeft: '15px' }}>
        查看排行榜
      </Link>
      <Link to='/bind/android' style={{ marginLeft: '15px' }}>
        绑定安卓
      </Link>
      <Link to='/404' style={{ marginLeft: '15px' }}>
        跳个404
      </Link>
      <Link to='/500' style={{ marginLeft: '15px' }}>
        跳个500
      </Link>
    </div>
  );
};
