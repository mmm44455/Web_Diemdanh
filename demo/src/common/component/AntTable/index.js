import React, { useState } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const ReusableTable = ({ columns, data, rowKey }) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  return (
    <Table
      className='table_list'
      dataSource={data}
      columns={columns}
      rowKey={rowKey || ((record, index) => index)}
      pagination={{
        ...pagination,
        total: data.length,
      }}
      onChange={handleTableChange}
    />
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default ReusableTable;
