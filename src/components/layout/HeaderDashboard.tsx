import { Avatar, Badge, Drawer, Dropdown, Image, Spin } from "antd";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { Link } from "react-router-dom";
import MobileSidebar from "../MobileSideber";
import { useGetProfileQuery } from "../../redux/features/user/userApi";
import { imageUrl } from "../../redux/base/baseAPI";
import { useGetNotificationsQuery } from "../../redux/features/notification/notificationApi";

const HeaderDashboard = () => {
  const [open, setOpen] = useState(false);

  const {
    data: profileData,
    isLoading,
    isError,    
  } = useGetProfileQuery(undefined);

   const { data: notificationData } = useGetNotificationsQuery(undefined);

   console.log("notificationData", notificationData?.notifications?.length);
  const unreadNotification =    notificationData?.notifications.filter((notification:any)=> notification?.isRead === false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: any["items"] = [
    {
      key: "1",
      label: (
        <div className="">
          <h4 className="font-bold text-primary"> {profileData?.name}</h4>
          <p> {profileData?.role}</p>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <Link to="/profile" className="font-bold text-primary">
          Profile
        </Link>
      ),
      extra: "⌘P",
    },
  ];

  return (
    <div className={`bg-white  w-full px-5  md:mb-0`}>
      {/* <div className={`bg-white ${!hideSearch ? "max-h-[130px] lg:min-h-[80px]" : "min-h-[80px]"} w-full px-5  md:mb-0`}> */}
      <div className="flex items-center justify-between pt-5 pb-2 md:py-3 flex-wrap flex-col-reverse md:flex-row">
        <div className="flex justify-between items-center w-full md:w-auto md:block ml-auto">
          <FiMenu onClick={showDrawer} size={24} className="md:hidden" />
          <div className="flex items-center gap-5 ml-auto">
            <Link to="/notification">
              <Badge showZero count={unreadNotification?.length > 0 ? unreadNotification?.length : 0}>
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<GoBell size={24} className="text-grayMedium" />}
                />
              </Badge>
            </Link>

            <div className="flex items-center gap-3 rounded-md">
              <Dropdown
                menu={{ items }}
                placement="bottomCenter"
                arrow={{ pointAtCenter: true }}
                className="md:hidden"
              >
                <img
                  src={
                    profileData?.image && profileData?.image.startsWith("http")
                      ? profileData?.image
                      : profileData?.image
                      ? `${imageUrl}${profileData?.image}`
                      : "/placeholder.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Dropdown>
              <Link to="/profile">
                {isLoading ? (
                  <Spin />
                ) : isError ? (
                  <p>Something Wrong</p>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        profileData?.image &&
                        profileData?.image.startsWith("http")
                          ? profileData?.image
                          : profileData?.image
                          ? `${imageUrl}${profileData?.image}`
                          : "/placeholder.png"
                      }
                      alt=""
                      className="w-10 h-10 rounded-full object-cover hidden md:block"
                    />
                    <div className="hidden md:block">
                      <h4 className="font-bold text-primary text-lg">
                        {profileData?.name}
                      </h4>
                      <p className="text-sm font-semibold text-grayMedium">
                        {profileData?.role}
                      </p>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title={
          <Link to="/">
            <img
              src="/logo.png"
              className="mx-auto w-[150px] h-[50px] object-contain overflow-visible"
              alt="Logo"
            />
          </Link>
        }
        onClose={onClose}
        open={open}
        footer={false}
        placement="left"
        closeIcon={false}
        width={250}
      >
        <MobileSidebar onClose={() => setOpen(!open)} />
      </Drawer>
    </div>
  );
};

export default HeaderDashboard;
