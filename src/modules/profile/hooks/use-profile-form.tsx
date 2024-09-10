import { useReducer, useCallback, useState, ChangeEvent } from "react";
import { UserProfileData } from "@/types/session";
import { DateValue } from "@internationalized/date";
import { formatInitialDate } from "../lib/utils";

interface State {
  formData: {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    birthdate: DateValue | null;
    bio: string | null;
    location: string | null;
    profile_image: string | null;
    banner_image: string | null;
    profile_image_file: File | null;
    banner_image_file: File | null;
  };
  tempFormData: {
    user_id: string;
    first_name: string;
    last_name: string;
    username: string;
    birthdate: DateValue | null;
    bio: string | null;
    location: string | null;
    profile_image: string | null;
    banner_image: string | null;
    profile_image_file: File | null;
    banner_image_file: File | null;
  };
}

type Action =
  | { type: "SET_FIELD"; field: keyof State["tempFormData"]; value: any }
  | { type: "SAVE_FORM" }
  | { type: "RESET_FORM" }
  | {
      type: "SET_IMAGE";
      imageType: "profile" | "banner";
      file: File | null;
      image: string | null;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        tempFormData: {
          ...state.tempFormData,
          [action.field]: action.value,
        },
      };
    case "SET_IMAGE":
      return {
        ...state,
        tempFormData: {
          ...state.tempFormData,
          [`${action.imageType}_image_file`]: action.file,
          [`${action.imageType}_image`]: action.image,
        },
      };
    case "SAVE_FORM":
      return {
        ...state,
        formData: { ...state.tempFormData },
      };
    case "RESET_FORM":
      return {
        ...state,
        tempFormData: { ...state.formData },
      };
    default:
      return state;
  }
}

export const useProfileForm = (initialData: UserProfileData | null) => {
  const formattedDate: DateValue | null = formatInitialDate(
    initialData?.birthdate
  );

  const initialState: State = {
    formData: {
      user_id: initialData?.id || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      username: initialData?.username || "",
      birthdate: formattedDate,
      bio: initialData?.bio || "",
      location: initialData?.location || "",
      profile_image: initialData?.profile_image || null,
      banner_image: initialData?.banner_image || null,
      profile_image_file: null,
      banner_image_file: null,
    },
    tempFormData: {
      user_id: initialData?.id || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      username: initialData?.username || "",
      birthdate: formattedDate,
      bio: initialData?.bio || "",
      location: initialData?.location || "",
      profile_image: initialData?.profile_image || null,
      banner_image: initialData?.banner_image || null,
      profile_image_file: null,
      banner_image_file: null,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
    initialData?.profile_image ?? ""
  );
  const [previewBannerImage, setPreviewBannerImage] = useState<string | null>(
    initialData?.banner_image ?? ""
  );

  const setFieldValue = useCallback(
    (field: keyof State["tempFormData"], value: any) => {
      dispatch({ type: "SET_FIELD", field, value });
    },
    []
  );

  const setImage = useCallback(
    (
      imageType: "profile" | "banner",
      file: File | null,
      image: string | null
    ) => {
      dispatch({
        type: "SET_IMAGE",
        imageType,
        file,
        image,
      });
    },
    []
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFieldValue(name as keyof State["tempFormData"], value);
    },
    [setFieldValue]
  );

  const handleDateChange = useCallback(
    (date: DateValue | null) => {
      setFieldValue("birthdate", date);
    },
    [setFieldValue]
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, type: "profile" | "banner") => {
      const file = e.target.files?.[0];
      if (file) {
        setImage(type, file, URL.createObjectURL(file));
      }
    },
    [setImage]
  );

  const handleFilePreview = useCallback(
    (file: File, type: "profile" | "banner") => {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "profile") {
          setPreviewProfileImage(reader.result as string);
        } else {
          setPreviewBannerImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const resetPreviewsImages = useCallback(() => {
    if (initialData) {
      setPreviewProfileImage(initialData.profile_image ?? "");
      setPreviewBannerImage(initialData.banner_image ?? "");
    }
  }, [initialData]);

  const saveFormData = useCallback(() => {
    dispatch({ type: "SAVE_FORM" });
  }, []);

  const resetTempData = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  return {
    formData: state.formData,
    tempFormData: state.tempFormData,
    handleInputChange,
    handleDateChange,
    handleFileChange,
    handleFilePreview,
    resetPreviewsImages,
    setPreviewProfileImage,
    setPreviewBannerImage,
    previewProfileImage,
    previewBannerImage,
    saveFormData,
    resetTempData,
    setEditFormData: (newData: UserProfileData | null) => {
      dispatch({
        type: "SET_FIELD",
        field: "user_id",
        value: newData?.id || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "first_name",
        value: newData?.first_name || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "last_name",
        value: newData?.last_name || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "username",
        value: newData?.username || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "birthdate",
        value: formatInitialDate(newData?.birthdate),
      });
      dispatch({
        type: "SET_FIELD",
        field: "profile_image",
        value: newData?.profile_image || null,
      });
      dispatch({ type: "SET_FIELD", field: "bio", value: newData?.bio || "" });
      dispatch({
        type: "SET_FIELD",
        field: "location",
        value: newData?.location || "",
      });
      dispatch({
        type: "SET_FIELD",
        field: "banner_image",
        value: newData?.banner_image || null,
      });
    },
  };
};
