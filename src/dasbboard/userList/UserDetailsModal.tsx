import { Modal, Tag, Divider } from 'antd';

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any | null;
};

const UserDetailsModal = ({ open, setOpen, data }: Props) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onCancel={handleClose}
            footer={null}
            centered
            width={600}
            title={null}           
        >
            <div className="">
                {/* User Photo */}
                <img
                    src={data?.photo}
                    alt="User"
                    className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-3 mx-auto"
                />

                <div className="text-center">
                    {/* Status */}
                    <Tag
                        color={data?.status === 'active' ? 'green' : 'red'}
                        className="text-sm mb-4 px-4 py-1 rounded-full"
                    >
                        {data?.status?.toUpperCase()}
                    </Tag>

                    {/* Name */}
                    <h2 className="text-2xl font-semibold text-primary mb-1">{data?.name}</h2>                    
                </div>
                <Divider className="bg-gray-300 my-6 w-full" />

                {/* Info Section */}
                <div className="grid md:grid-cols-2 text-[15px]">
                    <div className="text-start mb-4">
                        <p className="text-gray-500 font-medium mb-1">Email</p>
                        <p className="text-gray-800 font-semibold">{data?.email}</p>
                    </div>

                    <div className="text-start mb-4">
                        <p className="text-gray-500 font-medium mb-1">Address</p>
                        <p className="text-gray-800 font-semibold">{data?.address}</p>
                    </div>

                    <div className="text-start mb-4">
                        <p className="text-gray-500 font-medium mb-1">Point</p>
                        <p className="text-gray-800 font-semibold">{data?.point}</p>
                    </div>

                    <div className="text-start mb-4">
                        <p className="text-gray-500 font-medium mb-1">Status</p>
                        <p className={`text-gray-800 font-semibold ${data?.status === 'active' ? 'green' : 'red'}`}>{data?.status}</p>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default UserDetailsModal;
