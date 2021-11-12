import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <span>welcome</span>
      <Link to='/car/sale/rank' style={{ marginLeft: '15px' }}>
        查看排行榜
      </Link>
      <Link to='/bind/android' style={{ marginLeft: '15px' }}>
        绑定安卓
      </Link>
    </div>
  );
};
