import { BellOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Empty, Pagination } from "antd";
import { useGetProfileQuery } from "../redux/features/user/userApi";
import { useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { io } from "socket.io-client";
import { imageUrl } from "../redux/base/baseAPI";
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
} from "../redux/features/notification/notificationApi";
import { LuClock2 } from "react-icons/lu";
import { toast } from "react-toastify";
import { getSearchParams } from "../utils/getSearchParams";
import { useUpdateSearchParams } from "../utils/updateSearchParams";

const NotificationPage = () => {
  const { page } = getSearchParams();
  const updateSearchParams = useUpdateSearchParams();

  const { data: profileData } = useGetProfileQuery(undefined);
  const { data: notificationData, refetch } =
    useGetNotificationsQuery(undefined);
  const [readNotification] = useReadNotificationMutation();

  const limit = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // --------------- Action  -------------------
  useEffect(() => {
    refetch();
  }, [page]);

  useEffect(() => {
    updateSearchParams({ limit, page: currentPage });
  }, [currentPage]);

  const handleReadNotification = async () => {
    try {
      const { success, message } = await readNotification(null).unwrap();

      if (success) {
        toast.success(message);
        refetch();
      }
    } catch (error) {
      console.error("Failed to read notification:", error);
    }
  };

  const socket = useMemo(() => io(imageUrl), []);

  useEffect(() => {
    socket.on(`get-notification::${profileData?._id}`, (data) => {
      console.log("socket data", data);
    });
  }, [socket, profileData?._id]);

  console.log("notificationData", notificationData);

  return (
    <div className="p-0 md:p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-grayMedium ">
          Notifications
        </h3>
        <Button
          type="primary"
          onClick={() => {
            handleReadNotification();
          }}
        >
          Mark all as read
        </Button>
      </div>

      {notificationData?.notifications?.length === 0 ? (
        <Empty description="No Notifications Found" />
      ) : (
        <div className="">
          {notificationData?.notifications?.map((data: any) => (
            <div
              className={`flex items-center justify-between bg-white px-3 py-4 shadow mb-3.5 rounded-xl gap-2`}
            >
              <div className="flex items-center gap-2 md:gap-5">
                <Button
                  type="primary"
                  shape="circle"
                  size="large"                  
                  icon={<BellOutlined style={{ fontSize: 25 }} />}
                />
                <div className="">
                  <p
                    className={`${
                      data?.isRead == true ? "font-medium" : "font-bold"
                    } text-[16px] text-nowrap md:text-xl mb-2`}
                  >
                    {data?.title}
                  </p>
                  <p
                    className={`text-[15px] mb-1 ${
                      data?.isRead == true ? "font-normal" : "font-bold"
                    }`}
                  >
                    {data?.message}
                  </p>
                  <p
                    className={`${
                      data?.isRead == true ? "font-semibold" : "font-bold"
                    } text-[15px] text-grayMedium flex items-center gap-1`}
                  >
                    <LuClock2 size={20} />{" "}
                    {dayjs(data?.date).format("MMMM D, YYYY")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      
        <ConfigProvider
          theme={{
            components: {
              Pagination: {
                itemActiveBg: "#002C66",
                borderRadius: 50,
              },
            },
            token: {
              colorPrimary: "white",
            },
          }}
        >
          <Pagination
          style={{paddingTop: 20}}
            align="center"
            current={currentPage}
            total={notificationData?.pagination?.total}
            pageSize={notificationData?.pagination?.limit}
            showQuickJumper={false}
            showSizeChanger={false}
            onChange={(page) => setCurrentPage(page)}
          />
        </ConfigProvider>
      </div>    
  );
};

export default NotificationPage;
