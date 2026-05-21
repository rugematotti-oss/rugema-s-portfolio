# ── Base image ──────────────────────────────────────────
FROM python:3.11-slim

# ── Working directory inside the container ──────────────
WORKDIR /app

# ── Copy and install dependencies ───────────────────────
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Copy the server code ─────────────────────────────────
COPY server.py .

# ── Never bake secrets into the image — pass via env ────
# Run: docker run --env-file .env -p 5000:5000 rugema-chatbot

# ── Expose Flask port ────────────────────────────────────
EXPOSE 5000

# ── Start the server ─────────────────────────────────────
CMD ["python", "server.py"]