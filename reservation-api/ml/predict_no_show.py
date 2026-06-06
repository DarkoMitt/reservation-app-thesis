import sys
import json
import joblib
import pandas as pd

model = joblib.load("no_show_model.pkl")

trust_score = int(sys.argv[1])
no_show_count = int(sys.argv[2])
cancelled_reservations = int(sys.argv[3])
visited_reservations = int(sys.argv[4])
is_new_customer = int(sys.argv[5])

input_data = pd.DataFrame([
    {
        "trust_score": trust_score,
        "no_show_count": no_show_count,
        "cancelled_reservations": cancelled_reservations,
        "visited_reservations": visited_reservations,
        "is_new_customer": is_new_customer
    }
])

probability = float(
    model.predict_proba(input_data)[0][1]
) * 100

if no_show_count == 0 and visited_reservations >= 5:
    probability = min(probability, 60)

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

if no_show_count == 0 and visited_reservations >= 5:
    explanation = (
        "Although the customer has a lower trust score, "
        "they have completed multiple reservations without any recorded no-shows. "
        "This positive attendance history reduces the predicted risk."
    )
elif no_show_count > 0:
    explanation = (
        "The customer has previous no-show history, "
        "which significantly increases the probability of missing the reservation."
    )
else:
    explanation = (
        "The customer has a generally positive reservation history "
        "with no significant indicators of a likely no-show."
    )

result = {
    "risk_percentage": probability,
    "risk_level": risk_level,
    "factors": factors,
    "explanation": explanation
}

print(json.dumps(result))