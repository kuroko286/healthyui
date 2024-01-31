import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

// axios.defaults.baseURL = 'https://healthy-hub-rest-api.onrender.com/api';
axios.defaults.baseURL = 'http://localhost:8080/v1/';

export const setAuthToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token || ''}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Authorization

export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      console.log(credentials);
      const res = await axios.post('/auth/signup', credentials);
      console.log(res);
      setAuthToken(res.data.token);
      toast.success('Successfully sign up!');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signin = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/signin', credentials);
      setAuthToken(res.data.token);
      toast.success('Successfully sign in!');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('auth/signout', async (_, thunkAPI) => {
  try {
    const url = '/auth/signout';
    await axios.post(url);
    toast.success('Successfully sign out!');
    clearAuthHeader();
  } catch (error) {
    toast.error(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/forgot-password', credentials);
      toast.success('A letter has been sent to your email!');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Recommended food

export const refreshRecommendedFood = createAsyncThunk(
  'auth/get-recommended-food',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/foods/recommended-food');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// User

export const getMonthlyStatistics = createAsyncThunk(
  'auth/getMonthlyStatistics',
  async (month, thunkAPI) => {
    try {
      const res = await axios.get('/users/statistics', {
        params: { month },
      });
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInformation = createAsyncThunk(
  'auth/updateUserInformation',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.put('/users', userData);
      toast.success('User information updated');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserGoal = createAsyncThunk(
  'auth/updateUserGoal',
  async (goalData, thunkAPI) => {
    try {
      const res = await axios.put('/users/goal', goalData);
      toast.success('Goal updated');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserWeight = createAsyncThunk(
  'auth/addUserWeight',
  async (weightData, thunkAPI) => {
    try {
      const res = await axios.post('/weight', weightData);
      toast.success('Weight updated');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addFoodIntake = createAsyncThunk(
  'auth/addFoodIntake',
  async (foodIntakeData, thunkAPI) => {
    try {
      const res = await axios.post('/meals/food-intake', foodIntakeData);
      toast.success('Meal added');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteFoodIntake = createAsyncThunk(
  'auth/deleteFoodIntake',
  async (mealType, thunkAPI) => {
    try {
      const res = await axios.delete('/meals/food-intake', {
        data: mealType,
      });
      toast.success('Meal deleted');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWaterIntake = createAsyncThunk(
  'auth/addWaterIntake',
  async (waterIntakeData, thunkAPI) => {
    try {
      const res = await axios.post('/water/water-intake', waterIntakeData);
      toast.success('Water added');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWaterIntake = createAsyncThunk(
  'auth/deleteWaterIntake',
  async (_, thunkAPI) => {
    try {
      const res = await axios.delete('/water/water-intake');
      toast.success('Water deleted');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateFoodIntake = createAsyncThunk(
  'auth/updateFoodIntake',
  async ({ foodId, foodIntakeData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `/meals/food-intake/${foodId}`,
        foodIntakeData
      );
      toast.success('Meal updated');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addUserAvatar = createAsyncThunk(
  'auth/addUserAvatar',
  async (avatarData, thunkAPI) => {
    try {
      const res = await axios.post('/users/avatar', avatarData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-rapidapi-host': 'file-upload8.p.rapidapi.com',
          'x-rapidapi-key': 'your-rapidapi-key-here',
        },
      });
      toast.success('Avatar updated');
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
