// __mocks__/firebase.js

export const initializeApp = jest.fn(() => ({
    auth: jest.fn(),
    getAuth: jest.fn(),
    getFirestore: jest.fn(),
    getStorage: jest.fn(),
  }));
  export const getDownloadURL = jest.fn();
  export const ref = jest.fn();
  export const uploadBytesResumable = jest.fn();  