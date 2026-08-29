import { Request, Response, NextFunction } from 'express';

const inMemoryMessages = [
  { id: 1, sender: 'Coach Dan', text: 'Hey Alex! Great push on the bench press today. Form on set 3 looked super tight!', time: '10:14 AM' },
  { id: 2, sender: 'You', text: 'Thanks Coach! RIR was around 1-2. Felt strong throughout the 4 sets.', time: '10:16 AM' }
];

export const getMessages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      data: inMemoryMessages
    });
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ success: false, message: 'Message text is required' });
      return;
    }

    const newMessage = {
      id: inMemoryMessages.length + 1,
      sender: 'You',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    inMemoryMessages.push(newMessage);

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (err) {
    next(err);
  }
};
