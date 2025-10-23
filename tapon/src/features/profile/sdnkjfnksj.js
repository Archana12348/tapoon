import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper: convert File to base64
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// ✅ Create Profile
export const submitProfile = createAsyncThunk(
  "profile/submitProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      for (const key in profileData) {
        const value = profileData[key];
        if (["skillInput", "serviceInput"].includes(key)) continue;

        // ✅ avatar & avatar_original: array of base64 strings
        if (
          (key === "avatar" || key === "avatar_original") &&
          Array.isArray(value)
        ) {
          for (const item of value) {
            if (item instanceof File) {
              const base64 = await fileToBase64(item);
              formData.append(`${key}[]`, base64);
            } else if (
              typeof item === "string" &&
              item.startsWith("data:image")
            ) {
              formData.append(`${key}[]`, item);
            }
          }
          continue;
        }

        // ✅ Gallery array (files or URLs)
        if (key === "gallery" && Array.isArray(value)) {
          value
            .filter((v) => v !== null && v !== "")
            .forEach((item) => {
              if (item instanceof File) {
                formData.append(`${key}[]`, item);
              } else {
                formData.append(`gallery_urls[]`, item);
              }
            });
          continue;
        }

        // ✅ Boolean values
        if (typeof value === "boolean") {
          formData.append(key, value ? 1 : 0);
          continue;
        }

        // ✅ Objects or arrays (JSON stringified)
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
          continue;
        }

        // ✅ Primitive values
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      }

      console.log("Submitting profile data:", profileData);
      const response = await axios.post(
        "https://nfc.premierwebtechservices.com/api/user-profiles",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      return response.data;
    } catch (err) {
      console.error(
        "Profile submission error:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Fetch Existing Profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      console.log("Fetching profile with id:", id);
      const response = await axios.get(
        `https://nfc.premierwebtechservices.com/api/user-profiles/${id}`,
        { withCredentials: true }
      );
      console.log("Fetched profile data:", response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update Profile
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ id, profileData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      for (const key in profileData) {
        let value = profileData[key];

        // Handle base64 images
        if ((key === "avatar" || key === "avatar_original") && value) {
          if (typeof value === "string" && value.startsWith("data:image")) {
            formData.append(key, value);
          } else if (value instanceof File) {
            value = await fileToBase64(value);
            formData.append(key, value);
          }
          continue;
        }

        // Handle boolean fields
        if (
          [
            "status",
            "is_public",
            "allow_contact_form",
            "dark_mode_enabled",
          ].includes(key)
        ) {
          formData.append(key, value ? 1 : 0);
          continue;
        }

        // Handle custom_links as string
        if (key === "custom_links" && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
          continue;
        }

        // Handle other arrays
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
          continue;
        }

        // Normal fields
        if (value !== null && value !== "") {
          formData.append(key, value);
        }
      }

      const response = await axios.post(
        `https://nfc.premierwebtechservices.com/api/user-profiles/${id}?_method=PUT`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Initial State
const initialState = {
  step: 1,
  data: {
    name: "",
    username: "",
    slug: "",
    about: "",
    bio: "",
    email: "",
    phone: "",
    whatsapp_number: "",
    website_url: "",
    city: "",
    country: "",
    state: "",
    area: "",
    avatar: null,
    avatar_original: null,
    gallery: [],
    headline: "",
    company_name: "",
    job_title: "",
    industry: "",
    skills: [],
    services: [],
    linkedin_url: "",
    instagram_url: "",
    facebook_url: "",
    twitter_url: "",
    youtube_url: "",
    github_url: "",
    pinterest_url: "",
    nfc_card_id: "",
    qr_code_url: "",
    vcard_id: "",
    pdf_resume_url: "",
    profile_type: "",
    is_public: true,
    status: true,
    allow_contact_form: true,
    dark_mode_enabled: false,
    custom_theme_color: "#000000",
    seo_title: "",
    seo_description: "",
    seo_keywords: [],
  },
  status: "idle",
  error: null,
};

// ✅ Helper for merging data safely
const mergeData = (state, payload) => {
  if (payload?.data && typeof payload.data === "object") {
    state.data = { ...state.data, ...payload.data };
  }
};

// ✅ Slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    updateField: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ Create Profile
      .addCase(submitProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.success && action.payload?.data) {
          mergeData(state, action.payload);
        }
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      })

      // ✅ Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        mergeData(state, action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      })

      // ✅ Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload?.success && action.payload?.data) {
          mergeData(state, action.payload);
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error;
      });
  },
});

export const { nextStep, prevStep, updateField } = profileSlice.actions;
export default profileSlice.reducer;
