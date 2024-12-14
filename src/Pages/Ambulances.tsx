import { useEffect, useState } from 'react';
import { Avatar, Button, Form, Input, List, Modal, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { DeleteFilled, EditFilled, UploadOutlined } from '@ant-design/icons';

function Ambulances() {

    interface DataType {
        gender: string;
        name: {
            title: string;
            first: string;
            last: string;
        };
        email: string;
        picture: {
            large: string;
            medium: string;
            thumbnail: string;
        };
        nat: string;
    }


    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);


    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };



    const handleCancel = () => {
        setOpen(false);
    };

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };



    useEffect(() => {
        loadMoreData();
    }, []);


    const handleOk = async () => {

        setLoading(true);
        console.log("values", form.getFieldsValue());
        const { title, description } = form.getFieldsValue()
        const requestData = {
            name: title,
            email: description
        };

        const response = await fetch('https://example.com/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error('Request failed!');
        }


        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const onEdit = (item: any) => {
        setOpen(true);
        form.setFieldsValue({
            title: item?.name?.title,
            description: item?.email
        })
    }

    const onDelete = (item: any) => {
        console.log("delete", item.id);
    }



    const props: UploadProps = {
        action: 'http://localhost:3000/upload',
        onChange({ file, fileList }) {

            if (file.status !== 'uploading') {
                console.log(file, fileList);
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button type="primary" onClick={showModal}>
                    Create
                </Button>
            </div>

            <div
                id="scrollableDiv"
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <List
                    dataSource={data}
                    pagination={{ position: 'bottom', align: 'end', defaultPageSize: 5 }}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description={item.email}
                            />
                            <div style={{ justifyContent: 'space-between' }}>
                                <div> <EditFilled onClick={() => { onEdit(item) }} /></div>
                                <div><DeleteFilled onClick={() => { onDelete(item) }} /></div>
                            </div>

                        </List.Item>
                    )}
                />
            </div>

            <Modal
                open={open}
                title="Create"
                onCancel={handleCancel}
                footer={null}
            >
                <Form form={form} onFinish={handleOk}>
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Title is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Description is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button key="back" onClick={handleCancel}>
                            Return
                        </Button>
                        <Button key="submit" type="primary" loading={loading} htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Modal>
        </>
    )

}

export default Ambulances
