import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();
  return (
    <div>
      <Button onClick={history.goBack}>返回</Button>
    </div>
  );
};
