import React from 'react';

const StudentTable = () => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={styles.tableCell}>Mã sinh viên</th>
          <th style={styles.tableCell}>Họ và tên</th>
          <th style={styles.tableCell}>Môn học</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={styles.tableCell} rowSpan="2">K205480106005</td>
          <td style={styles.tableCell} rowSpan="2">Nguyễn Duy Cao</td>
          <td style={styles.tableCell}>Lập trình Python (TEE0480)</td>
        </tr>
        <tr>
          <td style={styles.tableCell}>TEE0479</td>
        </tr>
      </tbody>
    </table>
  );
};

const styles = {
  tableCell: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
  }
};

export default StudentTable;
