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
from langchain.chains import ChatVectorDBChain

import os

folder_path = "docs/"





# Ingesting docs in docs folder.

def ingest_docs(filename):
    path = "docs/" + filename
    if(filename.endswith(".pdf") == False):
        return
    loader = PyPDFLoader(path)
    pages = loader.load_and_split()
    # print(pages[0].page_content)
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(pages)

    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(documents=docs, embedding=embeddings)


    path_to_index = "docs/faiss_indices/" + filename + ".index"
    db.save_local(path_to_index)
    return


# Run only once, to create the chat history vector store.
for filename in os.listdir(folder_path):
    ingest_docs(filename)
