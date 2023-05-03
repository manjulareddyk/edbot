import os

import pinecone


pinecone.init(api_key=os.environ["PINECONE_API_KEY"], environment=os.environ["PINECONE_ENV"])

from langchain.schema import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone




from langchain.llms import OpenAI
from langchain.retrievers.self_query.base import SelfQueryRetriever
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS


embeddings = OpenAIEmbeddings()


# create new index
# pinecone.create_index("edbot", dimension=1536)

def ingest_docs(filename, doc_array, extra_metadata):
    path = "docs/" + filename
    if(filename.endswith(".pdf") == False):
        return
    loader = PyPDFLoader(path)
    pages = loader.load_and_split()
    # print(pages[0].page_content)
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    docs = text_splitter.split_documents(pages)
    docs[0].metadata.append(extra_metadata)
    print(docs[0].metadata)



    doc_array.append(docs)

    # embeddings = OpenAIEmbeddings()
    # db = FAISS.from_documents(documents=docs, embedding=embeddings)

    # #save to pinecone too
    # Pinecone.from_documents(pages, embedding=embeddings, index_name="edbot")


    path_to_index = "docs/faiss_indices/" + filename + ".index"
    # db.save_local(path_to_index)
    return


folder_path = "docs/"



def manual_annotation(params, file):
    var = input("Please enter for the file ", file, " some annotated data ")
    params.append(var)
    return

documents_array = []
for filename in os.listdir(folder_path):
    extra_metadata = []
    manual_annotation(extra_metadata, filename)
    ingest_docs(filename, documents_array, extra_metadata)

print(len(documents_array))

# docs = [
#     Document(page_content="A bunch of scientists bring back dinosaurs and mayhem breaks loose", metadata={"year": 1993, "rating": 7.7, "genre": ["action", "science fiction"]}),
#     Document(page_content="Leo DiCaprio gets lost in a dream within a dream within a dream within a ...", metadata={"year": 2010, "director": "Christopher Nolan", "rating": 8.2}),
#     Document(page_content="A psychologist / detective gets lost in a series of dreams within dreams within dreams and Inception reused the idea", metadata={"year": 2006, "director": "Satoshi Kon", "rating": 8.6}),
#     Document(page_content="A bunch of normal-sized women are supremely wholesome and some men pine after them", metadata={"year": 2019, "director": "Greta Gerwig", "rating": 8.3}),
#     Document(page_content="Toys come alive and have a blast doing so", metadata={"year": 1995, "genre": "animated"}),
#     Document(page_content="Three men walk into the Zone, three men walk out of the Zone", metadata={"year": 1979, "rating": 9.9, "director": "Andrei Tarkovsky", "genre": ["science fiction", "thriller"], "rating": 9.9})
# ]
# vectorstore = Pinecone.from_documents(
#     docs, embeddings, index_name="langchain-self-retriever-demo"
# )

