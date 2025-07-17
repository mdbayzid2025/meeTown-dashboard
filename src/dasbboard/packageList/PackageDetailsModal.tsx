import { Button, Col, Divider, Modal, Row, Tag } from 'antd';
import { LiaEdit } from 'react-icons/lia';



type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any | null;
};

const PackageDetailsModal = ({ open, setOpen, data }: Props) => {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            title={<p className="text-xl font-semibold text-primary text-center">Package Details</p>}
            centered
            width={800}
            styles={{
                content: {
                    background: '#EBEBEB'
                },
                header: {
                    background: '#EBEBEB'
                }
            }}
        >
            <div className="relative">
                <Divider />
                <Row gutter={[12, 30]}>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Unit</p>
                            <p className="text-lg font-medium">{data?.unit}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Duration</p>
                            <p className="text-lg font-medium">{data?.duration}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Unit Price</p>
                            <p className="text-lg font-medium">{data?.unitPrice}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Price</p>
                            <p className="text-lg font-medium">{data?.price}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Discount</p>
                            <p className="text-lg font-medium">{data?.discount}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Total</p>
                            <p className="text-lg font-medium">{data?.total}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Tag</p>
                            <Tag color="blue">{data?.tag}</Tag>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[14px] font-medium mb-1">Status</p>
                            <Tag color={data?.status === 'active' ? 'green' : 'red'}>{data?.status}</Tag>
                        </div>
                    </Col>
                </Row>
                <div className="absolute top-5 right-0">
                    <Button size="large" style={{background: "transparent"}} icon={<LiaEdit size={20} className='!text-primary' />} />
                </div>

            </div>
        </Modal>
    );
};

export default PackageDetailsModal;
