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





def load_document(self, file_path, page_range=None):
        #load the document using pypdfloader
        self.loader = PyPDFLoader(file_path=file_path)
        #split the document into pages
        self.pages = self.loader.load_and_split()

        #if the page range is specified, only load those pages
        if page_range:
            new_docs = [Document(page_content=t.page_content) for t in self.pages
                        [page_range[0]:page_range[1]]]
        else:
            new_docs = [Document(page_content=t.page_content) for t in self.pages]


        #calculate a hash for the loaded docs
        new_hash = hashlib.md5(''.join([doc.page_content for doc in new_docs]).encode()).hexdigest()

        
        #check  weather the database index already exists
        if not os.path.exists(self.persist_directory):
            os.makedirs(self.persist_directory)


        if os.path.exists(os.path.join(self.persist_directory, 'doc_hash.txt')):
            with open(os.path.join(self.persist_directory, 'doc_hash.txt'), 'r') as f:
                stored_hash = f.read().strip()

            if new_hash == stored_hash:
                # Load exisiting index from disk
                print("Loading index from the disk...")
                self.db_index = Chroma(persist_directory=self.persist_directory, embedding_function=self.embeddings)
            else:
                self.docs= new_docs
                self.doc_hash = new_hash

                #create new index
                print("Creating new index...")
                self.db_index = Chroma.from_documents(self.docs, self.embeddings, persist_directory=self.persist_directory)

                #save the new hash in the index directory
                with open(os.path.join(self.persist_directory, 'doc_hash.txt'), 'w') as f:
                    f.write(self.doc_hash)

        else:
            self.docs = new_docs
            self.doc_hash = new_hash
            #creating a new index
            print("Creating a new index...")
            self.db_index = Chroma.from_documents(self.docs, self.embeddings, persist_directory=self.persist_directory)

            #Save the new Hash in the index directory
            with open(os.path.join(self.persist_directory, 'doc_hash.txt'), 'w') as f:
                f.write(self.doc_hash)

        #Generate a summery of the loaded documents 











llm = OpenAI(temperature=0.9)
prompt = PromptTemplate(
    input_variables=["product"],
    template="What is a good name for a company that makes {product}?",
)

# chain = LLMChain(llm=llm, prompt=prompt)
# print(chain.run("colorful socks"))

# QA CHAIN SINGLE DOCUMENT
                # with open("./docs/state_of_the_union.txt") as f:
                #     state_of_the_union = f.read()
                # from langchain import OpenAI
                # from langchain.chains.summarize import load_summarize_chain

                # llm = OpenAI(temperature=0)
                # summary_chain = load_summarize_chain(llm, chain_type="map_reduce")

                # from langchain.chains import AnalyzeDocumentChain
                # summarize_document_chain = AnalyzeDocumentChain(combine_docs_chain=summary_chain)
                # print(summarize_document_chain.run(state_of_the_union))
                # from langchain.chains.question_answering import load_qa_chain
                # qa_chain = load_qa_chain(llm, chain_type="map_reduce")
                # qa_document_chain = AnalyzeDocumentChain(combine_docs_chain=qa_chain)
                # print(qa_document_chain.run(input_document=state_of_the_union, question="what did the president say about Putin?"))


loader = PyPDFLoader("docs/qualcomm-3.pdf")
pages = loader.load_and_split()
print(pages[0].page_content)



text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
docs = text_splitter.split_documents(pages)

embeddings = OpenAIEmbeddings()
db = FAISS.from_documents(documents=docs, embedding=embeddings)


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
query = "what is the document about?"
result = qa({"question": query, "chat_history": chat_history})

print("Question:", query)
print("Answer:", result["answer"])


chat_history = [(query, result["answer"])]
query = "What are the features?"
result = qa({"question": query, "chat_history": chat_history})

print("Question:", query)
print("Answer:", result["answer"])



# initialize pinecone
# pinecone.init(
#     api_key="ff548156-3ece-4dc3-b8ee-61a43239e77e",  # find at app.pinecone.io
#     environment="eu-west1-gcp"  # next to api key in console
# )

# index_name = "demo-index"

# docsearch = Pinecone.from_documents(docs, embeddings, index_name=index_name)

# query = "What is the document about?"
# docs1 = docsearch.similarity_search(query)
# print((docs1))
