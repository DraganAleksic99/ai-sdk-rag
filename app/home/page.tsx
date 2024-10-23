"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxToolRoundtrips: 2,
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    handleSubmit(e);
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full min-h-screen max-w-2xl shadow-xl flex flex-col">
        <CardHeader className="p-4">
          <CardTitle className="text-2xl font-bold text-center">
            AI Chatbot
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 flex-1">
          <ScrollArea className="h-[calc(100vh-142px)] px-4 pb-4">
            {messages.map((m) => (
              <div key={m.id} className={`mb-4 flex items-center ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="m-2">
                  <AvatarFallback>
                    {m.role === "user" ? <User /> : <Bot />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold mb-1 capitalize ${m.role === "user" ? "text-end" : ""}`}>
                    {m.role}
                  </span>
                  <div className="bg-white p-3 rounded-lg shadow">
                    {m.content.length > 0 ? (
                      <p className="text-gray-800">{m.content}</p>
                    ) : (
                      <p className="text-gray-500 italic">
                        {"Calling tool: " + m?.toolInvocations?.[0].toolName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={onSubmit}
            className="flex w-full items-center space-x-2"
          >
            <Input
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
              className="flex-grow"
            />
            <Button type="submit" size="icon" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
