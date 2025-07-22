import { Avatar, Badge, Drawer, Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { GoBell } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { useLocation, useSearchParams } from 'react-router-dom'
import MobileSidebar from '../MobileSideber'



const HeaderDashboard = () => {
  const [open, setOpen] = useState(false);

  const links = ["/about", "/", "/password-change", "/faq", "/terms-condition"]
  const location = useLocation();
  const hideSearch = links.includes(location?.pathname);

  const [, setSearchParams] = useSearchParams()

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



  return (
    <div className={`bg-white  w-full px-5  md:mb-0`}>
    {/* <div className={`bg-white ${!hideSearch ? "max-h-[130px] lg:min-h-[80px]" : "min-h-[80px]"} w-full px-5  md:mb-0`}> */}
      <div className="flex items-center justify-between pt-5 pb-2 md:py-3 flex-wrap flex-col-reverse md:flex-row">

        {!hideSearch &&
          <div className="w-full md:w-1/3 mt-3 md:mt-0 pt-0">
          {/* <div className="w-full md:w-1/3 mt-5"> */}
            <Form form={form}>
              <FormItem name="search">
                <Input name='search' style={{ background: "#EBEBEB", height: 40, borderRadius: 14, border: "none", color: "#767676", fontSize: 15 }} className='font-medium' prefix={<IoSearch size={24} />} placeholder='Search here...' />
              </FormItem>
            </Form>
          </div>}
        <div className="flex justify-between items-center w-full md:w-auto md:block ml-auto">
          <FiMenu onClick={showDrawer} size={24} className='md:hidden' />
          <div className="flex items-center gap-5 ml-auto">
            <Badge count={99}>
              <Avatar shape="circle" size="large" icon={<GoBell size={24} className='text-grayMedium' />} />
            </Badge>

            <div className="flex items-center gap-3 rounded-md">
              <img src="https://i.ibb.co/sJbPZbhw/494219200-2564029370601695-4810029999983361589-n.jpg" alt="" className='w-10 h-10 rounded-full object-cover' />
              <div className="hidden md:block">
                <h4 className='font-bold text-primary text-lg'>Afsana Mimi</h4>
                <p className='text-sm font-semibold text-grayMedium'>Admin</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Drawer
        title="Basic Drawer"
        closable
        onClose={onClose}
        open={open}
        footer={false}
        placement="left"
        closeIcon={<span aria-label="Close Button">×</span>}
        styles={{

          body: {
            padding: 0,
            margin: 0,
            width: "102%",
          },
        }}
      >
        <MobileSidebar open={open} onClose={() => setOpen(!open)} />
      </Drawer>

    </div>
  )
}

export default HeaderDashboard