import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const props = {
  name: 'file',
  action: 'http://192.168.1.109:59645/api/xlsx',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info:any) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


const TableList: React.FC<{}> = () => {

  const TabExample = () => (
    
    <div>
      <Upload {...props}>
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    </div>
  );

  return (
    <PageContainer>
      <TabExample />
    </PageContainer>
  );
};

export default TableList;
