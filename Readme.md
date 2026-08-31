# 🚀 EPC Intelligence Platform

> **AI-Powered Engineering, Procurement & Construction (EPC) Document Intelligence Platform**

An AI-powered platform that helps EPC teams organize project documents, analyze specifications, detect compliance issues, identify project risks, and interact with engineering documents using Retrieval-Augmented Generation (RAG).

---

# 📌 Project Overview

Engineering and construction projects generate thousands of pages of technical documents, specifications, contracts, vendor submissions, and reports. Finding the right information manually is slow, error-prone, and expensive.

The **EPC Intelligence Platform** uses Artificial Intelligence to transform static engineering documents into an interactive knowledge system.

Users can:

* Create EPC projects
* Upload engineering PDF documents
* Extract text automatically
* Generate vector embeddings
* Search documents using AI
* Perform compliance analysis
* Detect project risks
* Generate AI-powered summaries
* View project dashboards

---

# ✨ Features

## 📁 Project Management

* Create EPC projects
* Organize project documents
* Manage uploaded files

---

## 📄 PDF Processing

* Upload engineering PDFs
* Extract text using PyMuPDF
* Store processed documents

---

## 🤖 AI Knowledge Assistant (RAG)

* Ask questions about uploaded documents
* Receive context-aware answers
* Retrieve relevant document sections
* Citation-based responses

Example:

> **Question:**
> What is the UPS capacity for Hall B?

> **Answer:**
> The specified UPS capacity for Hall B is **500 kVA** according to the electrical specification document.

---

## ✅ Compliance Analysis

Compare:

* Project Specifications
* Vendor Submittals

Automatically detect:

* Missing requirements
* Parameter mismatches
* Compliance status
* Critical issues

---

## ⚠ Risk Analysis

AI identifies potential project risks such as:

* Schedule delays
* Procurement risks
* Technical issues
* Missing documentation
* Cost impact

---

## 📊 Dashboard

Visualize:

* Uploaded documents
* Project statistics
* Compliance reports
* Risk summaries
* AI-generated insights

---

# 🏗 System Architecture

```
                React Frontend
                       │
                 Axios API Calls
                       │
                       ▼
               FastAPI Backend
                       │
        ┌──────────────┴──────────────┐
        │                             │
     SQLite Database             AI Services
                                      │
        ┌─────────────────────────────┴─────────────┐
        │                                           │
     PyMuPDF                                  LangChain
        │                                           │
        └──────────────► ChromaDB ◄─────────────────┘
                          │
                          ▼
                      OpenAI API
```

---

# 🛠 Technology Stack

## Frontend

* React
* Vite
* Tailwind CSS
* Axios

---

## Backend

* FastAPI
* Python
* SQLAlchemy
* SQLite
* Pydantic
* Uvicorn

---

## AI

* OpenAI API
* LangChain
* ChromaDB
* PyMuPDF
* Sentence Transformers

---

## Deployment

* GitHub
* Render

---

# 📂 Project Structure

```
epc-intelligence-platform/

├── backend/
│   ├── routers/
│   ├── services/
│   ├── models.py
│   ├── database.py
│   ├── schemas.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── package.json
│
├── uploads/
├── chroma_db/
├── README.md
└── .gitignore
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/your-username/epc-intelligence-platform.git

cd epc-intelligence-platform
```

---

## Backend Setup

```bash
cd backend

python -m venv venv
```

Activate the virtual environment.

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend:

```
http://localhost:8000
```

Swagger Documentation:

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# 📡 API Endpoints

| Method | Endpoint                 | Description         |
| ------ | ------------------------ | ------------------- |
| POST   | /projects                | Create Project      |
| GET    | /projects                | Get Projects        |
| POST   | /projects/{id}/documents | Upload PDF          |
| POST   | /chat                    | AI Chat             |
| POST   | /compliance              | Compliance Analysis |
| POST   | /risk                    | Risk Analysis       |

---

# 👨‍💻 Team

| Role               | Responsibility               |
| ------------------ | ---------------------------- |
| Backend Lead       | FastAPI, Database, APIs      |
| Frontend Lead      | React UI & Dashboard         |
| AI Lead            | RAG, LangChain, ChromaDB     |
| QA & Documentation | Testing, Demo, Documentation |

---

# 📅 Development Workflow

```
Planning
      ↓
Backend Development
      ↓
Swagger Testing
      ↓
Frontend Integration
      ↓
AI Integration
      ↓
Testing
      ↓
Deployment
      ↓
Hackathon Demo
```

---

# 🎯 Project Goals

* Reduce document search time
* Improve engineering productivity
* Automate compliance verification
* Detect project risks early
* Provide intelligent document insights
* Build a scalable AI-assisted EPC platform

---

# 🔮 Future Enhancements

* Multi-user authentication
* Role-based access control
* OCR support for scanned PDFs
* Real-time collaboration
* Multi-language document analysis
* Cloud storage integration
* Advanced analytics dashboard
* BIM software integration

---

# 📸 Screenshots

> Screenshots of the application will be added as development progresses.

---

# 🤝 Contributing

1. Create a new branch.
2. Make your changes.
3. Commit your code.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project was developed as part of a hackathon for educational and demonstration purposes.

---

# ❤️ Acknowledgements

Built using:

* FastAPI
* React
* LangChain
* ChromaDB
* OpenAI API
* PyMuPDF
* Tailwind CSS

Special thanks to our team members and mentors for their support throughout the development of this project.
