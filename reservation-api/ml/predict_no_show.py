import sys
import json
import joblib
import pandas as pd

bundle = joblib.load("no_show_model.pkl")

model = bundle["model"]
model_name = bundle["model_name"]
features = bundle["features"]

trust_score = int(sys.argv[1])
no_show_count = int(sys.argv[2])
cancelled_reservations = int(sys.argv[3])
visited_reservations = int(sys.argv[4])
is_new_customer = int(sys.argv[5])

input_data = pd.DataFrame([{
    "trust_score": trust_score,
    "no_show_count": no_show_count,
    "cancelled_reservations": cancelled_reservations,
    "visited_reservations": visited_reservations,
    "is_new_customer": is_new_customer
}])

input_data = input_data[features]

probability = float(model.predict_proba(input_data)[0][1]) * 100

if no_show_count == 0 and visited_reservations >= 5:
    probability = min(probability, 45)

if no_show_count >= 5:
    probability = max(probability, 90)

probability = round(probability)

if probability <= 30:
    risk_level = "low"
elif probability <= 60:
    risk_level = "medium"
else:
    risk_level = "high"

factors = [
    f"Trust Score: {trust_score}",
    f"Previous No-Shows: {no_show_count}",
    f"Cancelled Reservations: {cancelled_reservations}",
    f"Completed Visits: {visited_reservations}",
    f"New Customer: {'Yes' if is_new_customer else 'No'}"
]

if no_show_count >= 5:
    explanation = (
        "The customer has reached a high number of previous no-shows, "
        "therefore the system classifies this reservation as high risk."
    )
elif no_show_count > 0:
    explanation = (
        "The customer has previous no-show history, which increases the predicted risk."
    )
elif no_show_count == 0 and visited_reservations >= 5:
    explanation = (
        "The customer has completed multiple reservations without recorded no-shows, "
        "therefore the predicted risk is reduced."
    )
else:
    explanation = (
        "The customer does not have strong negative reservation history, "
        "so the predicted risk is based mainly on trust score and reservation behavior."
    )

result = {
    "model_used": model_name,
    "risk_percentage": probability,
    "risk_level": risk_level,
    "factors": factors,
    "explanation": explanation
}

print(json.dumps(result))