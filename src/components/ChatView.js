import React from 'react';

export default function ChatView({ chat }) {
	return (
		<>
			<p>Chatview</p>
			<div>
				{chat === undefined
					? null
					: chat.messages.map((msg) => {
							return msg.message;
					  })}
			</div>
		</>
	);
}
