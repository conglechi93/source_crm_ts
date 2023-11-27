import {
  CLEAN_STATE,
  GET_PROFILE,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESS,
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  SET_TOKEN_FAILED,
  SET_TOKEN_SUCCESS,
} from 'shared/constants/ActionTypes';

export type InitialStateType = {
  loading: boolean;
  profile: any;
  error: any;
  accessToken: string | null;
  refreshToken: string | null;
  currentAccount: any;
  isAuthenticated: boolean;
};

const initialState: InitialStateType = {
  loading: false,
  profile: null,
  error: null,
  accessToken: null,
  refreshToken: null,
  currentAccount: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOKEN_SUCCESS: {
      console.log('SET_TOKEN_SUCCESS', action.payload);
      return {
        ...state,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        isAuthenticated: true,
        error: null,
      };
    }
    case SET_TOKEN_FAILED: {
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    case LOGIN: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_PROFILE: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profile: action.payload,
        isAuthenticated: true,
      };
    }
    case GET_PROFILE_FAILED: {
      return {
        ...state,
        profile: null,
        loading: false,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
      };
    }
    case CLEAN_STATE:
      return initialState;
    default:
      return state;
  }
};
export default authReducer;
