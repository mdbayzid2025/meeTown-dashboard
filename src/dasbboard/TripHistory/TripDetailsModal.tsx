import { Col, Divider, Modal, Row } from "antd";
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

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Accommodation
          </p>
          <p className="text-[15px] font-medium">{data?.accommodation}</p>
        </Col>

        <Col span={12}>
          <p className="text-gray-500 text-[15px] font-medium mb-1">
            Travel With
          </p>
          <p className="text-[15px] font-medium">{data?.travelWith}</p>
        </Col>

        {data?.image && (
          <Col span={24}>
            <p className="text-gray-500 text-[15px] font-medium mb-1">Image</p>
            <img
              src={
                data?.image && data?.image.startsWith("http")
                  ? data?.image
                  : data?.image
                  ? `${imageUrl}${data?.image}`
                  : placeholder
              }
              alt="trip"
              className="w-full max-h-[300px] object-contain rounded"
            />
          </Col>
        )}
      </Row>
    </Modal>
  );
};

export default TripDetailsModal;
