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
jest.mock("firebase/storage");
import { getDownloadURL } from "firebase/storage";
import { initialStore } from "../actions/UserActions";
import { useContext } from "react";


getDownloadURL.mockResolvedValue("https://example.com/image.png");

test("should render correctly", () => {
    
    
    render(<Provider store={Store}><ChatContextProvider><Input /></ChatContextProvider></Provider>);

    expect(screen.getByRole("textbox")).toBeInTheDocument;
    expect(screen.getByLabelText("Image")).toBeInTheDocument;
    expect(screen.getByText("Send")).toBeInTheDocument;
});


test("should send a message without an image", async () => {
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

    expect(updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({
            id: expect.any(String),
            text: "Hello, world!",
        })
    );
});

test("should send a message with an image", async () => {
    const file = new File(["image data"], "image.png");
    const {dispatch}=useContext(ChatContext);
    dispatch({ type: "CHANGE_USER", payload: {
        user: {_id:'2838237'},
        chatId:"823478324hrf",
      } });

    const { getByRole, getByLabelText } = render(
        
    
    <Provider store={Store}><ChatContextProvider><Input /></ChatContextProvider></Provider>);

    const textbox = getByRole("textbox");
    textbox.value = "This is a message with an image.";

    const imageInput = getByLabelText("Image");
    imageInput.files = [file];

    const sendButton = screen.getByText("Send");
    sendButton.click();

    await Promise.resolve();

    expect(updateDoc).toHaveBeenCalledWith(
        expect.objectContaining({
            id: expect.any(String),
            text: "This is a message with an image.",
            img: "https://example.com/image.png",
        })
    );
});
