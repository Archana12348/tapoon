import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Create new profile
export const submitProfile = createAsyncThunk(
  "profile/submitProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      for (const key in profileData) {
        const value = profileData[key];

        if (["skillInput", "serviceInput"].includes(key)) continue;

        if (value instanceof File) {
          formData.append(`${key}[0]`, value);
        } else if (Array.isArray(value)) {
          value
            .filter((v) => v !== null && v !== "")
            .forEach((item, index) => {
              formData.append(`${key}[${index}]`, item);
            });
        } else if (typeof value === "boolean") {
          formData.append(`${key}[0]`, value ? 1 : 0);
        } else if (value !== null && value !== "") {
          formData.append(`${key}[0]`, value);
        }
      }

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
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Fetch existing profile for editing
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://nfc.premierwebtechservices.com/api/user-profiles/srk`,
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
        const value = profileData[key];

        if (value instanceof File) {
          formData.append(key, value); // ✅ Correct
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item); // ✅ works for multiple files or arrays
          });
        } else if (value !== null && value !== "") {
          formData.append(key, value); // ✅ Correct
        }
      }

      const response = await axios.post(
        `https://nfc.premierwebtechservices.com/api/user-profiles/${id}?_method=PUT`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
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
    profile_picture: null,
    cover_photo: null,
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
