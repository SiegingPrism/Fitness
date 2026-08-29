import React, { useState } from 'react';

export const MessagingView: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'Coach Dan', text: 'Hey Alex! Great work on today Push session. How did your final bench set feel with 60kg?', time: '10:14 AM' },
    { sender: 'Alex', text: 'Felt strong! Hit 10 reps on set 1 and 8 on set 2. My RIR was around 2 as prescribed.', time: '10:16 AM' }
  ]);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { sender: 'Alex', text, time: 'Now' }]);
    setText('');
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '110px', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #2e3447' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#bef264', color: '#0c1324', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          CD
        </div>
        <div>
          <h1 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Coach Dan</h1>
          <span style={{ fontSize: '11px', color: '#bef264' }}>● Online</span>
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: m.sender === 'Alex' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '80%', padding: '12px 16px', borderRadius: '16px', backgroundColor: m.sender === 'Alex' ? '#bef264' : '#151b2d', color: m.sender === 'Alex' ? '#0c1324' : '#fff', fontSize: '14px' }}>
              <p>{m.text}</p>
              <span style={{ fontSize: '10px', opacity: 0.7, marginTop: '4px', display: 'block', textAlign: 'right' }}>{m.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ position: 'fixed', bottom: '60px', left: 0, right: 0, padding: '12px 16px', backgroundColor: '#0c1324', borderTop: '1px solid #2e3447' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '12px', padding: '12px 16px', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
          <button onClick={handleSend} style={{ padding: '12px 16px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
