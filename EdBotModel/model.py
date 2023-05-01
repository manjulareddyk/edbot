from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings

from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.document_loaders import PyPDFLoader
from langchain.docstore.document import Document
import hashlib
import os


from langchain.chains import LLMChain
from langchain.vectorstores import FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Pinecone
from langchain.chains import ChatVectorDBChain

import pinecone




def create_chat_history_vectorstore(initial_query):
    db = FAISS.from_texts(initial_query, embedding=OpenAIEmbeddings())
    db.save_local("docs/chat_history.index")

def ingest_chat_history(new_query, db):
    db.add_texts(new_query)
    db.save_local("docs/chat_history.index")

llm = OpenAI(temperature=0.1)
prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

# ingest_docs()

def run_model():
    db = FAISS.load_local("docs/faiss_indices/qualcomm-1.pdf.index", embeddings=OpenAIEmbeddings())

    from langchain.chains import ConversationalRetrievalChain
    from langchain.prompts import PromptTemplate

    # Adapt if needed
    CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template("""Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:""")

    qa = ConversationalRetrievalChain.from_llm(llm=llm,
                                            retriever=db.as_retriever(),
                                            condense_question_prompt=CONDENSE_QUESTION_PROMPT,
                                            return_source_documents=True,
                                            verbose=False)


    chat_history = []
    query = "What is this document about?"
    result = qa({"question": query, "chat_history": chat_history})

    print("Question:", query)
    print("Answer:", result["answer"])


    #followup question format

    chat_history = [(query, result["answer"])]
    # query = "Write five questions that you can answer based on the information in the document. Return in the question and answer pairs in a bulleted list format."
    # query = "what is the GPU , CPU , Memory specification for QCS7230 ?"
    query = "How can I design my PCB layout to minimize noise and interference and ensure reliable operation of the QCS7230?"
    result = qa({"question": query, "chat_history": chat_history})

    print("Question:", query)
    print("Answer:", result["answer"])

    print("CHAT HISTORY")
    chat_history.append([{query, result["answer"]}])
    print(chat_history)
