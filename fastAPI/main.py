from fastapi import FastAPI, HTTPException
from supabase import create_client
from pydantic import BaseModel, EmailStr
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o reemplaza "*" por "http://localhost:4200" si deseas limitar
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MateriaPorEstudiante(BaseModel):
    nombre_materia: str
    porc_parciales: int
    cant_parciales: int
    porc_asig: int
    cant_asig: int
    porc_portafolio: int
    porc_semestral: int
    uuid_estudiante: str  

class InsertarNota(BaseModel):
    uuid_estudiante: str
    nombre_materia: str
    nota: int
    tipo_nota: str 

class ObtenerMaterias(BaseModel):
    uuid_estudiante: str
    
class ObtenerNotasPorMateria(BaseModel):
    uuid_estudiante: str
    nombre_materia: str

@app.post("/registrar-materia")
async def registrar_materia_por_estudiante(materia: MateriaPorEstudiante):
    materia.nombre_materia = materia.nombre_materia.upper()
    try:
        response = supabase.table("materias_por_estudiante").insert(materia.dict()).execute()

        if not response or not response.data:
            raise HTTPException(status_code=400, detail="No se pudo insertar la materia por estudiante")

        return {"mensaje": "Materia por estudiante insertada correctamente", "data": response.data}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/registrar-nota")
async def insertar_nota(body: InsertarNota):
    body.nombre_materia = body.nombre_materia.upper()
    body.tipo_nota = body.tipo_nota.upper()
    try:
        response = supabase.table("materias_por_estudiante").select("*").eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()

        if not response or not response.data:
            raise HTTPException(status_code=404, detail="No se encontró la materia por estudiante")

        if body.tipo_nota == "PARCIAL":
            notas_parciales_existente = response.data[0]["notas_parciales"]
            if notas_parciales_existente is None:
                notas_parciales_existente = []
            limite = response.data[0]["cant_parciales"]
            if len(notas_parciales_existente) >= limite:
                raise HTTPException(status_code=400, detail="Ya se alcanzó el límite de notas")
            notas_parciales_nueva = notas_parciales_existente + [body.nota]
            supabase.table("materias_por_estudiante").update({"notas_parciales": notas_parciales_nueva}).eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()
        
        elif body.tipo_nota == "ASIGNACION":
            notas_asignacion_existente = response.data[0]["notas_asig"]
            if notas_asignacion_existente is None:
                notas_asignacion_existente = []
            limite = response.data[0]["cant_asig"]
            if len(notas_asignacion_existente) >= limite:
                raise HTTPException(status_code=400, detail="Ya se alcanzó el límite de notas")
            notas_asignacion_nueva = notas_asignacion_existente + [body.nota]
            supabase.table("materias_por_estudiante").update({"notas_asig": notas_asignacion_nueva}).eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()
        
        elif body.tipo_nota == "SEMESTRAL":
            supabase.table("materias_por_estudiante").update({"nota_semestral": body.nota}).eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()
        
        elif body.tipo_nota == "PORTAFOLIO":
            supabase.table("materias_por_estudiante").update({"nota_portafolio": body.nota}).eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()
        
        elif body.tipo_nota == "NOTA FINAL":
            supabase.table("materias_por_estudiante").update({"nota_final": body.nota}).eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()
        else:
            raise HTTPException(status_code=400, detail="Tipo de nota no válido")

        return {"mensaje": "Nota insertada correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/obtener-materias")
async def obtener_materias_por_estudiante(body: ObtenerMaterias):
    try:
        response = supabase.table("materias_por_estudiante").select("nombre_materia").eq("uuid_estudiante", body.uuid_estudiante).execute()

        if not response or not response.data:
            raise HTTPException(status_code=404, detail="No se encontraron materias para el estudiante")

        materias = [materia["nombre_materia"] for materia in response.data]

        return {"mensaje": "Materias obtenidas correctamente", "data": materias}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/obtener-notas-por-materia")
async def obtener_notas_por_materia(body: ObtenerNotasPorMateria):
    body.nombre_materia = body.nombre_materia.upper()
    try:
        response = supabase.table("materias_por_estudiante").select("nota_portafolio", "nota_semestral", "nota_final", "notas_parciales", "notas_asig").eq("uuid_estudiante", body.uuid_estudiante).eq("nombre_materia", body.nombre_materia).execute()

        if not response or not response.data:
            raise HTTPException(status_code=404, detail="No se encontraron notas para el estudiante y materia")

        notas_materia = response.data[0]

        return {"mensaje": "Notas obtenidas correctamente", "data": notas_materia}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))