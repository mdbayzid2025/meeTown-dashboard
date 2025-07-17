import { Button, ConfigProvider, Layout, Menu } from 'antd';
import { MdLogout } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../../utils/sidebarItems';

const { Sider } = Layout;


const Sidebar = () => {
  const location = useLocation();

const sidebarItemGenerator = (items: any[]) => {
    return items.map(item => {
      return {
        key: `/${item.path}`,
        icon: item.icon,
        label: <Link to={`/${item.path}`}>{item.label}</Link>,
      };
    });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#002C66"
        },
        components: {
          Menu: {
            itemSelectedBg: "#002C66",
            itemSelectedColor: "#fff",
            itemHeight: 42,
            itemActiveBg: "#002C66",
            itemMarginBlock: 12,
            itemBorderRadius: 0,
            itemColor: "#9A9A9C",
          }
        }
      }}
    >
      <Sider
        width={250}
        theme='light'
        breakpoint='lg'
        collapsedWidth="0"

      >
        <Link to="/">
          <div
            style={{
              margin: "0 20px",
              paddingTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img src="/logo.png" className="mx-auto w-[150px] h-[80px] object-contain overflow-visible" alt="" />
          </div>
        </Link>

        <div style={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 100px)"

        }}>
          <Menu theme="light" mode='inline'
            items={sidebarItemGenerator(sidebarItems)}
            selectedKeys={[location.pathname]}
            style={{ flexGrow: 1, overflowY: "auto" }}

          />

          <Link to="/login">
            <Button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                border: "none",
                borderTop: "1px solid #767676",
                paddingInline: 20,
                outline: "none",
                height: 45,
                background: "transparent",
                color: "#002C66",
                marginBlock: 5,
                marginTop: "auto",
                borderRadius: 0,
              }}
            >
              <MdLogout size={24} />
              Logout
            </Button>
          </Link>
        </div>


      </Sider>
    </ConfigProvider>
  )
}

export default Sidebar