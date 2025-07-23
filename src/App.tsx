import { ConfigProvider } from "antd";
import MainLayout from "./components/layout/MainLayout";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#002C66",
          },
          components: {
            Input: {
              borderRadius: 5,
            },
            Table: {
              headerBg: "#F7F7F7",
              bodySortBg: "#F7F7F7",
              colorBgContainer: "#F7F7F7",
              cellPaddingBlock: 6,
              stickyScrollBarBg: "#002C66",
              lineHeight: 3.5
            },
            Pagination: {
              itemActiveBg: "rgb(0,44,102)",
              itemBg: "rgba(0,42,96,0.3215686274509804)",
              colorPrimary: "rgb(255,255,255)",
              colorText: "#000000",
              borderRadius: 25,
              itemSize: 40,
              colorPrimaryHover: "#ffffff",
            },
            Collapse: {
              headerBg: "rgba(0,44,102,.8)",
              colorTextHeading: "rgba(255,255,255,0.88)",
            },
          },
        }}
      >
        <MainLayout />
      </ConfigProvider>
    </>
  );
}

export default App;
