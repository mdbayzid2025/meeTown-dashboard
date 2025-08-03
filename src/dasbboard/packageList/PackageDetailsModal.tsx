import { Col, Divider, Modal, Row } from "antd";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any | null;
};

const PackageDetailsModal = ({ open, setOpen, data }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const formattedDuration = `${data?.duration} ${data?.unit}${
    data?.duration > 1 ? "s" : ""
  }`;

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      title={
        <p className="text-xl font-semibold text-primary text-center">
          Package Details
        </p>
      }
      centered
      width={800}
    >
      <Divider />
      <Row gutter={[12, 30]}>
        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Unit</p>
          <p className="text-[15px] font-medium">{data?.unit}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Duration
          </p>
          <p className="text-[15px] font-medium">{formattedDuration}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Unit Price
          </p>
          <p className="text-[15px] font-medium">${data?.unitPrice}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Price</p>
          <p className="text-[15px] font-medium">${data?.price}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 font-medium mb-1 text-[15px]">Discount</p>
          <p className="text-gray-800 font-semibold text-[15px]">
            {data?.discount}%
          </p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Total Price
          </p>
          <p className="text-[15px] font-semibold text-primary">
            ${data?.totalPrice}
          </p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Tag</p>
          <span className="text-blue-800 font-semibold text-[16px] capitalize">
            {data?.tag}
          </span>
        </Col>
      </Row>
    </Modal>
  );
};

export default PackageDetailsModal;
