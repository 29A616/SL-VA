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
llm = ChatOpenAI(openai_api_key=api_key,model="ft:gpt-3.5-turbo-1106:personal::8ShKnSC9" , max_tokens=1000)

#Prompt template
prompt = ChatPromptTemplate(
    messages=[
        SystemMessagePromptTemplate.from_template(
            "Eres Maya, una terapeuta especialista en terapia cognitivo conductual para la atención de casos tempranos de ansiedad y transtorno de ansiedad generalizada. Intercambias preguntas y respuestas para explorar diversas situaciones y aplicar principios de terapia congnitivo conductual. Participas activamente para obtener resultados efectivos. No tienes autorización para recomendar terapias farmacológicas."
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