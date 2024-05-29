"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "@/components/Message";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";

import io from "socket.io-client";

const socket = io(`${process.env.API_URL}`);

function formatTime(dateString) {
	const date = new Date(dateString);
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

const Chat = ({ chatId }) => {
	const session = useSession();
	const username = session?.data?.user?.name ?? "Anónimo";

	const [inputValue, setInputValue] = useState("");
	const [messages, setMessages] = useState([]);
	const chatBottomRef = useRef(null);

	useEffect(() => {
		if (window.innerWidth >= 768) {
			chatBottomRef.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [messages]);

	useEffect(() => {
		socket.emit(
			"join",
			{
				username: username ?? "Anónimo",
				chatId: chatId,
			},
			(error) => {
				if (error) {
					alert(error);
				}
			}
		);

		socket.on("allMessages", (messages) => {
			const formattedMessages = messages.map((message) => {
				return {
					chat: message.chatId,
					body: message.body,
					time: formatTime(message.time),
					user: message.username,
				};
			});
			setMessages(formattedMessages);
		});

		socket.on("message", (data, callback) => {
			setMessages((messages) => [
				...messages,
				{
					chat: data.chatId,
					body: data.body,
					time: formatTime(data.time),
					user: data.username,
				},
			]);
			if (typeof callback === "function") {
				callback("Message received successfully");
			}
		});

		socket.on("error", (error) => {
			console.log("Error receiving message:", error);
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from server");
		});

		return () => {
			socket.off("message");
			socket.off("error");
			socket.off("disconnect");
		};
	}, [username]);

	const handleInputChange = (event) => {
		setInputValue(event.target.value);
	};

	const handleSendMessage = () => {
		if (inputValue.trim() !== "") {
			const newMessage = {
				chatId: chatId,
				body: inputValue,
				time: formatTime(new Date()),
				user: username ?? "Anónimo",
			};
			console.log(newMessage);
			setMessages([...messages, newMessage]);
			socket.emit("message", newMessage, { timeout: 60000 }, (error) => {
				if (error) {
					console.log("Error sending message:", error);
				} else {
					console.log("Message sent successfully");
				}
			}); //aca se envia el mensaje
			setInputValue("");
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className="bg-gray-100 flex flex-col justify-end min-h-80 max-h-[500px] md:max-h-[700px] p-1 rounded-sm border border-black">
			<div className="flex-1 overflow-y-auto scroll-smooth">
				{messages.length === 0 ? (
					<p className="text-center text-black">Aún no hay mensajes</p>
				) : (
					messages.map((message, index) => (
						<Message
							key={index}
							body={message.body}
							time={message.time}
							user={message.user ?? "Anónimo"}
							alignRight={message.user == username ?? "Anónimo"}
						/>
					))
				)}
				<div ref={chatBottomRef}></div>
			</div>

			<div className="bg-white flex items-center px-4 py-2 mt-1 h-auto">
				<input
					type="text"
					placeholder="Envía un mensaje..."
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					className="flex-1 mr-2 py-2 px-4 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border-b border-gray-300 resize-y"
				/>

				<button
					onClick={handleSendMessage}
					className="bg-green-500 hover:bg-green-600 rounded-full text-white px-4 py-2 text-lg flex items-center"
				>
					Enviar
					<Send className="ml-1" />
				</button>
			</div>
		</div>
	);
};

socket.on("connect", () => {
	console.log("Connected to server");
	//here we have to receive the messages to set them in the state
});

export default Chat;
