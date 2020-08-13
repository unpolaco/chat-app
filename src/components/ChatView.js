import React from 'react';

export default function ChatView({ chat }) {
	return (
		<>
			<p>Chatview</p>
			<div>
				{chat.messages.map((msg) => {
					return <p>{msg.message}</p>;
				})}
			</div>
		</>
	);
}
