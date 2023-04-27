from langchain.document_loaders import UnstructuredPDFLoader
from langchain.indexes import VectorstoreIndexCreator
import os

pdf_folder_path = f'./docs/'
os.listdir(pdf_folder_path)

loaders = [UnstructuredPDFLoader(os.path.join(pdf_folder_path, fn)) for fn in os.listdir(pdf_folder_path)]
index = VectorstoreIndexCreator().from_loaders(loaders)

print(index.query('What are the differences between Qualcomm QCM4920 and QCS7230?'))
print(index.query_with_sources('What are the differences between Qualcomm QCM4920 and QCS7230?'))