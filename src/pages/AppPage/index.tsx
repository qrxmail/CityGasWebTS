import { Button, NavBar, Icon,Tabs, WhiteSpace, Badge} from 'antd-mobile';
import React from 'react';
import { PageContainer} from '@ant-design/pro-layout';

const TableList: React.FC<{}> = () => {
  const tabs = [
    { title: <Badge text={'3'}>First Tab</Badge> },
    { title: <Badge text={'今日(20)'}>Second Tab</Badge> },
    { title: <Badge dot>Third Tab</Badge> },
  ];
  
  const tabs2 = [
    { title: 'First Tab', sub: '1' },
    { title: 'Second Tab', sub: '2' },
    { title: 'Third Tab', sub: '3' },
  ];
  const TabExample = () => (
    <div>
       <Button>default</Button>
       <Button type="primary">primary</Button>
      <Tabs tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
       <Button type="primary">primary</Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
      <WhiteSpace />
      <Tabs tabs={tabs2}
        initialPage={1}
        tabBarPosition="bottom"
        renderTab={tab => <span>{tab.title}</span>}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of first tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of second tab
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
          Content of third tab
        </div>
      </Tabs>
      <WhiteSpace />
    </div>
  );

  return (
    <TabExample/>
  //   <PageContainer>
  //    <Button>default</Button>
  //    <div>
  //   <NavBar
  //     mode="light"
  //     icon={<Icon type="left" />}
  //     onLeftClick={() => console.log('onLeftClick')}
  //     rightContent={[
  //       <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
  //       <Icon key="1" type="ellipsis" />,
  //     ]}
  //   >NavBar</NavBar>

  //   <NavBar
  //     mode="dark"
  //     leftContent="Back"
  //     rightContent={[
  //       <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
  //       <Icon key="1" type="ellipsis" />,
  //     ]}
  //   >NavBar</NavBar>
  // </div>
  // <TabExample/>
    // </PageContainer>
  );
};

export default TableList;
