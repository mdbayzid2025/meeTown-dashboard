import { Avatar, Badge, Drawer, Dropdown, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import MobileSidebar from "../MobileSideber";

const HeaderDashboard = () => {
  const [open, setOpen] = useState(false);

  const links = ["/about", "/support", "/notification", "/password-change", "/faq", "/terms-condition"];
  const location = useLocation();
  const hideSearch = links.includes(location?.pathname);

  const [, setSearchParams] = useSearchParams();

  const [form] = Form.useForm();
  const search = Form.useWatch("search", form);

  useEffect(() => {
    setSearchParams({ searchQuery: search ?? "" });
  }, [search]);

  useEffect(() => {
    form.setFieldValue("search", "");
  }, [location?.pathname]);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  

  const items: any['items'] = [
  {
    key: '1',
    label: (
      <div className="">
      <h4 className="font-bold text-primary">Mimi Akter</h4>
      <p>Admin</p>
      </div>
    ),
  },  
];

  return (
    <div className={`bg-white  w-full px-5  md:mb-0`}>
      {/* <div className={`bg-white ${!hideSearch ? "max-h-[130px] lg:min-h-[80px]" : "min-h-[80px]"} w-full px-5  md:mb-0`}> */}
      <div className="flex items-center justify-between pt-5 pb-2 md:py-3 flex-wrap flex-col-reverse md:flex-row">
        {!hideSearch && (
          <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
            {/* <div className="w-full md:w-1/3 mt-5"> */}
            <Form form={form}>
              <FormItem name="search">
                <Input
                  name="search"
                  style={{
                    background: "#EBEBEB",
                    height: 40,
                    borderRadius: 14,
                    border: "none",
                    color: "#767676",
                    fontSize: 15,
                  }}
                  className="font-medium"
                  prefix={<IoSearch size={24} />}
                  placeholder="Search here..."
                />
              </FormItem>
            </Form>
          </div>
        )}
        <div className="flex justify-between items-center w-full md:w-auto md:block ml-auto">
          <FiMenu onClick={showDrawer} size={24} className="md:hidden" />
          <div className="flex items-center gap-5 ml-auto">
            <Link to="/notification">
              <Badge count={99}>
                <Avatar
                  shape="circle"
                  size="large"
                  icon={<GoBell size={24} className="text-grayMedium" />}
                />
              </Badge>
            </Link>

            <div className="flex items-center gap-3 rounded-md">
               <Dropdown menu={{ items }} placement="bottomCenter" arrow={{ pointAtCenter: true }} className="md:hidden">
              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              </Dropdown>

              <img
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                alt=""
                className="w-10 h-10 rounded-full object-cover hidden md:block"
              />
              <div className="hidden md:block">
                <h4 className="font-bold text-primary text-lg">Mimi Akter</h4>
                <p className="text-sm font-semibold text-grayMedium">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Drawer
        title={<Link to="/">
            <img
              src="/logo.png"
              className="mx-auto w-[150px] h-[50px] object-contain overflow-visible"
              alt="Logo"
            />
          </Link>}        
        closable
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
