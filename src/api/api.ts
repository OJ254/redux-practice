'use client';

/**
 * Axios API Instance
 *
 * This file creates a pre-configured Axios instance for making HTTP requests
 * to the backend API. It includes interceptors to handle authentication tokens,
 * errors, and server responses in a safe and consistent way.
 *
 * Key Features:
 * 1. Client-Side Safe: Uses `typeof window !== 'undefined'` to safely access
 *    localStorage for authentication tokens without breaking SSR (Next.js server-side rendering).
 *
 * 2. Request Interceptor:
 *    - Runs before every request.
 *    - Automatically attaches the user's token from localStorage (if available)
 *      to the request headers as `Authorization: Bearer <token>`.
 *
 * 3. Response Interceptor:
 *    - Runs after every response.
 *    - Handles network timeouts and backend errors.
 *    - Includes backend error messages if available (e.g., { message: "Invalid password" }).
 *    - Provides fallback user-friendly messages for common HTTP errors:
 *        - 401 Unauthorized → "Unauthorized, please login again."
 *        - 500 Server Error → "Server error, please try again later."
 *    - Logs errors for debugging and rejects a structured error object
 *      containing `status` and `message` for easy UI handling.
 *
 * 4. TypeScript Types:
 *    - Uses types for requests, responses, and errors to reduce bugs
 *      and improve developer experience.
 *
 * Usage Example:
 * try {
 *   const response = await api.get('/users');
 * } catch (err: any) {
 *   alert(err.message); // shows friendly error message
 * }
 *
 * This setup ensures robust, consistent, and safe API communication
 * throughout the Ticet EDU client application.
 */

import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';

interface ErrorResponse {
  message?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token safely (Next.js client-side check)
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// ✅ Response Interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    let message = 'An unexpected error occurred.';
    let statusCode: number | null = null;

    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      message = 'Request timeout, please try again.';
    }

    // Handle backend errors
    if (error.response) {
      statusCode = error.response.status; // always capture status
      const backendMessage = (error.response.data as ErrorResponse)?.message;

      switch (statusCode) {
        case 401:
          if (backendMessage?.toLowerCase().includes('expired')) {
            // if message has expired in it, then it is expired token
            message = 'Your session has expired. Please login again.';
          } else {
            message = backendMessage || 'Invalid username or password.'; // else invalid login
          }
          break;
        case 500:
          if (backendMessage?.toLowerCase().includes('maintenance')) {
            message =
              'Site is currently down for maintenance, please try again later';
          } else {
            message = backendMessage || 'Server error, please try again later.';
          }

          break;
        default:
          message = backendMessage || message;
          console.warn(`Unhandled error status code: ${statusCode}`); // log unhandled statuses
      }
    }

    // Log for debugging
    console.error(message);

    // Reject structured error for UI
    return Promise.reject({
      status: statusCode,
      message,
    });
  }
);

export default api;

// // Some backends return 200 OK with a JSON message like { success: false, message: "Invalid username or password" }.
// //
// // This is not standard, but you need to handle it if your backend behaves that way.
// //
// //   Example handling in Axios response:
//
//   if (response.data?.success === false) {
//     throw { status: 401, message: response.data.message || 'Invalid username or password' };
//   }

// // OR also to distinguish expired token from invalid login

// if (error.response?.status === 401) {
//   const backendMessage = (error.response.data as ErrorResponse)?.message;
//
//   if (backendMessage?.toLowerCase().includes('expired')) {
//     message = 'Your session has expired. Please login again.';
//     // Optionally: trigger logout or redirect to login page
//   } else {
//     message = backendMessage || 'Invalid username or password.';
//   }
// }

// TODO: Request backend team to include a code field (like "TOKEN_EXPIRED") — it’s more reliable.

// // Small caution: relying on the string "expired" can break if the backend changes the
// // wording. If possible, ask backend to include a code field (like "TOKEN_EXPIRED") — it’s more reliable.
// // same for error 500. relying on message text can be fragile. Consider backend sending a specific error
// // code, e.g., "MAINTENANCE_MODE". Consider logging statusCode + backendMessage for easier monitoring.

// 'use client';
//
// // /**
// //  * Axios API Instance
// //  *
// //  * Pre-configured Axios instance for making HTTP requests to the backend.
// //  * Features:
// //  * 1. Client-side safe token handling for SSR.
// //  * 2. Request interceptor to attach Authorization token automatically.
// //  * 3. Response interceptor handles:
// //  *    - Expired token vs invalid login
// //  *    - Server down / maintenance / 500 errors
// //  *    - Timeout / network errors
// //  *    - Other unhandled status codes
// //  * 4. Structured error rejection: { status, message } for UI display.
// //  */
//
// import axios, {
//   InternalAxiosRequestConfig,
//   AxiosError,
//   AxiosResponse,
// } from 'axios';
//
// interface ErrorResponse {
//   message?: string;
//   code?: string; // optional for backend error codes
// }
//
// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
//
// // ✅ Request Interceptor
// api.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token =
//       typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//
//     if (token) {
//       config.headers = config.headers || {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//
//     return config;
//   },
//   error => Promise.reject(error)
// );
//
// // ✅ Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     let message = 'An unexpected error occurred.';
//     let statusCode: number | null = null;
//
//     // Handle timeout / network errors
//     if (error.code === 'ECONNABORTED') {
//       message = 'Request timeout, please try again.';
//     } else if (!error.response) {
//       // No response from server (network down, server offline)
//       message =
//         'Cannot connect to the server. Check your internet or try again later.';
//     } else {
//       // Backend returned a response
//       statusCode = error.response.status;
//       const backendMessage = (
//         error.response.data as ErrorResponse
//       )?.message?.trim();
//       const backendCode = (error.response.data as ErrorResponse)?.code;
//
//       switch (statusCode) {
//         case 401:
//           if (
//             backendCode === 'TOKEN_EXPIRED' ||
//             backendMessage?.toLowerCase().includes('expired')
//           ) {
//             message = 'Your session has expired. Please login again.';
//           } else {
//             message = backendMessage || 'Invalid username or password.';
//           }
//           break;
//
//         case 500:
//           if (backendMessage?.toLowerCase().includes('maintenance')) {
//             message =
//               'Site is currently down for maintenance, please try again later.';
//           } else {
//             message = backendMessage || 'Server error, please try again later.';
//           }
//           break;
//
//         default:
//           message = backendMessage || message;
//           console.warn(
//             `Unhandled error status ${statusCode}: ${backendMessage || 'No message'}`
//           );
//       }
//     }
//
//     // Log for debugging
//     console.error(message);
//
//     // Reject structured error for UI
//     return Promise.reject({
//       status: statusCode,
//       message,
//     });
//   }
// );
//
// export default api;
