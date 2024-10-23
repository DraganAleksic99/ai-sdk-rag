# AI-SDK-RAG

A chatbot that responds only with information that it has within its knowledge base. The chatbot is able to both store and retrieve information.

<br>

https://github.com/user-attachments/assets/c5473474-ff24-4038-af66-317f50a44e49

## Stack

- [Next.js](https://nextjs.org) 14 (App Router)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [OpenAI](https://openai.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Postgres](https://www.postgresql.org/) with [ pgvector ](https://github.com/pgvector/pgvector)
- [shadcn-ui](https://ui.shadcn.com) and [TailwindCSS](https://tailwindcss.com) for styling

## Quickstart

### 1. Clone this repository

Run the following command to clone the repo:

```
git clone https://github.com/DraganAleksic99/ai-sdk-rag.git
```

### 2. Install dependencies

```
cd ai-sdk-rag
npm i
```

### 3. Install [ pgvector ](https://github.com/pgvector/pgvector) postgres extension  

<br>

### 4. Fill out secrets

```
cp .env.example .env
```

### 5. Run app locally

```
npm run dev
```

### Open in your browser

You can now visit http://localhost:3000.
