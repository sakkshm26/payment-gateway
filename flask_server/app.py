from bottle import route, run, request, post
import openai
import os
from dotenv import load_dotenv
import pickle
from langchain.embeddings import OpenAIEmbeddings
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.chat_models import ChatOpenAI

load_dotenv()

openai.api_key = os.environ['OPENAI_API_KEY']

llm = ChatOpenAI(temperature=0, model_name= 'gpt-3.5-turbo')

with open("models/razorpay.pk1", 'rb') as f:
      VectorStore = pickle.load(f)

chain = RetrievalQAWithSourcesChain.from_llm(llm=llm, retriever=VectorStore.as_retriever())

embeddings = OpenAIEmbeddings()

@route('/health')
def index():
    return {"success": True}

@post('/getMessage')
def predict():
    body = request.POST.get("text", "")
    print(body)
    # response = chain({"question": text}, return_only_outputs=True)
    return {"text": "asd"}

run(host='localhost', port=8080)