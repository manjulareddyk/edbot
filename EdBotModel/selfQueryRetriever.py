import os

import pinecone


pinecone.init(api_key=os.environ["PINECONE_API_KEY"], environment=os.environ["PINECONE_ENV"])

from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings

embed = OpenAIEmbeddings()

lang_vectorstore = Pinecone.from_existing_index('langchain-self-retriever-demo', embedding=embed)

from langchain.llms import OpenAI
from langchain.retrievers.self_query.base import SelfQueryRetriever


llm = OpenAI(temperature=0)

from langchain.chains.query_constructor.base import AttributeInfo

metadata_field_info=[
    AttributeInfo(
        name="genre",
        description="The genre of the movie", 
        type="string or list[string]", 
    ),
    AttributeInfo(
        name="year",
        description="The year the movie was released", 
        type="integer", 
    ),
    AttributeInfo(
        name="director",
        description="The name of the movie director", 
        type="string", 
    ),
    AttributeInfo(
        name="rating",
        description="A 1-10 rating for the movie",
        type="float"
    ),
]
document_content_description = "Brief summary of a movie"



retriever = SelfQueryRetriever.from_llm(llm, lang_vectorstore, document_content_description, metadata_field_info, verbose=True)

print(retriever.get_relevant_documents("What are some movies about dinosaurs"))