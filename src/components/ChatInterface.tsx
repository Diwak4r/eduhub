
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Sparkles, Zap, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type DiwaMode = 'lite' | 'steroids';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Diwa, your AI assistant for RiverSkills. I'm currently in Lite mode - focused and efficient. You can switch to Steroids mode for full capabilities. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<DiwaMode>('lite');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleModeSwitch = async (newMode: DiwaMode) => {
    if (newMode === currentMode) return;
    
    setCurrentMode(newMode);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-diwa', {
        body: { 
          message: `Switch to ${newMode} mode`,
          mode: newMode,
          isModeSwitching: true
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error switching mode:', error);
      toast({
        title: "Error",
        description: "Failed to switch mode. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat-with-diwa', {
        body: { 
          message: userMessage.content,
          mode: currentMode
        },
      });

      if (error) {
        throw new Error(error.message);
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getModeColor = () => {
    return currentMode === 'steroids' ? 'from-purple-500 to-pink-600' : 'from-red-500 to-red-600';
  };

  const getModeBgColor = () => {
    return currentMode === 'steroids' ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200';
  };

  const getModeButtonColor = () => {
    return currentMode === 'steroids' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-red-500 hover:bg-red-600';
  };

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-white rounded-lg border border-red-200 shadow-lg">
      {/* Chat Header with Mode Controls */}
      <div className={`flex items-center justify-between p-4 border-b rounded-t-lg ${getModeBgColor()}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor()} rounded-full flex items-center justify-center`}>
            {currentMode === 'steroids' ? (
              <Zap className="w-5 h-5 text-white" />
            ) : (
              <Sparkles className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h3 className={`font-semibold ${currentMode === 'steroids' ? 'text-purple-900' : 'text-red-900'}`}>
              Diwa {currentMode === 'steroids' ? 'on Steroids' : 'Lite'}
            </h3>
            <p className={`text-sm ${currentMode === 'steroids' ? 'text-purple-600' : 'text-red-600'}`}>
              {currentMode === 'steroids' ? 'Full AI capabilities unleashed' : 'Focused & efficient assistance'}
            </p>
          </div>
        </div>
        
        {/* Mode Toggle Buttons */}
        <div className="flex gap-2">
          <Button
            variant={currentMode === 'lite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeSwitch('lite')}
            className={currentMode === 'lite' ? 'bg-red-500 hover:bg-red-600 text-white' : 'border-red-300 text-red-600 hover:bg-red-50'}
            disabled={isLoading}
          >
            <Settings className="w-4 h-4 mr-1" />
            Lite
          </Button>
          <Button
            variant={currentMode === 'steroids' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleModeSwitch('steroids')}
            className={currentMode === 'steroids' ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'border-purple-300 text-purple-600 hover:bg-purple-50'}
            disabled={isLoading}
          >
            <Zap className="w-4 h-4 mr-1" />
            Steroids
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor()} rounded-full flex items-center justify-center flex-shrink-0`}>
                {currentMode === 'steroids' ? (
                  <Zap className="w-4 h-4 text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white" />
                )}
              </div>
            )}
            
            <div
              className={`max-w-[80%] rounded-lg px-4 py-3 ${
                message.sender === 'user'
                  ? `${getModeButtonColor()} text-white ml-auto`
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor()} rounded-full flex items-center justify-center`}>
              {currentMode === 'steroids' ? (
                <Zap className="w-4 h-4 text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-white" />
              )}
            </div>
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex gap-1">
                <div className={`w-2 h-2 ${currentMode === 'steroids' ? 'bg-purple-400' : 'bg-red-400'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                <div className={`w-2 h-2 ${currentMode === 'steroids' ? 'bg-purple-400' : 'bg-red-400'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                <div className={`w-2 h-2 ${currentMode === 'steroids' ? 'bg-purple-400' : 'bg-red-400'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`p-4 border-t rounded-b-lg ${getModeBgColor()}`}>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentMode === 'steroids' 
                ? "Ask Diwa anything - from RiverSkills courses to creative writing, coding, or any topic..." 
                : "Ask Diwa about RiverSkills courses and resources..."
              }
              className={`min-h-[44px] max-h-32 resize-none ${
                currentMode === 'steroids' 
                  ? 'border-purple-300 focus:border-purple-500 focus:ring-purple-500' 
                  : 'border-red-300 focus:border-red-500 focus:ring-red-500'
              }`}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className={`${getModeButtonColor()} text-white px-4 py-2 h-11`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
