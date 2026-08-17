# Verivo

<p align="center">
  <strong>Verify skills. Build trust. Get hired.</strong>
</p>

<p align="center">
  A portable skill verification and escrow platform for Lagos' informal skilled-trades market.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/AI-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/RAG-Pinecone-000000?style=for-the-badge" alt="Pinecone" />
</p>

---

## The Problem

In Lagos' informal skilled-trades market, one question often stands between an employer and an artisan:

> **"Can I trust this person to actually do the job?"**

Hiring often depends on word-of-mouth, personal recommendations, or unverified claims of experience.

At the same time, skilled workers face the opposite problem:

> **"How do I prove that I'm actually good at what I do?"**

Verivo is built to solve both sides of that problem.

---

## What is Verivo?

**Verivo** is a platform where informal skilled workers can prove their expertise through a diagnostic verification process involving:

- 🧠 **Knowledge assessment**
- 🎙️ **Voice-based AI interaction**
- 🛠️ **Proof of work**
- 📊 **Iṣẹ́ Score**
- 🪪 **Portable, replayable credentials**

Employers can then discover verified workers, compare their credentials and Iṣẹ́ Scores, post jobs, and hire with greater confidence.

Payments are protected through **per-job escrow**, helping reduce payment risk for both sides.

> **Verivo turns trust from something you assume into something you can verify.**

---

## How It Works

```text
                         ┌──────────────────┐
                         │      WORKER      │
                         └────────┬─────────┘
                                  │
                                  ▼
                     ┌────────────────────────┐
                     │   SKILL VERIFICATION  │
                     └───────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                ▼                ▼                ▼
          ┌───────────┐    ┌───────────┐    ┌────────────┐
          │ Knowledge │    │   Voice   │    │ Proof of   │
          │ Assessment│    │ Diagnostic│    │    Work    │
          └─────┬─────┘    └─────┬─────┘    └──────┬─────┘
                │                │                  │
                └────────────────┼──────────────────┘
                                 ▼
                         ┌────────────────┐
                         │  IṢẸ́ SCORE    │
                         └───────┬────────┘
                                 │
                                 ▼
                     ┌──────────────────────┐
                     │ PORTABLE CREDENTIAL  │
                     └──────────┬───────────┘
                                │
                                ▼
                         VERIFIED WORKER
                                │
                                ▼
                    ┌──────────────────────┐
                    │      EMPLOYER        │
                    └──────────┬───────────┘
                               │
                               ▼
                           POST JOB
                               │
                               ▼
                      FIND VERIFIED WORKERS
                               │
                               ▼
                         SEND OFFER
                               │
                               ▼
                        FUND ESCROW
                               │
                               ▼
                          WORK DONE
                               │
                               ▼
                      CONFIRM COMPLETION
                               │
                               ▼
                       RELEASE PAYMENT
```

---

## 🧠 AI-Powered Verification

Verivo uses **RAG + Gemini** to make skill verification more meaningful than a generic AI conversation.

A worker's trade-specific knowledge is grounded against a curated knowledge base.

```text
Knowledge Base
      │
      ▼
   Embeddings
      │
      ▼
   Pinecone
      │
      │  relevant context
      ▼
    Gemini
      │
      ▼
Diagnostic Question
      │
      ▼
Worker Answer
      │
      ▼
Retrieve relevant context
      │
      ▼
    Gemini
      │
      ▼
Next Question / Assessment
```

Instead of simply asking:

> "Are you good at repairing phones?"

Verivo can evaluate whether a worker **actually understands the trade** through contextual diagnostic questions.

---

## 📊 Iṣẹ́ Score

The **Iṣẹ́ Score** is Verivo's core trust signal.

It combines:

**Knowledge** — how well the worker performs during verification.

**Trust** — what the worker demonstrates through completed jobs and work history.

The weighting can evolve as a worker builds experience:

```text
New Worker
    │
    ├── Knowledge carries more weight
    │
    ▼
First Jobs
    │
    ├── Real-world performance begins contributing
    │
    ▼
Completed Jobs
    │
    ├── Trust becomes increasingly important
    │
    ▼
Established Worker
    │
    └── Strong verified reputation
```

This means a new worker can prove their ability without already having years of platform history, while experienced workers can build a stronger reputation through successful jobs.

---

## 💰 Escrow Payments

Trust shouldn't stop at hiring.

Verivo uses job-based escrow to protect the payment process.

```text
EMPLOYER
   │
   │ Fund job
   ▼
┌──────────────┐
│    ESCROW    │
└──────┬───────┘
       │
       │ Worker completes job
       ▼
┌──────────────┐
│   CONFIRM    │
│  COMPLETION  │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   RELEASE    │
│   PAYMENT    │
└──────┬───────┘
       │
       ▼
    WORKER
```

Workers get confidence that funded jobs have money secured.

Employers get confidence that funds are released according to the agreed completion flow.

---

## 🔄 The Verivo Flywheel

```text
       VERIFY
          │
          ▼
      GET SCORED
          │
          ▼
       GET HIRED
          │
          ▼
     COMPLETE JOB
          │
          ▼
    BUILD HISTORY
          │
          ▼
     BUILD TRUST
          │
          ▼
    MORE OPPORTUNITIES
          │
          └───────────↺
```

The more successful work a skilled worker completes, the stronger their portable reputation becomes.

---

# 🏗️ Architecture

```text
                         ┌─────────────────┐
                         │     React       │
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                              REST API
                                  │
                                  ▼
                         ┌─────────────────┐
                         │    Node.js      │
                         │    Express      │
                         └───────┬─────────┘
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
               ▼                 ▼                 ▼
          ┌─────────┐      ┌───────────┐     ┌──────────┐
          │  MySQL  │      │  Gemini   │     │ Pinecone │
          │   DB    │      │    AI     │     │   RAG    │
          └─────────┘      └─────┬─────┘     └────┬─────┘
                                 │                │
                                 └───────┬────────┘
                                         ▼
                              Diagnostic Engine
                                         │
                                         ▼
                                  Iṣẹ́ Score
```

---

# 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | MySQL |
| AI / LLM | Google Gemini |
| RAG | Pinecone |
| Authentication | JWT |
| API | REST |
| Styling | CSS / Bootstrap |
| Voice | Speech-to-Text + Text-to-Speech |
| Deployment | Render / Vercel |

---

# ✨ Core Features

### Worker Verification

Workers go through a structured verification process designed around their specific trade.

### AI Diagnostic Interview

Gemini generates relevant questions using retrieved trade knowledge instead of relying solely on generic model knowledge.

### RAG Knowledge Base

Pinecone retrieves relevant information from Verivo's trade-specific knowledge base before the AI makes its next decision.

### Iṣẹ́ Score

A single trust signal combining verified knowledge and real-world work history.

### Portable Credentials

Workers can build a reputation that isn't dependent solely on word-of-mouth.

### Employer Job Marketplace

Employers can post jobs and discover verified candidates.

### Candidate Matching

Workers can be ranked according to relevance and Iṣẹ́ Score.

### Escrow Payments

Job funds are secured before work is completed and released through the agreed completion flow.

---

# 📁 Project Structure

```text
verivo/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   │   ├── ai/
│   │   ├── rag/
│   │   ├── scoring/
│   │   └── payments/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── ...
│   └── package.json
│
└── README.md
```

---

# 🚀 Getting Started

## Backend

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔐 Environment Variables

Example:

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

GEMINI_API_KEY=

PINECONE_API_KEY=
PINECONE_INDEX=
```

Add your speech and payment provider credentials if those services are enabled in your deployment.

---

# 🧪 API

Example endpoint structure:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Authenticate user |
| GET | `/api/workers/me` | Get worker profile |
| POST | `/api/diagnostic/start` | Start skill verification |
| POST | `/api/diagnostic/answer` | Submit diagnostic answer |
| GET | `/api/workers/:id/score` | Get Iṣẹ́ Score |
| POST | `/api/jobs` | Create job |
| GET | `/api/jobs/:id/matches` | Find matching workers |
| POST | `/api/offers` | Send job offer |
| POST | `/api/escrow` | Fund job escrow |
| POST | `/api/escrow/:id/confirm` | Confirm job completion |

---

# 🎯 Vision

Verivo isn't just another job marketplace.

The goal is to build a **trust infrastructure for informal skilled work**.

A world where:

```text
Good at your trade?
       ↓
Prove it.
       ↓
Build your score.
       ↓
Build your reputation.
       ↓
Get better opportunities.
```

And for employers:

```text
Need skilled labour?
       ↓
Don't rely only on word-of-mouth.
       ↓
Find verified workers.
       ↓
See their track record.
       ↓
Hire with confidence.
```

---

<p align="center">
  <strong>Verivo — Trust, verified.</strong>
</p>

