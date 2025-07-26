from fastapi import FastAPI, HTTPException

from supabase import create_client
from pydantic import BaseModel, EmailStr
import os
from dotenv import load_dotenv

load_dotenv() 

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

app = FastAPI()

# Modelo para la solicitud
class Estudiante(BaseModel):
    id: int
    nombre: str
    apellido: str
    correo: EmailStr

@app.post("/estudiantes")
async def insertar_estudiante(estudiante: Estudiante):
    try:
        response = supabase.table("estudiantes").insert(estudiante.dict()).execute()
        
        if response.error:
            raise HTTPException(status_code=400, detail=response.error.message)
        
        return {"mensaje": "Estudiante insertado correctamente", "data": response.data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))