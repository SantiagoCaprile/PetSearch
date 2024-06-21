"use client";
import React, { useState, useEffect, useRef } from "react";
import Message from "@/components/Message";
import { Send, ArrowBigDown } from "lucide-react";
import { useSession } from "next-auth/react";

import io from "socket.io-client";

const socket = io(`${process.env.API_URL}`);

function formatTime(dateString) {
	const date = new Date(dateString);
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

function formatDate(dateString) {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}/${month}/${year}`;
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
		} else {
			setShowScrollButton(true);
		}
	}, [messages]);

	const [showScrollButton, setShowScrollButton] = useState(false);
	const chatContainerRef = useRef(null);

	const scrollToBottom = () => {
		chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
		setShowScrollButton(false);
	};

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
					date: formatDate(message.time),
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
			if (window.innerWidth >= 768) {
				chatBottomRef.current.scrollIntoView({
					behavior: "smooth",
					block: "end",
				});
			}
		});

		socket.on("error", (error) => {
			console.log("Error receiving message:", error);
		});

		socket.on("disconnect", () => {
			// console.log("Disconnected from server");
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

	const isMobile = () => {
		return window.innerWidth < 768;
	};

	const handleSendMessage = () => {
		if (inputValue.trim() !== "") {
			const newMessage = {
				chatId: chatId,
				body: inputValue,
				time: formatTime(new Date()),
				user: username ?? "Anónimo",
			};
			setMessages([...messages, newMessage]);
			socket.emit("message", newMessage, { timeout: 60000 }, (error) => {
				if (error) {
					console.log("Error sending message:", error);
				}
			}); //aca se envia el mensaje
			setInputValue("");
			if (isMobile()) {
				setTimeout(() => {
					chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
				}, 100); // Timeout to allow the new message to be rendered
			}
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleSendMessage();
		}
	};

	return (
		<div className="bg-gray-100 flex flex-col justify-end min-h-80 max-h-[500px] md:max-h-[700px] p-1 rounded-sm border border-black">
			<div className="flex-1 overflow-y-auto scroll-smooth"
				ref={chatContainerRef}
				onScroll={() => {
					if (window.innerWidth >= 768) return;
					if (
						chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight ===
						chatContainerRef.current.scrollHeight
					) {
						setShowScrollButton(false);
					} else {
						setShowScrollButton(true);
					}
				}
				}
			>
				{messages.length === 0 ? (
					<p className="text-center text-black">Aún no hay mensajes</p>
				) : (
					messages.map((message, index) => {
						const newDay = index === 0 || messages[index - 1].date !== message.date;
						return (
							<>
								{
									newDay &&
									<div key={index} className="flex flex-col items-center">
										<p className="text-xs text-gray-500 bg-gray-300 px-2 py-1 rounded-full">
											{message.date}
										</p>
									</div>
								}
								<Message
									key={index}
									body={message.body}
									time={message.time}
									user={message.user ?? "Anónimo"}
									alignRight={message.user == username ?? "Anónimo"}
								/>
							</>
						);
					}
					)
				)}
				<div className="flex justify-center items-center sticky bottom-0">
					{showScrollButton && (
						<button
							onClick={scrollToBottom}
							className="bg-green-500 hover:bg-green-600 rounded-full text-white p-2 text-lg flex items-center animate-bounce ease-in-out"
						>
							<ArrowBigDown />
						</button>
					)}
				</div>
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
	// console.log("Connected to server");
});

export default Chat;
