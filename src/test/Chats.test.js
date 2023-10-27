import React from "react";
import { render, screen } from "@testing-library/react";

import { FirebaseFirestore, updateDoc } from "firebase/firestore";
import { db } from '../components/firebase'
import { Provider } from 'react-redux'
import Store from '../Store'
import { ChatContext, ChatContextProvider } from "../components/context/ChatContext";
import Input from '../components/chat/Input'


const firestore = db;
Store.dispatch(initialStore({user:{_id:'817218218dhg873'}}))
// Mock Firebase storage
jest.mock("firebase/firestore");
jest.mock("firebase/storage");
import { getDownloadURL } from "firebase/storage";
import { initialStore } from "../actions/UserActions";
import { useContext } from "react";


getDownloadURL.mockResolvedValue("https://example.com/image.png");

test("should render correctly", () => {
    
    
    render(<Provider store={Store}><ChatContextProvider><Input /></ChatContextProvider></Provider>);

    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByText("Send")).toBeInTheDocument;
});


test("should send a message", async () => {
    // Mock Firebase updateDoc function
    jest.mock("firebase/firestore");

    const updateDoc = jest.fn();

    updateDoc.mockResolvedValue();


    updateDoc.mockResolvedValue();
    

    const { getByRole } = render(<Provider store={Store}><ChatContextProvider><Input /></ChatContextProvider></Provider>);

    const textbox = getByRole("textbox");
    textbox.value = "Hello, world!";

    const sendButton = screen.getByText("Send");
    sendButton.click();

    await Promise.resolve();

    expect(updateDoc).toHaveBeenCalledWith;
});

