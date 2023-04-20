"""
install fastapi and uvicorn
--> pip install fastapi uvicorn

to run the code run the following command
--> uvicorn main:app --reload

Once the server is started, you can access your FastAPI endpoint
"""

from fastapi import FastAPI

app = FastAPI()

@app.post("/echo")
async def echo(text: str, history: str):
    return {"echo": text}
