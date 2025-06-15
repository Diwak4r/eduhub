
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, User, Sparkles, Zap, Settings, AlertCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

type DiwaMode = 'lite' | 'steroids';

export default function ChatInterface() {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<DiwaMode>('lite');
  const [retryCount, setRetryCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Initialize welcome message only once when user is authenticated
  useEffect(() => {
    if (user && !isInitialized) {
      console.log('Initializing chat with welcome message');
      setMessages([{
        id: '1',
        content: "Hello! I'm Diwa, your AI assistant for RiverSkills. I'm currently in Lite mode - focused and efficient for learning and career guidance. You can switch to Steroids mode for unlimited AI capabilities across any topic. What would you like to know?",
        sender: 'bot',
        timestamp: new Date(),
      }]);
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleModeSwitch = useCallback(async (newMode: DiwaMode) => {
    if (newMode === currentMode || !user) return;
    
    console.log('Switching to mode:', newMode);
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
        console.error('Mode switch error:', error);
        throw new Error(error.message || 'Failed to switch mode');
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
      toast({
        title: "Mode Switched",
        description: `Diwa is now in ${newMode === 'steroids' ? 'Steroids' : 'Lite'} mode.`,
      });
    } catch (error) {
      console.error('Error switching mode:', error);
      toast({
        title: "Error",
        description: "Failed to switch mode. Please try again.",
        variant: "destructive",
      });
      // Revert mode on error
      setCurrentMode(currentMode === 'lite' ? 'steroids' : 'lite');
    } finally {
      setIsLoading(false);
    }
  }, [currentMode, user, toast]);

  const handleSendMessage = useCallback(async (retryMessage?: string) => {
    const messageToSend = retryMessage || inputMessage.trim();
    if (!messageToSend || isLoading || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      sender: 'user',
      timestamp: new Date(),
    };

    if (!retryMessage) {
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
    }
    
    setIsLoading(true);

    try {
      console.log('Sending message:', messageToSend);

      const { data, error } = await supabase.functions.invoke('chat-with-diwa', {
        body: { 
          message: messageToSend,
          mode: currentMode
        },
      });

      if (error) {
        console.error('Chat error:', error);
        throw new Error(error.message || 'Failed to get response');
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setRetryCount(0);
    } catch (error) {
      console.error('Error sending message:', error);
      
      let errorMessage = "Failed to send message. Please try again.";
      
      if (error.message?.includes('401') || error.message?.includes('Authorization')) {
        errorMessage = "Authentication error. Please refresh the page and try again.";
      } else if (error.message?.includes('429')) {
        errorMessage = "Rate limit exceeded. Please wait a moment before trying again.";
      } else if (error.message?.includes('503') || error.message?.includes('AI service')) {
        errorMessage = "AI service is temporarily unavailable. Please try again in a moment.";
      }
      
      const errorBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `❌ ${errorMessage}`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorBotMessage]);
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        action: retryCount < 3 ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              setRetryCount(prev => prev + 1);
              handleSendMessage(messageToSend);
            }}
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            Retry
          </Button>
        ) : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, isLoading, user, currentMode, retryCount, toast]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  const getModeColor = useMemo(() => {
    return currentMode === 'steroids' ? 'from-purple-500 to-pink-600' : 'from-red-500 to-red-600';
  }, [currentMode]);

  const getModeBgColor = useMemo(() => {
    return currentMode === 'steroids' ? 'bg-purple-50 border-purple-200' : 'bg-red-50 border-red-200';
  }, [currentMode]);

  const getModeButtonColor = useMemo(() => {
    return currentMode === 'steroids' ? 'bg-purple-500 hover:bg-purple-600' : 'bg-red-500 hover:bg-red-600';
  }, [currentMode]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Show authentication required message
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Authentication Required</h3>
        <p className="text-gray-500 text-center mb-4">
          Please sign in to chat with Diwa, your AI assistant.
        </p>
        <Button 
          onClick={() => window.location.href = '/auth'}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[80vh] bg-white rounded-lg border border-red-200 shadow-lg">
      {/* Chat Header with Mode Controls */}
      <div className={`flex items-center justify-between p-4 border-b rounded-t-lg ${getModeBgColor}`}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor} rounded-full flex items-center justify-center`}>
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
              {currentMode === 'steroids' ? 'Unlimited AI capabilities' : 'Focused on learning & careers'}
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
              <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor} rounded-full flex items-center justify-center flex-shrink-0`}>
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
                  ? `${getModeButtonColor} text-white ml-auto`
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
            <div className={`w-8 h-8 bg-gradient-to-br ${getModeColor} rounded-full flex items-center justify-center`}>
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
      <div className={`p-4 border-t rounded-b-lg ${getModeBgColor}`}>
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={currentMode === 'steroids' 
                ? "Ask Diwa anything - from creative writing to coding, philosophy to problem-solving..." 
                : "Ask Diwa about RiverSkills courses, career guidance, and learning resources..."
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
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className={`${getModeButtonColor} text-white px-4 py-2 h-11`}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
