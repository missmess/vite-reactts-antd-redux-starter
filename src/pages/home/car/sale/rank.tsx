import { Button } from 'antd';
import { Link, useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  return (
    <div>
      <Button onClick={history.goBack}>返回</Button>

      <Link to='/car/sale/win/detail'>销售冠军详情</Link>
    </div>
  );
};
