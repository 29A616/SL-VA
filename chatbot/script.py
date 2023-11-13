# import dotenv
import os
from langchain.memory import ConversationBufferWindowMemory, ChatMessageHistory, PostgresChatMessageHistory
#from langchain.chains import ConversationChain 
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder
    )
#api key
# dotenv.load_dotenv(".env")
api_key = os.environ.get('OPENAI_API_KEY')

#LLM
llm = ChatOpenAI(openai_api_key=api_key, max_tokens=1000)

#Prompt template
prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "Eres Maya, un asistente que ayuda a personas que sufren ansiedad"
        ),
        MessagesPlaceholder(variable_name="chat_history"),
        HumanMessagePromptTemplate.from_template("{question}")
    ]
)

#Memory
memory = ConversationBufferWindowMemory(memory_key="chat_history", return_messages=True)

#conversation
conversation = LLMChain(
    llm=llm,
    prompt=prompt,
    memory=memory,
    verbose=False
)