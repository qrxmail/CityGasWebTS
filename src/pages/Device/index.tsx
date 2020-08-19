import React, { FC, useRef, useState, useEffect } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import {Avatar,Button,Card,Dropdown,Input,List,Menu,Modal,Progress,Radio } from 'antd';
import { findDOMNode } from 'react-dom';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import moment from 'moment';
import OperationModal from './components/OperationModal';
import { StateType } from './model';
import { BasicListItemDataType } from './data';
import styles from './style.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;

interface BasicListProps {
  listAndbasicList: StateType;
  dispatch: Dispatch;
  loading: boolean;
}

const ListContent = ({data:{ owner, createdAt, percent, status }}:{ data: BasicListItemDataType;}) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>上海飞奥燃气设备有限公司</span>
    </div>
    {/* <div className={styles.listContentItem}>
      <span>设备能力</span>
      <p>1500Nm3/h</p>
    </div>
    <div className={styles.listContentItem}>
      <span>出厂时间</span>
      <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>出厂编号</span>
      <p>50500060000-000001</p>
    </div> */}
    <div className={styles.listContentItem}>
      <span>投用日期</span>
      <p>{moment(createdAt).format('YYYY-MM-DD')}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>所属公司</span>
      <p>白水</p>
    </div>
    <div className={styles.listContentItem}>
      <span>负责人</span>
      <p>{owner}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>在用</span>
    </div>
  </div>
);

export const BasicList: FC<BasicListProps> = (props) => {
  const addBtn = useRef(null);
  const {
    loading,
    dispatch,
    listAndbasicList: { list },
  } = props;
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);

  useEffect(() => {
    dispatch({
      type: 'listAndbasicList/fetch',
      payload: {
        count: 5,
      },
    });
  }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: 50,
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = (id: string) => {
    dispatch({
      type: 'listAndbasicList/submit',
      payload: { id },
    });
  };

  const editAndDelete = (key: string, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除设备',
        content: '确定删除该设备吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <RadioGroup defaultValue="all">
        <RadioButton value="all" className={styles.radioBtn}>全部</RadioButton>
        <RadioButton value="白水" className={styles.radioBtn}>白水</RadioButton>
        <RadioButton value="澄城" className={styles.radioBtn}>澄城</RadioButton>
        <RadioButton value="扶风" className={styles.radioBtn}>扶风</RadioButton>
        <RadioButton value="蓝田" className={styles.radioBtn}>蓝田</RadioButton>
        <RadioButton value="秦汉" className={styles.radioBtn}>秦汉</RadioButton>
        <RadioButton value="运输" className={styles.radioBtn}>运输</RadioButton>
        <RadioButton value="太白" className={styles.radioBtn}>太白</RadioButton>
        <RadioButton value="吴起" className={styles.radioBtn}>吴起</RadioButton>
        <RadioButton value="延川" className={styles.radioBtn}>延川</RadioButton>
        <RadioButton value="延长" className={styles.radioBtn}>延长</RadioButton>
        <RadioButton value="阎良" className={styles.radioBtn}>阎良</RadioButton>
        <RadioButton value="宜川" className={styles.radioBtn}>宜川</RadioButton>
        <RadioButton value="志丹" className={styles.radioBtn}>志丹</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => editAndDelete(key as string, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const setAddBtnblur = () => {
    if (addBtn.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addBtnDom = findDOMNode(addBtn.current) as HTMLButtonElement;
      setTimeout(() => addBtnDom.blur(), 0);
    }
  };

  const handleDone = () => {
    setAddBtnblur();

    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddBtnblur();
    setVisible(false);
  };

  const handleSubmit = (values: BasicListItemDataType) => {
    const id = current ? current.id : '';

    setAddBtnblur();

    setDone(true);
    dispatch({
      type: 'listAndbasicList/submit',
      payload: { ...values, id },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            //title="生产设备列表"
            style={{ marginTop: 0 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              onClick={showModal}
              ref={addBtn}
            >
              <PlusOutlined />
              添加
            </Button>

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default connect(
  ({
    listAndbasicList,
    loading,
  }: {
    listAndbasicList: StateType;
    loading: {
      models: { [key: string]: boolean };
    };
  }) => ({
    listAndbasicList,
    loading: loading.models.listAndbasicList,
  }),
)(BasicList);
