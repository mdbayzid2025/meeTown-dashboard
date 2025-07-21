import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import HeaderDashboard from './HeaderDashboard';
import Sidebar from './Sidebar';


const { Content } = Layout;
const MainLayout = () => {
    const {
        token: { borderRadiusLG }
    } = theme.useToken();

    return (
        <Layout
            style={{
                height: "100vh",
            }}>
            <Sidebar />
            <Layout>
                <HeaderDashboard />

                <Content style={{ margin: 20 }} className='overflow-y-auto'>
                    <div
                        style={{
                            width: "100%",
                            background: "#F7F7F7",
                            borderRadius: borderRadiusLG
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>

        </Layout>
    )
}

export default MainLayout