import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import random

random.seed(42)

rows = []

for _ in range(1200):
    no_show_count = random.choices([0, 1, 2, 3, 4], weights=[60, 20, 10, 7, 3])[0]
    trust_score = random.randint(0, 100)
    cancelled_reservations = random.randint(0, 8)
    visited_reservations = random.randint(0, 25)
    is_new_customer = 1 if visited_reservations + cancelled_reservations + no_show_count < 3 else 0

    risk_score = 0

    risk_score += no_show_count * 18

    if trust_score <= 25:
        risk_score += 28
    elif trust_score <= 50:
        risk_score += 14
    elif trust_score >= 75:
        risk_score -= 10

    risk_score += cancelled_reservations * 5
    risk_score -= min(visited_reservations * 2, 25)

    if is_new_customer:
        risk_score += 6

    if no_show_count == 0 and visited_reservations >= 5:
        risk_score = min(risk_score, 55)

    probability = max(0, min(100, risk_score))

    no_show_target = 1 if probability >= 50 else 0

    rows.append({
        "trust_score": trust_score,
        "no_show_count": no_show_count,
        "cancelled_reservations": cancelled_reservations,
        "visited_reservations": visited_reservations,
        "is_new_customer": is_new_customer,
        "no_show": no_show_target
    })

df = pd.DataFrame(rows)

X = df[
    [
        "trust_score",
        "no_show_count",
        "cancelled_reservations",
        "visited_reservations",
        "is_new_customer"
    ]
]

y = df["no_show"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("Accuracy:", accuracy_score(y_test, predictions))
print(classification_report(y_test, predictions))

joblib.dump(model, "no_show_model.pkl")

print("Model saved as no_show_model.pkl")