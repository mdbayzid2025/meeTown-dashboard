import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
    useAddDisclaimerMutation,
    useGetAboutQuery
} from "../redux/features/setting/settingApi";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { data: aboutData, isLoading: isFetching, isError, refetch, } = useGetAboutQuery(undefined);
  const [addTarmsCondition, { isLoading: isSubmitting }] = useAddDisclaimerMutation();

  useEffect(() => {
    if (aboutData?.content) {
      setContent(aboutData.content);
    }
  }, [aboutData]);

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
        type: "about",
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
        About Us
      </h3>

      {isFetching ? (
        <div className="flex justify-center py-10">
          <Spin size="large" />
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load About</p>
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

export default About;
