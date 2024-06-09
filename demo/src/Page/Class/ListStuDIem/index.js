import { useEffect, useState } from "react";
import getClassList from "../../../common/Api/ApiClassList";
import ReusableTable from "../../../common/component/AntTable";
import { Button } from 'antd';
import { utils, writeFile } from "xlsx";
import { FaFileExport } from "react-icons/fa";

const ListStu = ({ MaGV, HocKy, Nam }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        if (MaGV && HocKy && Nam) {
            getClassList(MaGV, HocKy, Nam)
                .then(data => {
                    const processedData = data.map(student => {
                        if (student.MonHocDetails) {
                            const monHocArray = student.MonHocDetails.split(';');
                            const monHocDetailsArray = monHocArray.map(monHoc => {
                                const monHocInfo = {};
                                const elements = monHoc.split('|');
                                elements.forEach(element => {
                                    const [key, value] = element.split(':').map(item => item.trim());
                                    if (key && value) {
                                        monHocInfo[key] = value;
                                    }
                                });
                                return monHocInfo;
                            });
                            student.MonHocDetails = monHocDetailsArray;
                        }
                        return student;
                    });

                    const dynamicColumns = createDynamicColumns(processedData);

                    setData(processedData);
                    setColumns(dynamicColumns);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [MaGV, HocKy, Nam]);

    const createDynamicColumns = (data) => {
        const columns = [
            {
                title: 'Mã SV',
                dataIndex: 'MaSV',
                key: 'MaSV',
            },
            {
                title: 'Tên',
                dataIndex: 'name',
                key: 'name',
            },
        ];

        const monHocFields = ['TenMon', 'MaMon', 'BuoiHoc', 'DiemDanh'];

        monHocFields.forEach(field => {
            columns.push({
                title: field === 'TenMon' ? 'Tên môn' : field === 'MaMon' ? 'Mã môn' : field === 'BuoiHoc' ? 'Buổi học' : 'Điểm danh',
                dataIndex: field,
                key: field,
                render: (text, record) => {
                    return (
                        <ul>
                            {record.MonHocDetails.map((monHoc, index) => (
                                <p key={index}>{monHoc[field]}</p>
                            ))}
                        </ul>
                    );
                }
            });
        });

        return columns;
    };
    const exportToExcel = () => {
        const headers = [
            "Mã SV",
            "Tên",
            "Tên môn",
            "Mã môn",
            "Buổi học",
            "Điểm danh"
        ];

        // Tạo một đối tượng dùng để lưu trữ dữ liệu được gộp
        const mergedData = {};

        // Duyệt qua dữ liệu và gộp các môn học của cùng một sinh viên
        data.forEach(student => {
            const key = `${student.MaSV}-${student.name}`;
            if (!mergedData[key]) {
                mergedData[key] = {
                    MaSV: student.MaSV,
                    name: student.name,
                    MonHoc: []
                };
            }
            student.MonHocDetails.forEach(detail => {
                mergedData[key].MonHoc.push(detail);
            });
        });

        // Chuyển đổi dữ liệu đã gộp sang định dạng cho file Excel
        const worksheetData = [
            headers,
            ...Object.values(mergedData).map(student => {
                return student.MonHoc.map((detail, index) => [
                    index === 0 ? student.MaSV : '',
                    index === 0 ? student.name : '',
                    detail.TenMon,
                    detail.MaMon,
                    detail.BuoiHoc,
                    detail.DiemDanh
                ]);
            }).flat()
        ];

        // Gộp hàng đầu nếu hàng thứ 2 không có dữ liệu
        if (worksheetData.length > 1 && worksheetData[1].every(cell => cell === '')) {
            worksheetData[0] = worksheetData[0].map((cell, index) => {
                const value = worksheetData[1][index];
                return value !== '' ? `${cell}\n${value}` : cell;
            });
            worksheetData.splice(1, 1);
        }

        const worksheet = utils.aoa_to_sheet(worksheetData);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Students');

        worksheet['!cols'] = headers.map(() => ({ wch: 20 }));
        worksheet['!rows'] = worksheetData.map((_, idx) => ({ hpx: 30 }));

        Object.keys(worksheet).forEach(cell => {
            if (cell[0] !== '!') {
                worksheet[cell].s = {
                    alignment: {
                        wrapText: true
                    }
                };
            }
        });

        writeFile(workbook, 'students.xlsx');
    };

    return (
        <div>
            <h1>Danh sách đi học từng môn {HocKy} năm {Nam} </h1>
            <ReusableTable columns={columns} data={data} loading={loading} />
            <Button onClick={exportToExcel} type="primary" style={{ margin: 16, backgroundColor: "green" }}>
                <FaFileExport /> Xuất file
            </Button>
        </div>
    );
};

export default ListStu;
