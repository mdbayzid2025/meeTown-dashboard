import { ConfigProvider } from "antd"
import MainLayout from "./components/layout/MainLayout"

function App() {

  return (
    <>
     <ConfigProvider
     theme={{
      token: {
        colorPrimary: "#002C66"
      },
      components:{
        Input: {
          borderRadius: 5,
        }
      }
     }}
     >
      <MainLayout />
     </ConfigProvider>
    </>
  )
}

export default App
