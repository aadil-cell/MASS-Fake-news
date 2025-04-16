from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# Initialize Flask app
app = Flask("MASS")
CORS(app)  # Enable CORS for React communication

# Load the trained model and vectorizer
model = joblib.load("./fake_news_model.pkl")
vectorizer = joblib.load("./vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        news_text = data.get("text", "")

        if not news_text:
            return jsonify({"error": "No text provided"}), 400

        # Vectorize the input text
        text_vectorized = vectorizer.transform([news_text])

        # Get the prediction
        prediction = model.predict(text_vectorized)[0]
        prediction_proba = model.predict_proba(text_vectorized)[0]

        # Result formatting
        result = "Real News ✅" if prediction == 1 else "Fake News 🚨"
        confidence_real = f"{prediction_proba[1] * 100:.2f}%"
        confidence_fake = f"{prediction_proba[0] * 100:.2f}%"

        return jsonify({
            "prediction": result,
            "confidence_real": confidence_real,
            "confidence_fake": confidence_fake
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run Flask API
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)