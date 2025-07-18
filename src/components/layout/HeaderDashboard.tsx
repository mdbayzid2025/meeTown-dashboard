import { Avatar, Badge, Form, Input } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { useEffect } from 'react'
import { GoBell } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { useLocation, useSearchParams } from 'react-router-dom'



const HeaderDashboard = () => {
  const links = ["/about", "/", "/password-change", "/faq", "/terms-condition"]
  const location = useLocation();
  const hideSearch = links.includes(location?.pathname);

  const [, setSearchParams]= useSearchParams()

  const [form] = Form.useForm();
  const search = Form.useWatch("search", form);

  useEffect(() => {  
      setSearchParams({ searchQuery: search ?? "" });    
  }, [search]);

  useEffect(() => {  
      form.setFieldValue("search", "");    
  }, [location?.pathname]);

  

  return (
    <div className='bg-white min-h-[80px] w-full px-5'>
      <div className="flex items-center justify-between py-3">
        {!hideSearch && <div className="w-1/3">
          <Form form={form}>
            <FormItem name="search">
              <Input name='search' style={{ background: "#EBEBEB", height: 50, borderRadius: 14, border: "none", color: "#767676", fontSize: 15 }} className='font-medium' prefix={<IoSearch size={24} />} placeholder='Search here...' />
            </FormItem>
          </Form>
        </div>}
        <div className="flex items-center gap-5 ml-auto">
          <Badge count={99}>
            <Avatar shape="circle" size="large" icon={<GoBell size={24} className='text-grayMedium' />} />
          </Badge>

          <div className="flex items-center gap-3  py-2.5 px-4 rounded-md">
            <img src="https://i.ibb.co/sJbPZbhw/494219200-2564029370601695-4810029999983361589-n.jpg" alt="" className='w-10 h-10 rounded-full object-cover' />
            <div className="">
              <h4 className='font-bold text-primary text-lg'>Afsana Mimi</h4>
              <p className='text-sm font-semibold text-grayMedium'>Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderDashboard