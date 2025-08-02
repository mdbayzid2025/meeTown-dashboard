import { Spin } from 'antd';

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <Spin
        indicator={
          <img src="/logo.png" className="w-20 h-20 animate-spin-slow" alt="Loading" />
        }
      />
    </div>
  );
};


export default PageLoader;