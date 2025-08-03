import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button, Spin } from "antd";
import { toast } from "react-toastify";
import {
  useAddDisclaimerMutation,
  useGetTermsConditionQuery,
} from "../redux/features/setting/settingApi";

const TermsCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data: termsConditionData, isLoading: isFetching, isError, refetch, } = useGetTermsConditionQuery(undefined);
  const [addTarmsCondition, { isLoading: isSubmitting }] = useAddDisclaimerMutation();

  useEffect(() => {
    if (termsConditionData?.content) {
      setContent(termsConditionData.content);
    }
  }, [termsConditionData]);

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "60vh",
      background: "white",
    },
  };

  const handleSubmit = async () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    const plainText = tempDiv.innerText.trim();

    if (!plainText) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      await addTarmsCondition({
        type: "terms-and-condition",
        content,
      }).unwrap();

      toast.success("Saved successfully");
      refetch();
    } catch (err) {
      console.error("Error saving:", err);
      toast.error("Failed to save content");
    }
  };

  return (
    <div className="px-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Terms & Conditions
      </h3>

      {isFetching ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load Terms & Conditions</p>
      ) : (
        <>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />

          <div className="flex items-center justify-end mt-6">
            <Button
              size="large"
              type="primary"
              onClick={handleSubmit}
              className="px-6 py-2"
              loading={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save & Update"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TermsCondition;
