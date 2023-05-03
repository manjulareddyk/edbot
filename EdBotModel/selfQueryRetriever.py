import os

from langchain.chains.query_constructor.base import AttributeInfo
import pinecone
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.retrievers.self_query.base import SelfQueryRetriever



pinecone.init(api_key=os.environ["PINECONE_API_KEY"], environment=os.environ["PINECONE_ENV"])

embed = OpenAIEmbeddings()

lang_vectorstore = Pinecone.from_existing_index('langchain-self-retriever-demo', embedding=embed)




llm = OpenAI(temperature=0)


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