import { useState, useEffect } from "react";
import type { AgentStatus } from "../types";
import { env } from "../config/env";

export const useAgentStatus = () => {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("checking");

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(env.VITE_BACKEND_URL);

        if (response.ok) {
          setAgentStatus("online");
        } else {
          setAgentStatus("offline");
        }
      } catch (error) {
        console.log("Error occurred while checking the agent status", error);
        setAgentStatus("offline");
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  return agentStatus;
};
