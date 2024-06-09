import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
const ReusableTable = ({ columns, data, rowKey }) => {
  return (
    <Table
      className='table_list'
      dataSource={data}
      columns={columns}
      rowKey={rowKey || ((record, index) => index)}
      pagination={false}
    />
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default ReusableTable;
