export interface DSLStep {
  type: "http_request" | "ui_action" | "conditional" | "sequence";
  method?: "GET" | "POST";
  url?: string;
  body?: Record<string, any>;
  source?: string;
  target?: string;
  condition?: string;
  steps?: DSLStep[];
}

export interface KiroPlan {
  action: string;                // e.g., "create_handler"
  sourceComponentId?: string;    // e.g., "btn-123"
  targetComponentId?: string;    // e.g., "input-456"
  dsl: DSLStep;                  // core plan
  explanation: string;
  patches: any[];                // JSON patch objects
}
