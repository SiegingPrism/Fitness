import React, { useState, useEffect } from 'react';
import { fetchAIUsage } from '../../services/api.js';

export const AITrainerView: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: 'Good morning Alex! I analyzed your last Push session. Your Incline Bench volume increased by 5%, but your set 3 RIR dropped to 0. Would you like to adjust rest intervals or decrease weight by 2.5kg for set 4?',
      time: '09:41 AM'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [quotaRemaining, setQuotaRemaining] = useState(46);

  useEffect(() => {
    fetchAIUsage().then((res) => {
      if (res && res.data) {
        setQuotaRemaining(res.data.promptsRemainingToday);
      }
    });
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'USER',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);
    setQuotaRemaining((prev) => Math.max(0, prev - 1));

    // Simulate AI Coach reasoning response
    setTimeout(() => {
      setIsTyping(false);
      let responseText = `I have updated your prescription based on your feedback ("${text}"). We will maintain your progressive overload target while extending set 3 rest by +30 seconds.`;
      if (text.toLowerCase().includes('fatigue') || text.toLowerCase().includes('tired')) {
        responseText = 'Understood! I registered an elevation in fatigue markers. I recommend reducing total volume by 1 set for today\'s Leg session and focusing on RPE 7-8.';
      } else if (text.toLowerCase().includes('nutrition') || text.toLowerCase().includes('protein')) {
        responseText = 'Based on your 1.2k kcal burn, target 185g of protein today to optimize myofibrillar protein synthesis post-workout.';
      }

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'AI',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#bef264', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>smart_toy</span>
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1 className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>AI Adaptive Trainer</h1>
              <span style={{ fontSize: '9px', backgroundColor: '#bef264', color: '#0c1324', fontWeight: '900', padding: '2px 6px', borderRadius: '8px' }}>PRO</span>
            </div>
            <span style={{ fontSize: '11px', color: '#bef264', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#bef264' }}></span> Online • {quotaRemaining} prompts left today
            </span>
          </div>
        </div>

        <button onClick={() => setMessages([messages[0]])} style={{ backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#8d9882', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
          Clear Chat
        </button>
      </div>

      {/* 2. Messages List Container */}
      <div className="no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '380px', maxHeight: '460px', overflowY: 'auto', paddingRight: '4px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start', gap: '4px' }}>
            <div style={{
              maxWidth: '85%',
              padding: '14px 16px',
              borderRadius: msg.sender === 'USER' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              backgroundColor: msg.sender === 'USER' ? '#bef264' : '#151b2d',
              color: msg.sender === 'USER' ? '#0c1324' : '#ffffff',
              border: msg.sender === 'USER' ? 'none' : '1px solid #2e3447',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: msg.sender === 'USER' ? '600' : 'normal'
            }}>
              {msg.text}
            </div>
            <span style={{ fontSize: '10px', color: '#8d9882' }}>{msg.time}</span>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#bef264', fontSize: '12px', fontWeight: 'bold' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>sync</span> AI Trainer is analyzing biomechanics...
          </div>
        )}
      </div>

      {/* 3. Quick Recommendation Buttons */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }} className="no-scrollbar">
        <button
          onClick={() => handleSendMessage('Adapt today\'s routine based on fatigue')}
          style={{ padding: '8px 14px', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#bef264', borderRadius: '16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          ⚡ Adapt Routine
        </button>
        <button
          onClick={() => handleSendMessage('What is my optimal protein target for today?')}
          style={{ padding: '8px 14px', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#3cddc7', borderRadius: '16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          🥗 Nutrition Advice
        </button>
      </div>

      {/* 4. Interactive Input Box */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask AI Trainer anything..."
          style={{
            flex: 1,
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '24px',
            padding: '14px 18px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSendMessage()}
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#bef264',
            color: '#0c1324',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>send</span>
        </button>
      </div>
    </div>
  );
};
