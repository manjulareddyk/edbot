from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.document_loaders import PyPDFLoader
from langchain.vectorstores import FAISS


folder_path = "docs/"


# Ingesting docs in docs folder.


def ingest_docs(filename):
    path = "docs/" + filename
    if filename.endswith(".pdf") == False:
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
