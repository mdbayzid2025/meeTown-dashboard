import { Col, Divider, Image, Modal, Row } from "antd";
import dayjs from "dayjs";
import { imageUrl } from "../../redux/base/baseAPI";
import placeholder from "/placeholder.png"

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any | null;
};

const TripDetailsModal = ({ open, setOpen, data }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={800}
      title={
        <p className="text-xl font-semibold text-primary text-center">
          Trip Details
        </p>
      }
    >
      <Divider />

      <Row gutter={[12, 30]}>
        {data?.image && (
          <Col span={24}>            
            <Image
            width="100%"
            height={200}
              src={
                data?.image && data?.image.startsWith("http")
                  ? data?.image
                  : data?.image
                  ? `${imageUrl}${data?.image}`
                  : placeholder
              }
              alt="trip"
              className="w-full max-h-[300px] object-cover rounded"
            />
          </Col>
        )}
        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Place</p>
          <p className="text-[15px] font-medium capitalize">{data?.place}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Country Code
          </p>
          <p className="text-[15px] font-medium">{data?.countryCode}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Start Date
          </p>
          <p className="text-[15px] font-medium">
            {dayjs(data?.startDate).format("DD MMM, YYYY")}
          </p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">End Date</p>
          <p className="text-[15px] font-medium">
            {dayjs(data?.endDate).format("DD MMM, YYYY")}
          </p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">Vehicle</p>
          <p className="text-[15px] font-medium">{data?.vehicle}</p>
        </Col>        
      </Row>
    </Modal>
  );
};

export default TripDetailsModal;
