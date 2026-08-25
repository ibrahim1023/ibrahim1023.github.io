export const identity = {
  name: "Ibrahim Arshad",
  role: "AI Systems Engineer",
  framing: "I build and evaluate reliable agentic systems.",
  selectedWorkCue: "Selected work",
} as const;

export const settleDiff = {
  title: "SettleDiff",
  descriptor: "Transaction forensics for agent purchases.",
  agentLabel: "AGENT",
  serviceLabel: "SERVICE",
  requestAmount: "0.01 USDC",
  maxBudget: "0.02 USDC",
  attemptLabel: "ACTIVITY RECORDED",
  attemptQualifier: "attempt found — settlement not established",
  verdict: "UNVERIFIABLE",
  verdictReason:
    "Settlement could not be established: no confirmed charge, no transaction hash.",
} as const;

export const evidenceObjects = [
  { id: "request", label: "REQUEST", primary: "0.02 USDC", detail: "max budget" },
  { id: "payment", label: "PAYMENT", primary: "0.01 USDC", detail: "quoted price" },
  { id: "vendor", label: "VENDOR", primary: "synthetic-search", detail: "service" },
  { id: "chain", label: "CHAIN", primary: "base → tempo", detail: "advertised vs executed" },
  { id: "response", label: "RESPONSE", primary: "HTTP 402", detail: "Payment Required" },
  { id: "receipt", label: "RECEIPT", primary: "no transaction hash", detail: "activity record exists" },
] as const;

export const comparisonRows = [
  { id: "chain", aspect: "Chain", expected: "base", observed: "tempo", matches: false },
  { id: "amount", aspect: "Amount", expected: "0.01 USDC", observed: "charge unknown", matches: false },
  { id: "protocol", aspect: "Protocol", expected: "mpp", observed: "mpp", matches: true },
  { id: "vendor", aspect: "Vendor", expected: "synthetic-search", observed: "synthetic-search", matches: true },
  { id: "settlement", aspect: "Settlement evidence", expected: "confirmed charge", observed: "absent", matches: false },
] as const;

export const mismatch = {
  expected: "base",
  observed: "tempo",
  explanation: "Advertised chain differs from executed chain.",
} as const;

export const reasoningChain = [
  { id: "claim", label: "CLAIM", text: "A paid request was attempted and recorded." },
  { id: "evidence", label: "EVIDENCE", text: "Contract, execution, activity, and response artifacts." },
  { id: "finding", label: "FINDING", text: "Chain drifted base → tempo; vendor returned 402; settlement proof absent." },
  { id: "verdict", label: "VERDICT", text: "UNVERIFIABLE" },
] as const;

export const vaultSteward = {
  title: "Vault Steward",
  descriptor: "Keep your vault trustworthy",
  rail: ["PROPOSE", "SIMULATE", "CHECK", "APPROVE"],
  continuationCue: "Case study continues",
  objectMapping: [
    { from: "REQUEST", to: "NOTE" },
    { from: "PAYMENT", to: "PROPOSED CHANGE" },
    { from: "VENDOR", to: "CHECK SOURCE" },
    { from: "CHAIN", to: "POLICY" },
    { from: "RESPONSE", to: "CURRENT / AFTER PREVIEW" },
    { from: "RECEIPT", to: "AUDIT RECORD" },
  ],
} as const;
