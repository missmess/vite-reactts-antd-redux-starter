import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      welcome
      <Link to='/car/sale/rank'>查看排行榜</Link>
      <Link to='/bind/android'>绑定安卓</Link>
    </div>
  );
};
