# InternShield 🛡️

### Internship Scam Detection & Risk Analysis Platform

InternShield is a web-based platform designed to help students identify **potential scam indicators in internship listings** before they apply or share personal information.

Instead of giving a simple "real/fake" answer, InternShield analyzes an internship listing for common warning signs such as **registration fees, payment requests, unrealistic compensation, urgency, requests for sensitive information, and guaranteed selection claims**.

> ⚠️ **Disclaimer:** InternShield is a risk-analysis tool, not a fraud verification service. Its results are based on heuristic detection rules and should be independently verified.

---

## 🚀 Features

- 🔍 **Internship Listing Analysis**
  - Analyze internship descriptions and identify suspicious patterns.

- 📊 **Risk Score**
  - Generates a 0–100 risk score based on detected warning indicators.

- 🚨 **Risk Classification**
  - Low Risk
  - Medium Risk
  - High Risk

- 🧠 **Explainable Detection**
  - Shows which warning signs were detected instead of returning an unexplained score.

- 📝 **Matched Evidence**
  - Displays phrases from the analyzed content that triggered detection rules.

- 🛡️ **Safety Recommendations**
  - Provides practical steps students can take before applying.

- ⚡ **Server-side Analysis API**
  - Internship content is validated and analyzed through a backend API route.

- 🎨 **Modern Cybersecurity UI**
  - Dark-themed interface with interactive risk visualization and responsive components.

---

## 🧩 How It Works

```text
Internship Listing
        │
        ▼
   Input Validation
        │
        ▼
  Text Normalization
        │
        ▼
   Detection Engine
        │
        ├── Payment Requests
        ├── Registration Fees
        ├── Unrealistic Salary
        ├── Urgency
        ├── Sensitive Information
        └── Guaranteed Selection
        │
        ▼
   Risk Scoring
        │
        ▼
 Risk Classification
        │
        ▼
Warnings + Evidence + Recommendations
```

InternShield currently uses a **rule-based heuristic detection engine**. Each detection rule has an associated severity and score. The final score is capped between 0 and 100.

---

## 📊 Risk Scoring

| Score | Risk Level | Meaning |
|---:|---|---|
| 0–29 | 🟢 Low Risk | No major common warning indicators detected |
| 30–59 | 🟡 Medium Risk | Some warning indicators require verification |
| 60–100 | 🔴 High Risk | Multiple serious warning indicators detected |

The score should **not** be interpreted as a statistical probability that an internship is fraudulent.

---

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- TanStack Router
- Vite

### Backend
- TanStack Start
- Server-side API routes
- TypeScript

### Detection Engine
- Custom rule-based analysis
- Pattern matching
- Warning classification
- Risk scoring
- Input validation

### Development
- Git & GitHub
- Vitest
- ESLint
- Prettier

---

## 📁 Project Structure

```text
InternShield/
├── public/
│   ├── favicon.ico
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── AnalysisResults.tsx
│   │   ├── InternshipScanner.tsx
│   │   ├── RiskScore.tsx
│   │   └── WarningCard.tsx
│   │
│   ├── lib/
│   │   └── detection/
│   │       ├── analyzer.ts
│   │       ├── rules.ts
│   │       ├── scoring.ts
│   │       ├── types.ts
│   │       └── validate.ts
│   │
│   ├── routes/
│   │   ├── api/
│   │   │   └── analyze.ts
│   │   └── index.tsx
│   │
│   ├── types/
│   │   └── analysis.ts
│   │
│   └── styles.css
│
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🔌 API

InternShield exposes a server-side analysis endpoint:

```text
POST /api/analyze
```

Example request:

```json
{
  "content": "Your internship listing text here..."
}
```

The API validates the input before passing it to the detection engine.

The response contains information such as:

```json
{
  "score": 65,
  "riskLevel": "High Risk",
  "verdict": "Likely a scam",
  "warnings": [],
  "recommendations": []
}
```

---

## 🧪 Testing

The project includes automated tests for important parts of the application, including:

- Input validation
- Analysis logic
- Application routing
- Utility functions

Run the test suite with:

```bash
npm run test
```

---

## 💻 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Palak-06-at/scam-internship-detector.git
```

### 2. Enter the project

```bash
cd scam-internship-detector
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL shown in your terminal.

---

## 🔐 Security Considerations

InternShield is designed with security-conscious development practices in mind.

The current implementation includes:

- Server-side request validation
- Input length limits
- Controlled analysis rules
- No API secrets exposed in frontend code
- Separation between UI and detection logic

Future URL-based analysis will require additional protections such as:

- SSRF prevention
- Private IP blocking
- Redirect validation
- Response-size limits
- Request timeouts
- HTML sanitization

---

## 🔮 Future Development

Planned improvements include:

- 🌐 Internship URL analysis
- 🔗 LinkedIn listing analysis
- 🤖 AI-assisted contextual analysis
- 🧠 Hybrid rule-based + AI detection
- 📈 Historical risk reports
- 🔎 Company verification signals
- 📊 Analytics dashboard
- 🌍 Browser extension
- 🗄️ Persistent analysis history

The goal is to evolve InternShield from a rule-based prototype into a more comprehensive **internship safety and verification platform**.

---

## 🎯 Why InternShield?

Students frequently encounter internship listings that may contain misleading compensation, upfront payment requirements, requests for sensitive information, or other suspicious behavior.

InternShield aims to make the first stage of verification faster by turning an internship description into an **explainable risk assessment**.

It doesn't replace human verification — it helps users know **what to investigate before they apply**.

---

## 👩‍💻 Author

**Palak Tyagi**

B.Tech CSE — Cybersecurity

GitHub: [Palak-06-at](https://github.com/Palak-06-at)

---

## 📄 License

This project is currently intended as a portfolio and learning project.
