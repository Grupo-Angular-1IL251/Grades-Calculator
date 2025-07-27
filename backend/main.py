from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import requests
from supabase import create_client, Client
import os
from dotenv import load_dotenv

# Cargar las variables de entorno desde un .env
load_dotenv()

# Variables desde .env
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE = os.getenv("SUPABASE_SERVICE_ROLE")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE)

app = FastAPI()

# Esquema de entrada
class RegistroEstudiante(BaseModel):
    nombre: str
    apellido: str
    correo: EmailStr
    password: str
    genero: str

@app.post("/registrar")
def registrar_usuario(datos: RegistroEstudiante):
    # 1. Crear usuario en AUTH
    auth_url = f"{SUPABASE_URL}/auth/v1/admin/users"

    headers = {
        "apikey": SUPABASE_SERVICE_ROLE,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE}",
        "Content-Type": "application/json"
    }

    payload = {
        "email": datos.correo,
        "password": datos.password,
        "email_confirm": True
    }

    response = requests.post(auth_url, json=payload, headers=headers)
    print("Respuesta de Supabase:", response.status_code, response.text)

    if response.status_code != 200:
        raise HTTPException(status_code=400, detail=f"Error al crear usuario: {response.json()}")

    user_id = response.json()['id']

    # 2. Insertar en tabla estudiante
    estudiante_data = {
        "id": user_id,
        "nombre": datos.nombre,
        "apellido": datos.apellido,
        "correo": datos.correo,
        "genero": datos.genero
    }

    result = supabase.table("estudiante").insert(estudiante_data).execute()

    if result.error:
        raise HTTPException(status_code=500, detail=f"Error al insertar estudiante: {result.error.message}")

    return {"mensaje": "Estudiante registrado exitosamente."}