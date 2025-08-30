import { Spin } from "antd";
import { useGetPrivacyPolicyQuery } from "../redux/features/setting/settingApi";

const PublicPrivecy = () => {
  const { data: privacyPolicyData, isLoading: isFetching, isError } =
    useGetPrivacyPolicyQuery(undefined);

  return (
    <div className="px-4">


      {isFetching ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load Privacy Policy</p>
      ) : (
        <div className="max-w-[1240px] mx-auto mt-10">
      <h3 className="text-2xl px-6 font-semibold text-gray-800 3">
        Privacy Policy
      </h3>
          <div
            className="prose  bg-white p-6 rounded-lg "
            dangerouslySetInnerHTML={{
              __html: privacyPolicyData?.content || "<p>No content available</p>",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default PublicPrivecy;
