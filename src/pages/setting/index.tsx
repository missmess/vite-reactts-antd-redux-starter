import { Form, Select } from 'antd';
import { CfeRadioButton, CfeRadioButtonGroup } from 'cfe-ui';
import { selectGlobalSetting, setGlobalSetting, Setting } from '@/store/setting';
import { useAppDispatch, useAppSelector } from '@/hooks/useStoreApi';

/** 全局设置组件，该组件修改配置后会直接同步到store中 */
const SettingComp = () => {
  const dispatch = useAppDispatch();
  const setting = useAppSelector(selectGlobalSetting);
  return (
    <>
      <Form<Setting>
        initialValues={setting}
        onValuesChange={(c, v) => dispatch(setGlobalSetting(v))}
        colon={false}
        labelCol={{ span: 8 }}
        labelAlign='left'
        wrapperCol={{ flex: 1 }}
      >
        <Form.Item label='顶部导航模式' name='navType'>
          <Select>
            <Select.Option value='breadcrumb'>使用面包屑</Select.Option>
            <Select.Option value='historytab'>使用历史标签</Select.Option>
            <Select.Option value='all'>都使用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='默认收缩菜单' name='defaultMenuCollapse'>
          <CfeRadioButtonGroup>
            <CfeRadioButton value>收缩</CfeRadioButton>
            <CfeRadioButton value={false}>展开</CfeRadioButton>
          </CfeRadioButtonGroup>
        </Form.Item>
        <Form.Item label='菜单主题色' name='menuTheme'>
          <CfeRadioButtonGroup>
            <CfeRadioButton value='light'>亮色</CfeRadioButton>
            <CfeRadioButton value='dark'>暗色</CfeRadioButton>
          </CfeRadioButtonGroup>
        </Form.Item>
        <Form.Item label='收缩栏主题色' name='collapseTheme'>
          <CfeRadioButtonGroup>
            <CfeRadioButton value='light'>亮色</CfeRadioButton>
            <CfeRadioButton value='dark'>暗色</CfeRadioButton>
          </CfeRadioButtonGroup>
        </Form.Item>
      </Form>
    </>
  );
};

export default SettingComp;
