import { Button, ConfigProvider, Drawer, Menu } from 'antd';
import { MdLogout } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../utils/sidebarItems';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const location = useLocation();

  const sidebarItemGenerator = (items: any[]) => {
    return items.map(item => ({
      key: `/${item.path}`,
      icon: item.icon,
      label: <Link to={`/${item.path}`}>{item.label}</Link>,
    }));
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#002C66',
        },
        components: {
          Menu: {
            itemSelectedBg: '#002C66',
            itemSelectedColor: '#fff',
            itemHeight: 42,
            itemActiveBg: '#002C66',
            itemMarginBlock: 12,
            itemBorderRadius: 0,
            itemColor: '#767676',
          },
        },
      }}
    >
      <Drawer
        title={
          <Link to="/">
            <img
              src="/logo.png"
              className="mx-auto w-[150px] h-[80px] object-contain overflow-visible"
              alt="Logo"
            />
          </Link>
        }
        closable
        onClose={onClose}
        open={open}
        footer={false}
        placement="left"
        width={250}
        className="md:hidden"
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
          }}
        >
          <Menu
            theme="light"
            mode="inline"
            items={sidebarItemGenerator(sidebarItems)}
            selectedKeys={[location.pathname]}
            style={{ flexGrow: 1, overflowY: 'auto' }}
          />

          <Link to="/login">
            <Button
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: 'none',
                borderTop: '1px solid #767676',
                paddingInline: 20,
                outline: 'none',
                height: 45,
                background: 'transparent',
                color: '#002C66',
                marginBlock: 5,
                marginTop: 'auto',
                borderRadius: 0,
              }}
            >
              <MdLogout size={24} />
              Logout
            </Button>
          </Link>
        </div>
      </Drawer>
    </ConfigProvider>
  );
};

export default MobileSidebar;