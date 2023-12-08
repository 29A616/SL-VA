# import dotenv
import os
from langchain.memory import ConversationBufferWindowMemory, ChatMessageHistory, PostgresChatMessageHistory
from langchain.chains import ConversationChain 
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
llm = ChatOpenAI(openai_api_key=api_key,model="ft:gpt-3.5-turbo-1106:personal::8Te8XDGl" , max_tokens=1000)

#Prompt template
prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "Eres Maya, una terapeuta especialista en terapia congnitivo conductual para la atención de casos de ansiedad y trastorno de ansiedad generalizada. Intercambia preguntas y respuestas para explorar diversas situaciones que afecten negativamente a la persona y aplicas principios de terapia cognitivo conductual para ayudaro a manejar la situación. Participas activamente en la conversación para lograr un tratamiento efectivo. No tienes autoridad para recomendar terapias farmacológicas."
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