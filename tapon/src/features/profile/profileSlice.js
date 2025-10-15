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
              formData.append(`${key}[]`, [base64]);
            } else if (
              typeof item === "string" &&
              item.startsWith("data:image")
            ) {
              formData.append(`${key}[]`, [item]); // already base64 string
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
          formData.append(`${key}[]`, value ? 1 : 0);
          continue;
        }

        // ✅ Objects or arrays (JSON stringified)
        if (typeof value === "object" && value !== null) {
          formData.append(`${key}[]`, JSON.stringify(value));
          continue;
        }

        // ✅ Primitive values
        if (value !== null && value !== "") {
          formData.append(`${key}[]`, value);
        }
      }

      console.log("profile data", profileData);

      console.log("FormData contents before submission:");
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      // Debug
      console.log("FormData being sent:");
      for (const [k, v] of formData.entries()) {
        console.log(`${k}:`, v);
      }

      debugger;
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

// ✅ Fetch existing profile for editing
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

// ✅ Update profile
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

        // Handle arrays
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
      // ✅ Create
      .addCase(submitProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Fetch
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        console.log(
          "Fetch profile fulfilled with sssss data:",
          action.payload.data
        );
        state.status = "succeeded";
        state.data = { ...state.data, ...action.payload.data };
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // ✅ Update
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { nextStep, prevStep, updateField } = profileSlice.actions;
export default profileSlice.reducer;
