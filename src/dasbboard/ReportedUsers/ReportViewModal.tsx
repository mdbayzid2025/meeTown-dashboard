import { Avatar, Button, Modal } from "antd";

// Define the shape of the data prop
interface ReportViewModalProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  data: any | null;
}

const ReportViewModal = ({ open, setOpen, data }: ReportViewModalProps) => {

  const handleWarning = () => {
    console.log(`Warning user: ${data?.user?.name}`);
    // Add logic to send a warning
    setOpen(false); // Close modal after action
  };

  const handleBan = () => {
    console.log(`Banning user: ${data?.user?.name}`);
    // Add logic to ban the user
    setOpen(false); // Close modal after action
  };
  
  // Don't render if there's no data
  if (!data) {
    return null;
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null} // We use custom buttons, so we hide the default footer
      centered
      width={600}
    >
      <div className="flex flex-col items-center gap-2  text-center w-full">
        <Avatar src={data.user.photo} size={128} />
        
        <h2 className="text-xl font-semibold text-gray-700 ">
          {data.user.name}
        </h2>
        
        <div className="">
          <h4 className="text-start underline text-lg font-bold text-blue-600">Reason:</h4>
          <p className="  mt-1 text-lg text-[#D97706] text-justify leading-7">
            {data.reason}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <Button
            style={{ 
              backgroundColor: '#D97706', // A shade of orange/brown
              borderColor: '#D97706',
              color: '#ffffff',
              width: 150,
              height: 50,
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
            onClick={handleWarning}
          >
            Warning
          </Button>

          <Button
            type="primary"
            danger // This makes the button red
            style={{
              width: 150,
              height: 50,
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
            onClick={handleBan}
          >
            Ban
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ReportViewModal;