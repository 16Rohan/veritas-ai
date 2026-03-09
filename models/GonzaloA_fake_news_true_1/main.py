from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
import joblib
import numpy as np
from textblob import TextBlob
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

# Load model + vectorizer
# Ensure these files are in the same directory as main.py
model = joblib.load("logistic_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

app = FastAPI(
    title="Fake News Detection API",
    description="An API that predicts if news is REAL or FAKE based on text analysis."
)

# Define the expected input structure
class NewsRequest(BaseModel):
    text: str

def compute_features(text):
    words = text.split()
    word_count = len(words)

    unique_word_ratio = len(set(words)) / word_count if word_count > 0 else 0
    avg_word_len = np.mean([len(w) for w in words]) if word_count > 0 else 0
    stopword_ratio = (
        sum(1 for w in words if w.lower() in ENGLISH_STOP_WORDS) / word_count
        if word_count > 0 else 0
    )

    blob = TextBlob(text)

    return {
        "word_count": word_count,
        "unique_word_ratio": unique_word_ratio,
        "avg_word_len": avg_word_len,
        "stopword_ratio": stopword_ratio,
        "polarity": blob.sentiment.polarity,
        "subjectivity": blob.sentiment.subjectivity,
    }

# 1. ADDED: Root route to avoid 404 errors
@app.get("/")
def read_root():
    """
    Redirects the base URL to the interactive documentation.
    """
    return RedirectResponse(url="/docs")

# 2. Existing Prediction Endpoint
@app.post("/predict")
def predict(news: NewsRequest):
    text = news.text

    # Vectorize and predict
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]
    probabilities = model.predict_proba(X)[0]

    # Calculate additional NLP features
    features = compute_features(text)

    return {
        "label": "FAKE" if prediction == 1 else "REAL",
        "confidence": float(max(probabilities)),
        "fake_probability": float(probabilities[1]),
        "real_probability": float(probabilities[0]),
        **features
    }

# To run this, use: uvicorn main:app --reload