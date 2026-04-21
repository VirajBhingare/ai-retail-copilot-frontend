export type Message = {
  role: "user" | "assistant";
  content: string;
  tool_used?: boolean;
};

export type AgentStatus = "online" | "offline" | "checking";
