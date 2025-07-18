import { Col, Divider, Modal, Row } from 'antd';



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
        >
            <div>
                <Divider />
                <Row gutter={[12, 30]}>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Unit</p>
                            <p className="text-[15px] font-medium">{data?.unit}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Duration</p>
                            <p className="text-[15px] font-medium">{data?.duration}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Unit Price</p>
                            <p className="text-[15px] font-medium">{data?.unitPrice}</p>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Price</p>
                            <p className="text-[15px] font-medium">{data?.price}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                         <div className="text-start mb-4">
                        <p className="text-gray-500 font-medium mb-1 text-[15px]">Discount</p>
                        <p className="text-gray-800 font-semibold text-[15px]">{data?.discount}</p>
                    </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Total</p>
                            <p className="text-[15px] font-medium">{data?.total}</p>
                        </div>
                    </Col>

                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Tag</p>
                            <span className=' text-blue-800 font-semibold text-[16px] capu'>{data?.tag}</span>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div>
                            <p className="text-gray-500 text-[15px] font-medium mb-1">Status</p>
                            <span className={`${data?.status === "active" ? "text-green-500" : "text-red"} font-semibold text-[16px] capitalize`}>{data?.status}</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default PackageDetailsModal;
