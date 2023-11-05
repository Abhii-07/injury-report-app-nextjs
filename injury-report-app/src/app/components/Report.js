import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { Table, Input, Button, Space, Popconfirm, DatePicker, message, Modal, Form, Input as AntdInput } from 'antd';

const { Search } = Input;
const { RangePicker } = DatePicker;

// const columns = [
//     {
//         title: 'Name of Reporter',
//         dataIndex: 'reporterName',
//         key: 'reporterName',
//         sorter: (a, b) => a.reporterName.localeCompare(b.reporterName),
//     },
//     {
//         title: 'Date of Injury (Start)',
//         dataIndex: 'dateOfInjuryStart',
//         key: 'dateOfInjuryStart',
//         sorter: (a, b) => a.dateOfInjuryStart.localeCompare(b.dateOfInjuryStart),
//         render: (text, record) => moment(record.dateOfInjuryStart).format('YYYY-MM-DD'),
//     },
//     {
//         title: 'Time of Injury (Start)',
//         dataIndex: 'timeOfInjuryStart',
//         key: 'timeOfInjuryStart',
//         sorter: (a, b) => a.timeOfInjuryStart.localeCompare(b.timeOfInjuryStart),
//         render: (text, record) => moment(record.dateOfInjuryStart).format('hh:mm A'),
//     },
//     {
//         title: 'Date of Injury (End)',
//         dataIndex: 'dateOfInjuryEnd',
//         key: 'dateOfInjuryEnd',
//         sorter: (a, b) => a.dateOfInjuryEnd.localeCompare(b.dateOfInjuryEnd),
//         render: (text, record) => moment(record.dateOfInjuryEnd).format('YYYY-MM-DD'),
//     },

//     {
//         title: 'Date of Report',
//         dataIndex: 'dateOfReport',
//         key: 'dateOfReport',
//         sorter: (a, b) => a.dateOfReport.localeCompare(b.dateOfReport),
//         render: (text, record) => moment(record.dateOfReport).format('YYYY-MM-DD'),
//     },
//     {
//         title: 'Actions',
//         key: 'actions',
//         render: (_, record) => (
//             <Space size="middle">
//                 <Button onClick={() => handleEdit(record)}>Edit</Button>
//                 <Popconfirm
//                     title="Are you sure you want to delete this report?"
//                     onConfirm={() => handleDelete(record.key)}
//                     okText="Yes"
//                     cancelText="No"
//                 >
//                     <Button>Delete</Button>
//                 </Popconfirm>
//             </Space>
//         ),
//     },
// ];

const Report = () => {
    const [searchText, setSearchText] = useState('');
    const [dateFilter, setDateFilter] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedReport, setEditedReport] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEdit = (record) => {
        setEditModalVisible(true);
        setEditedReport(record);
    };

    const handleSaveEdit = () => {
        // Implement the logic to save the edited report to the backend.
        // After successfully saving, close the modal and refresh the data.
        // You can use the editedReport state to access the edited data.
        // Don't forget to handle loading and error states while saving.
    };

    const columns = [
        {
            title: 'Name of Reporter',
            dataIndex: 'reporterName',
            key: 'reporterName',
            sorter: (a, b) => a.reporterName.localeCompare(b.reporterName),
        },
        {
            title: 'Date of Injury (Start)',
            dataIndex: 'dateOfInjuryStart',
            key: 'dateOfInjuryStart',
            sorter: (a, b) => a.dateOfInjuryStart.localeCompare(b.dateOfInjuryStart),
            render: (text, record) => moment(record.dateOfInjuryStart).format('YYYY-MM-DD'),
        },
        {
            title: 'Time of Injury (Start)',
            dataIndex: 'timeOfInjuryStart',
            key: 'timeOfInjuryStart',
            sorter: (a, b) => a.timeOfInjuryStart.localeCompare(b.timeOfInjuryStart),
            render: (text, record) => moment(record.dateOfInjuryStart).format('hh:mm A'),
        },
        {
            title: 'Date of Injury (End)',
            dataIndex: 'dateOfInjuryEnd',
            key: 'dateOfInjuryEnd',
            sorter: (a, b) => a.dateOfInjuryEnd.localeCompare(b.dateOfInjuryEnd),
            render: (text, record) => moment(record.dateOfInjuryEnd).format('YYYY-MM-DD'),
        },

        {
            title: 'Date of Report',
            dataIndex: 'dateOfReport',
            key: 'dateOfReport',
            sorter: (a, b) => a.dateOfReport.localeCompare(b.dateOfReport),
            render: (text, record) => moment(record.dateOfReport).format('YYYY-MM-DD'),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Button onClick={() => handleEdit(record)}>Edit</Button> */}
                    <>
                        <Button type="primary" onClick={() => setOpen(true)}>
                            Edit
                        </Button>

                    </>
                    <Popconfirm
                        title="Are you sure you want to delete this report?"
                        onConfirm={() => handleDelete(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        axios
            .get('http://localhost:3030/reports')
            .then((response) => {
                const formattedData = response.data.map((report) => ({
                    key: report._id,
                    reporterName: report.reporterName,
                    dateOfInjuryStart: report.dateOfInjuryStart,

                }));
                setFilteredData(formattedData);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSearch = (value) => {
        const filteredResults = filteredData.filter((item) =>
            item.reporterName.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filteredResults);
    };

    const handleDateFilter = (dates) => {
        setDateFilter(dates);
        setLoading(true);

        if (dates.length === 0) {
            axios
                .get('http://localhost:3030/reports')
                .then((response) => {
                    const formattedData = response.data.map((report) => ({
                        key: report._id,
                        reporterName: report.reporterName,
                        dateOfInjuryStart: report.dateOfInjuryStart,

                    }));
                    setFilteredData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        } else {
            axios
                .get(`http://localhost:3030/reports?startDate=${dates[0].format('YYYY-MM-DD')}&endDate=${dates[1].format('YYYY-MM-DD')}`)
                .then((response) => {
                    const formattedData = response.data.map((report) => ({
                        key: report._id,
                        reporterName: report.reporterName,
                        dateOfInjuryStart: report.dateOfInjuryStart,
                    }));
                    setFilteredData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching filtered data:', error);
                    setLoading(false);
                });
        }
    };

    const handleDelete = (key) => {
        axios
            .delete(`http://localhost:3030/reports/${key}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log('Report deleted successfully:', response.data);
                    message.success('Injury Report saved successfully');
                    setFilteredData((prevData) => prevData.filter((item) => item.key !== key));
                } else {
                    console.log('Report not found or could not be deleted:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error deleting report:', error);
            });
    };

    return (
        <>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Search
                    placeholder="Search by reporter's name"
                    onChange={(e) => handleSearch(e.target.value)}
                    enterButton
                    style={{ maxWidth: 300 }}
                />
                <RangePicker
                    style={{ width: '100%' }}
                    ranges={{
                        Today: [moment(), moment()],
                        'This Month': [
                            moment().startOf('month'),
                            moment().endOf('month'),
                        ],
                    }}
                    onChange={handleDateFilter}
                />
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={loading}
                />
            </Space>
            <Modal
                title="Edit"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </>
    );
};

export default Report;