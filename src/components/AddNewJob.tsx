import './styles/NewJob.css'
import { FC, useState } from "react";
import { Button, DatePicker, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import {URLtoBack} from '../ConnectionString';

interface AddNewJobProps {
    jobsList: Array<Job>;
    setJobsList: ChangeList;
}

export const AddNewJob: FC<AddNewJobProps> = ({ jobsList, setJobsList } : AddNewJobProps) => {

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const [dateOfAssigning, setDateOfAssigning] = useState<string | null>();
    const [dueToDate, setDueToDate] = useState<string | null>(); 

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const showModal = () => {
        setIsModalVisible(true);
    }

    const handleSubmit = () => { 
        
        const newJob: Job = {
            id: 0,
            title: form.getFieldValue(['job', 'title']),
            description: form.getFieldValue(['job', 'description']) ? form.getFieldValue(['job', 'description']) : 'No description',
            whoAssigned: form.getFieldValue(['job', 'whoAssigned']),
            assignedTo: form.getFieldValue(['job', 'assignedTo']),
            dateOfAssigning: dateOfAssigning? new Date(dateOfAssigning) : new Date(),
            dueToDate: dueToDate? new Date(dueToDate) : new Date(),
            status: 0,
        }
        
        axios.post(
                URLtoBack,
                newJob)
            .then((res) => {
                newJob.id = res.data.id;

                message.success('Job was added successfully!');

                setIsModalVisible(false);

                setJobsList([
                    newJob,
                    ...jobsList
                ])                
            })
            .catch((error: Error) => {
                console.log('Error during adding new item: ' + newJob);
                console.log(error);
                
                message.error('Error during adding new Job');
                message.error(error.message);
            })
            .finally(() => {
                form.resetFields();
            });
    }

    const handleCancel = () => { 
        setIsModalVisible(false);
        form.resetFields();
    }

    return (
        <>
            <Button className="new-job-button" onClick={showModal}>
                Add new job
            </Button>

            <Modal title="New job" visible={isModalVisible} okButtonProps={{form:'add-new-job', htmlType: 'submit'}} onOk={form.submit} onCancel={handleCancel}>
                <Form form={form} {...layout} id="add-new-job" name="add-new-job" onSubmitCapture={handleSubmit}>
                    <Form.Item required={true} name={['job', 'title']} label="Title">
                        <Input required={true} type="text" maxLength={100} />
                    </Form.Item>
                    <Form.Item name={['job', 'description']} label="Description">
                        <Input.TextArea maxLength={300} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'whoAssigned']} label="Who assigned">
                        <Input required={true} type="text" maxLength={50} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'assignedTo']} label="Assigned to" >
                        <Input required={true} type="text" maxLength={50} />
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'dateOfAssigning']} label="Date of assigning" >
                        <DatePicker aria-required={true} onChange={x => setDateOfAssigning(x?.toString())}/>
                    </Form.Item>
                    <Form.Item required={true} name={['job', 'dueToDate']} label="Due to">
                        <DatePicker aria-required={true} onChange={x => setDueToDate(x?.toString())}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}