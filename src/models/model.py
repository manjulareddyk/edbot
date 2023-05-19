import os
from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains import ConversationalRetrievalChain
from langchain.vectorstores import FAISS


# os.environ['OPENAI_API_KEY'] = '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'

os.environ["OPENAI_API_KEY"] = "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"


def create_chat_history_vectorstore(initial_query):
    db = FAISS.from_texts(initial_query, embedding=OpenAIEmbeddings())
    db.save_local("../../docs/chat_history.index")


def ingest_chat_history(new_query, answer, db):
    db.add_texts("Question::" + new_query)
    db.add_texts("Answer::" + answer)
    db.save_local("../../docs/chat_history.index")


def load_chat_history():
    db = FAISS.load_local("../../docs/chat_history.index", embeddings=OpenAIEmbeddings())
    return db


llm = OpenAI(temperature=0.1)
prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

# ingest_docs()


def run_model(question):
    db = FAISS.load_local(
        "../../docs/faiss_indices/qualcomm-1.pdf.index", embeddings=OpenAIEmbeddings()
    )

    # Adapt if needed
    CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(
        """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:"""
    )

    qa = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=db.as_retriever(),
        condense_question_prompt=CONDENSE_QUESTION_PROMPT,
        return_source_documents=True,
        verbose=False,
    )

    result = qa({"question": question, "chat_history": []})

    print("Question:", question)
    print("Answer:", result["answer"])

    ch = load_chat_history()
    print("Chat history DB")
    print(db)
    
    # ingest_chat_history(question, result["answer"], ch)

    return result["answer"]


# Run if not using api
create_chat_history_vectorstore("New file created")
# run_model("what is this document about?")
