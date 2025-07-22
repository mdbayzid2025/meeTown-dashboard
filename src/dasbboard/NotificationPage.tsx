import { BellOutlined } from "@ant-design/icons";
import { Button, Empty } from "antd";


const NotificationPage = () => {


  return (
    <div className="p-0 md:p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-grayMedium mb-6">
          Notifications
        </h3>
        <Button type="primary" size="large">
          Read All
        </Button>
      </div>

      {notifications.length === 0 ? (
        <Empty description="No Notifications Found" />
      ) : (
        <div className=" mt-6">
          {notifications.map((item) => (
            <div className={`flex items-center justify-between ${item?.status == "read" ? "bg-white" : "bg-gray"} px-3 py-5 shadow mb-5 rounded-xl`}>
              <div className="flex items-center gap-2 md:gap-5">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  style={{ width: 50, height: 50 }}
                  // icon={<PiBellSimpleFill size={25} color="#ffffff" />}
                  icon={<BellOutlined style={{ fontSize: 25}}/>}
                />
                <div className="">
                  <p className="font-bold text-lg text-nowrap md:text-xl mb-2">{item?.title}</p>
                  <p className="text-[15px] mb-1">{item?.description}</p>
                  <p className="text-[15px] text-grayMedium font-semibold">{item?.date}</p>
                </div>
              </div>
                <Button size="middle" type="primary" className="capitalize">{item?.status}</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationPage;

const notifications = [
  {
    id: 1,
    title: "Appointment Confirmed",
    description: "Your appointment with Dr. Rahman is confirmed.",
    date: "2025-07-22",
    status: "unread",
  },
  {
    id: 2,
    title: "New Blog Posted",
    description: "Check out our latest blog on healthy living!",
    date: "2025-07-20",
    status: "read",
  },
];
