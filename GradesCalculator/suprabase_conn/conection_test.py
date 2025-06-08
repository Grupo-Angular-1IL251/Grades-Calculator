import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("PRIVATE_SUPABASE_KEY")
print(f"URL: {url}")
print(f"Key: {key}")

supabase: Client = create_client(url, key)

response = supabase.table("MATERIA").select("*").execute()

print(response)